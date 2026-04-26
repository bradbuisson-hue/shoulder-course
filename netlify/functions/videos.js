// Netlify Function: /api/videos
// GET   — returns the current videos mapping (public read, no auth)
// POST  — replaces the mapping; requires X-Admin-Password header that
//         matches the ADMIN_PASSWORD environment variable
//
// Storage: Netlify Blobs (persists across deploys, no rebuild required when
//          the admin saves a change; the live site fetches the latest on load).

import { getStore } from '@netlify/blobs'

const STORE_NAME = 'course-config'
const KEY = 'video-urls'

export default async (req) => {
  const store = getStore(STORE_NAME)

  if (req.method === 'GET') {
    try {
      const data = (await store.get(KEY, { type: 'json' })) || {}
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
      })
    } catch (e) {
      return new Response(JSON.stringify({}), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  }

  if (req.method === 'POST') {
    const expected = Netlify.env.get('ADMIN_PASSWORD')
    if (!expected) {
      return new Response(
        'ADMIN_PASSWORD is not configured on this site. Set it in Netlify → Site settings → Environment variables.',
        { status: 500 }
      )
    }

    const provided = req.headers.get('x-admin-password') || ''
    if (provided !== expected) {
      return new Response('Unauthorized', { status: 401 })
    }

    let body
    try {
      body = await req.json()
    } catch {
      return new Response('Invalid JSON', { status: 400 })
    }

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return new Response('Body must be a JSON object', { status: 400 })
    }

    // Sanity-check entries: keys are "moduleId/lessonId", values are strings.
    const cleaned = {}
    for (const [k, v] of Object.entries(body)) {
      if (typeof v === 'string' && v.trim()) {
        cleaned[k] = v.trim().slice(0, 500)
      }
    }

    await store.setJSON(KEY, cleaned)

    return new Response(JSON.stringify({ ok: true, count: Object.keys(cleaned).length }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return new Response('Method not allowed', { status: 405 })
}

export const config = {
  path: '/api/videos',
}
