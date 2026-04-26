import { useState, useRef, useEffect } from 'react'
import { Icon } from '../lib/icons.jsx'

const SUGGESTED_PROMPTS = [
  'Walk me through your reasoning for which special tests to use when you suspect a rotator cuff tear.',
  'A 45-year-old painter has had lateral shoulder pain for 6 weeks. What would you ask in the subjective?',
  'Quiz me on the rotator cuff anatomy.',
  'What is the difference between RCRSP and adhesive capsulitis on examination?',
  'Help me write a Phase 2 programme for a client with subacromial pain.',
]

export default function ChatTutor({ history, setHistory }) {
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState(null)
  const scrollRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history, streaming])

  const send = async (text) => {
    const message = (text ?? input).trim()
    if (!message || streaming) return

    setError(null)
    setInput('')
    const newHistory = [...history, { role: 'user', content: message }]
    setHistory(newHistory)
    setStreaming(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newHistory }),
      })

      if (!res.ok) {
        const errText = await res.text()
        throw new Error(`Server error (${res.status}): ${errText}`)
      }

      const data = await res.json()
      setHistory([...newHistory, { role: 'assistant', content: data.reply }])
    } catch (e) {
      setError(e.message || 'Something went wrong reaching the tutor.')
      setHistory(newHistory)
    } finally {
      setStreaming(false)
      inputRef.current?.focus()
    }
  }

  const clearChat = () => {
    setHistory([])
    setError(null)
  }

  return (
    <article className="max-w-3xl flex flex-col h-[calc(100vh-9rem)]">
      <header className="mb-6 shrink-0">
        <div className="eyebrow text-accent mb-3 flex items-center gap-2">
          <Icon.Sparkle className="w-3.5 h-3.5" />
          AI Tutor
        </div>
        <h1 className="display text-4xl mb-3 tracking-tightest">Ask anything about the shoulder</h1>
        <p className="text-[15.5px] leading-[1.65] text-text-muted max-w-2xl">
          A study tutor for placement students. It will push you to reason through cases rather
          than hand you the answer — that&apos;s by design. Use it for clinical-reasoning practice,
          anatomy drilling, or to quiz yourself on the material.
        </p>
      </header>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto clean-scroll border-t border-border pt-6 pr-2"
      >
        {history.length === 0 && (
          <div>
            <div className="eyebrow mb-3">Try one of these</div>
            <div className="space-y-2 mb-8">
              {SUGGESTED_PROMPTS.map((p, i) => (
                <button
                  key={i}
                  className="block w-full text-left px-4 py-3 rounded-lg border border-border hover:border-border-strong hover:bg-panel-2 transition-colors text-[14.5px] text-text-muted hover:text-text"
                  onClick={() => send(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-5">
          {history.map((m, i) => (
            <div
              key={i}
              className={m.role === 'user' ? '' : 'animate-fade-in'}
            >
              <div className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : ''}`}>
                {m.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 mt-1">
                    <Icon.Sparkle className="w-3.5 h-3.5 text-accent" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-[14.5px] leading-[1.65] whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-panel-2 text-text rounded-br-md'
                      : 'text-text-muted'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            </div>
          ))}
          {streaming && (
            <div className="flex gap-3 animate-fade-in">
              <div className="w-7 h-7 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 mt-1">
                <Icon.Sparkle className="w-3.5 h-3.5 text-accent" />
              </div>
              <div className="px-4 py-3.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse-soft" />
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse-soft" style={{ animationDelay: '0.2s' }} />
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse-soft" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          )}
          {error && (
            <div className="rounded-lg border border-danger/30 bg-danger/5 p-4 text-sm">
              <div className="eyebrow text-danger mb-1.5">Could not reach tutor</div>
              <p className="m-0 text-text-muted">{error}</p>
              <p className="m-0 mt-2 text-2xs text-text-subtle">
                Make sure <code className="font-mono">ANTHROPIC_API_KEY</code> is set in Netlify environment variables. For local dev, use <code className="font-mono">netlify dev</code> (not <code className="font-mono">npm run dev</code>).
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="shrink-0 pt-4 mt-2 border-t border-border">
        <div className="flex gap-2 items-end">
          <textarea
            ref={inputRef}
            className="textarea flex-1 min-h-[48px] max-h-[180px] resize-none"
            placeholder="Ask a question, or describe a case…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                send()
              }
            }}
            rows={1}
          />
          <button
            className="btn-primary self-stretch !px-4"
            onClick={() => send()}
            disabled={!input.trim() || streaming}
            aria-label="Send"
          >
            <Icon.Send />
          </button>
        </div>
        <div className="flex items-center justify-between mt-2.5 text-2xs text-text-subtle">
          <span>Enter to send · Shift+Enter for newline</span>
          {history.length > 0 && (
            <button onClick={clearChat} className="hover:text-text transition-colors">
              Clear conversation
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
