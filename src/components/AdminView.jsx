import { useEffect, useState } from 'react'
import { modules } from '../content/modules.js'
import { Icon } from '../lib/icons.jsx'
import ThemeToggle from './ThemeToggle.jsx'

const PASSWORD_KEY = 'shoulder-course-admin-pw'

export default function AdminView() {
  const [password, setPassword] = useState('')
  const [rememberPw, setRememberPw] = useState(true)
  const [videos, setVideos] = useState({})
  const [loaded, setLoaded] = useState(false)
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState(null)
  const [error, setError] = useState(null)

  // Load existing video mapping + remembered password on mount
  useEffect(() => {
    try {
      const pw = sessionStorage.getItem(PASSWORD_KEY)
      if (pw) setPassword(pw)
    } catch {}

    fetch('/api/videos')
      .then((r) => (r.ok ? r.json() : {}))
      .then((data) => {
        setVideos(data || {})
        setLoaded(true)
      })
      .catch(() => setLoaded(true))
  }, [])

  const setUrl = (key, value) => {
    setVideos((v) => {
      const next = { ...v }
      if (value.trim()) next[key] = value
      else delete next[key]
      return next
    })
    setSavedAt(null)
  }

  const handleSave = async () => {
    setError(null)
    setSaving(true)
    try {
      const res = await fetch('/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Password': password,
        },
        body: JSON.stringify(videos),
      })
      if (!res.ok) {
        const txt = await res.text()
        if (res.status === 401) {
          throw new Error('Wrong password.')
        }
        throw new Error(`Save failed: ${txt.slice(0, 200)}`)
      }
      setSavedAt(new Date())
      try {
        if (rememberPw) sessionStorage.setItem(PASSWORD_KEY, password)
        else sessionStorage.removeItem(PASSWORD_KEY)
      } catch {}
    } catch (e) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  const filledCount = Object.values(videos).filter((v) => v && v.trim()).length
  const totalLessons = modules.reduce((a, m) => a + m.lessons.length, 0)

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 bg-bg/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 h-14 flex items-center gap-3">
          <a
            href="/"
            className="flex items-center gap-2.5 text-text hover:text-accent transition-colors"
          >
            <Icon.ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium tracking-tight">Back to course</span>
          </a>
          <span className="ml-3 pl-3 border-l border-border eyebrow">
            <Icon.Lock className="w-3 h-3 inline -mt-0.5 mr-1" /> Admin
          </span>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 sm:px-8 py-10">
        <div className="mb-10 animate-fade-up">
          <div className="eyebrow text-accent mb-3">Video manager</div>
          <h1 className="display text-3xl sm:text-4xl mb-3 tracking-tightest">
            Video URLs
          </h1>
          <p className="text-[15px] leading-[1.6] text-text-muted max-w-2xl mb-2">
            Paste a video URL next to each lesson. Saving is instant — the live site picks up
            changes on its next page load. No rebuild required.
          </p>
          <p className="text-[14px] text-text-subtle">
            <strong className="text-text-muted font-medium">Supported:</strong> YouTube
            (<code className="font-mono text-2xs bg-panel-2 px-1 rounded">youtu.be/…</code> or{' '}
            <code className="font-mono text-2xs bg-panel-2 px-1 rounded">youtube.com/watch?v=…</code>),
            Vimeo, or any direct <code className="font-mono text-2xs bg-panel-2 px-1 rounded">.mp4</code>{' '}
            /<code className="font-mono text-2xs bg-panel-2 px-1 rounded">.webm</code> URL.
          </p>
        </div>

        {/* Auth + status bar */}
        <div className="card p-5 mb-8 animate-fade-up sticky top-16 z-20" style={{ animationDelay: '0.05s' }}>
          <div className="grid sm:grid-cols-[1fr_auto] gap-4 items-end">
            <div>
              <label className="eyebrow mb-2 block">Admin password</label>
              <input
                type="password"
                className="input"
                placeholder="Set as ADMIN_PASSWORD in Netlify env vars"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <label className="flex items-center gap-2 mt-2.5 text-2xs text-text-muted cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="accent-accent"
                  checked={rememberPw}
                  onChange={(e) => setRememberPw(e.target.checked)}
                />
                Remember for this session
              </label>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="font-mono text-sm text-text">
                  {filledCount} / {totalLessons}
                </div>
                <div className="eyebrow">filled</div>
              </div>
              <button
                className="btn-primary"
                disabled={saving || !password}
                onClick={handleSave}
              >
                {saving ? 'Saving…' : 'Save changes'}
              </button>
            </div>
          </div>
          {error && (
            <div className="mt-3 px-3 py-2 rounded-lg bg-danger/10 border border-danger/30 text-sm text-text">
              {error}
            </div>
          )}
          {savedAt && !error && (
            <div className="mt-3 px-3 py-2 rounded-lg bg-accent/10 border border-accent/30 text-sm text-accent flex items-center gap-2">
              <Icon.Check className="w-4 h-4" />
              Saved at {savedAt.toLocaleTimeString()} — changes are live now.
            </div>
          )}
        </div>

        {/* Lesson list */}
        {!loaded && (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 rounded-xl shimmer" />
            ))}
          </div>
        )}

        {loaded && (
          <div className="space-y-10">
            {modules.map((m) => (
              <section key={m.id} className="animate-fade-up">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-mono text-accent text-2xs tracking-widest">
                    {m.number}
                  </span>
                  <h2 className="font-medium tracking-tight text-lg">{m.title}</h2>
                  <span className="ml-auto eyebrow">
                    {m.lessons.filter((l) => videos[`${m.id}/${l.id}`]).length} / {m.lessons.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {m.lessons.map((l, li) => {
                    const key = `${m.id}/${l.id}`
                    const value = videos[key] || ''
                    const filled = !!value.trim()
                    return (
                      <div key={l.id} className="card p-4">
                        <div className="grid sm:grid-cols-[1fr_2fr] gap-3 items-center">
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="font-mono text-2xs text-accent tracking-wider">
                                {m.number}.{String(li + 1).padStart(2, '0')}
                              </span>
                              {filled && <Icon.Check className="w-3 h-3 text-accent" />}
                            </div>
                            <div className="font-medium tracking-tight text-[14.5px] text-text">
                              {l.title}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <input
                              type="url"
                              className="input flex-1 !py-2 !text-[13.5px] font-mono"
                              placeholder="https://youtu.be/…"
                              value={value}
                              onChange={(e) => setUrl(key, e.target.value)}
                            />
                            {filled && (
                              <a
                                href={value}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-ghost !p-2"
                                title="Open in new tab"
                              >
                                <Icon.External />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* Sticky save reminder */}
        <div className="mt-16 mb-10 text-center text-2xs text-text-subtle">
          Don&apos;t forget to click <strong className="text-text-muted">Save changes</strong> at the top.
        </div>
      </main>
    </div>
  )
}
