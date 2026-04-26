import { useState, useEffect } from 'react'
import { Icon } from '../lib/icons.jsx'
import { InlineMD } from '../lib/InlineMD.jsx'

export default function CaseStudy({ caseStudy, savedReflection, onSave }) {
  const [text, setText] = useState(savedReflection?.text || '')
  const [savedTime, setSavedTime] = useState(savedReflection?.savedAt || null)
  const [dirty, setDirty] = useState(false)

  useEffect(() => {
    setText(savedReflection?.text || '')
    setSavedTime(savedReflection?.savedAt || null)
    setDirty(false)
  }, [savedReflection])

  const handleSave = () => {
    onSave(text)
    setSavedTime(new Date().toISOString())
    setDirty(false)
  }

  return (
    <section className="my-16">
      <div className="eyebrow text-accent mb-2">Case study</div>
      <h2 className="display text-3xl mb-6">{caseStudy.title}</h2>

      <div className="card p-6 mb-7 border-l-2 border-l-accent">
        <p className="text-[16px] leading-[1.8] text-text-muted m-0">
          <InlineMD text={caseStudy.scenario} />
        </p>
      </div>

      <h3 className="text-lg font-medium tracking-tight mb-4 text-text">Reflection prompts</h3>
      <ol className="space-y-3 mb-7">
        {caseStudy.prompts.map((p, i) => (
          <li key={i} className="flex gap-4">
            <span className="font-mono text-2xs text-accent pt-1.5 tracking-wider shrink-0 w-6">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="text-[15.5px] leading-[1.7] text-text-muted">{p}</span>
          </li>
        ))}
      </ol>

      <div className="card overflow-hidden">
        <textarea
          className="w-full min-h-[200px] p-5 bg-transparent border-0 focus:outline-none focus:ring-0 text-[15px] leading-[1.7] text-text resize-y placeholder:text-text-subtle"
          placeholder="Type your responses here. Saved to this device when you click Save."
          value={text}
          onChange={(e) => {
            setText(e.target.value)
            setDirty(true)
          }}
        />
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-border bg-panel-2/40">
          <div className="text-2xs text-text-subtle">
            {savedTime && !dirty && (
              <span className="flex items-center gap-1.5">
                <Icon.Check className="w-3 h-3 text-accent" />
                Saved {new Date(savedTime).toLocaleString()}
              </span>
            )}
            {dirty && <span className="text-amber-600 dark:text-amber-500">Unsaved changes</span>}
          </div>
          <button className="btn-primary !py-1.5 !px-3.5 !text-xs" onClick={handleSave} disabled={!text.trim()}>
            Save reflection
          </button>
        </div>
      </div>
    </section>
  )
}
