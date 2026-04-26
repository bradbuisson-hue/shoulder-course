import { useEffect, useState, useCallback } from 'react'

// Caches the videos mapping in memory for the session and refreshes from the
// /api/videos endpoint on mount. Falls back to an empty object on failure
// (so lessons still render their "video slot" placeholders).

export function useVideos() {
  const [videos, setVideos] = useState({})
  const [loaded, setLoaded] = useState(false)

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/videos', { method: 'GET' })
      if (!res.ok) {
        setVideos({})
        return
      }
      const data = await res.json()
      setVideos(data || {})
    } catch {
      setVideos({})
    } finally {
      setLoaded(true)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { videos, loaded, refresh }
}

// Pure helper for components that already have a videos mapping —
// resolves the URL for a lesson, preferring the stored mapping over the fallback.
export function resolveVideoUrl(videos, moduleId, lessonId, fallback = '') {
  const key = `${moduleId}/${lessonId}`
  return (videos && videos[key]) || fallback || ''
}
