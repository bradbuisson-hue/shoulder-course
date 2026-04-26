import { useState } from 'react'
import { modules } from '../content/modules.js'
import { Icon } from '../lib/icons.jsx'

function TaskCard({ task, taskKey, savedNote, onSave }) {
  const [text, setText] = useState(savedNote?.text || '')
  const [open, setOpen] = useState(!!savedNote?.text)
  const [savedTime, setSavedTime] = useState(savedNote?.savedAt || null)
  const [dirty, setDirty] = useState(false)

  const handleSave = () => {
    onSave(taskKey, text)
    setSavedTime(new Date().toISOString())
    setDirty(false)
  }

  const isComplete = !!savedNote?.text

  return (
    <div className="card overflow-hidden">
      <button
        className="w-full text-left px-5 py-4 flex items-start gap-4 hover:bg-panel-2/50 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <div
          className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
            isComplete ? 'bg-accent border-accent text-white' : 'border-border-strong'
          }`}
        >
          {isComplete && <Icon.Check className="w-3 h-3" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium tracking-tight text-[15.5px] leading-tight text-text">{task.title}</div>
          <p className="text-[14px] text-text-muted mt-1 leading-snug">{task.prompt}</p>
        </div>
        <Icon.ChevronDown
          className={`w-4 h-4 text-text-subtle mt-1 transition-transform shrink-0 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      {open && (
        <div className="border-t border-border px-5 py-4 animate-fade-in">
          <div className="eyebrow mb-3">Your notes &amp; client log</div>
          <textarea
            className="textarea min-h-[120px] text-[14.5px]"
            placeholder="Document what you did, what you observed with the client, what you would change next time."
            value={text}
            onChange={(e) => {
              setText(e.target.value)
              setDirty(true)
            }}
          />
          <div className="mt-3 flex items-center justify-between">
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
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function TasksView({ progress, onSaveTask }) {
  const allTasks = modules.flatMap((m) =>
    (m.tasks || []).map((t, ti) => ({
      moduleId: m.id,
      moduleNumber: m.number,
      moduleTitle: m.title,
      task: t,
      key: `${m.id}-${ti}`,
    }))
  )

  const completedCount = allTasks.filter((t) => progress.taskNotes[t.key]?.text).length

  return (
    <article className="max-w-3xl">
      <header className="mb-12">
        <div className="eyebrow text-accent mb-3">Apply your learning</div>
        <h1 className="display text-4xl sm:text-5xl mb-5 tracking-tightest">Tasks &amp; client work</h1>
        <p className="text-[16px] leading-[1.65] text-text-muted max-w-2xl">
          The course is only useful if it changes how you work. Use this space to document the
          practical tasks from each module — including conversations and treatments with clients.
        </p>
        <div className="mt-7 flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-panel-2 rounded-full overflow-hidden max-w-sm">
            <div
              className="h-full bg-accent transition-all duration-500 rounded-full"
              style={{ width: `${(completedCount / Math.max(allTasks.length, 1)) * 100}%` }}
            />
          </div>
          <span className="font-mono text-2xs text-text-muted tracking-wider">
            {completedCount} / {allTasks.length} LOGGED
          </span>
        </div>
      </header>

      <div className="space-y-10">
        {modules.map((m) => {
          const moduleTasks = allTasks.filter((t) => t.moduleId === m.id)
          if (moduleTasks.length === 0) return null
          return (
            <section key={m.id}>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-mono text-accent text-2xs tracking-widest">{m.number}</span>
                <h2 className="font-medium tracking-tight text-lg">{m.title}</h2>
              </div>
              <div className="space-y-3">
                {moduleTasks.map((t) => (
                  <TaskCard
                    key={t.key}
                    task={t.task}
                    taskKey={t.key}
                    savedNote={progress.taskNotes[t.key]}
                    onSave={onSaveTask}
                  />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </article>
  )
}
