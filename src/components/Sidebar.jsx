import { modules } from '../content/modules.js'
import { Icon } from '../lib/icons.jsx'
import { moduleCompletion } from '../hooks/useProgress.js'

export default function Sidebar({ view, currentModuleId, progress, onNavigate, onClose }) {
  return (
    <aside className="h-full bg-panel/70 backdrop-blur-sm border-r border-border overflow-y-auto clean-scroll">
      <div className="px-5 py-5 flex items-center justify-between border-b border-border">
        <button
          onClick={() => onNavigate({ view: 'cover' })}
          className="flex items-center gap-2.5 text-text hover:text-accent transition-colors"
        >
          <Icon.Logo className="w-5 h-5 text-accent" />
          <span className="font-medium tracking-tight text-[15px]">Shoulder Course</span>
        </button>
        {onClose && (
          <button
            className="lg:hidden text-text-muted hover:text-text"
            onClick={onClose}
            aria-label="Close menu"
          >
            <Icon.Close />
          </button>
        )}
      </div>

      <nav className="px-3 py-4 space-y-1">
        <SidebarItem
          icon={<Icon.Home className="w-4 h-4" />}
          label="Overview"
          active={view === 'cover'}
          onClick={() => onNavigate({ view: 'cover' })}
        />

        <div className="pt-4 pb-1.5 px-3 eyebrow">Modules</div>

        {modules.map((m) => {
          const c = moduleCompletion(progress, m)
          const isActive = view === 'module' && currentModuleId === m.id
          return (
            <button
              key={m.id}
              className={`w-full text-left px-3 py-2.5 rounded-lg transition-all group ${
                isActive
                  ? 'bg-panel-2 text-text'
                  : 'text-text-muted hover:bg-panel-2 hover:text-text'
              }`}
              onClick={() => onNavigate({ view: 'module', moduleId: m.id })}
            >
              <div className="flex items-center gap-3">
                <span className={`font-mono text-2xs tracking-wider shrink-0 ${
                  isActive ? 'text-accent' : 'text-text-subtle group-hover:text-accent'
                }`}>
                  {m.number}
                </span>
                <span className="text-[14px] leading-snug flex-1 truncate font-medium tracking-tight">
                  {m.title}
                </span>
                {c.isComplete && (
                  <span className="text-accent shrink-0">
                    <Icon.Check className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
              <div className="mt-2 ml-7 h-[2px] bg-border/60 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    c.pct === 100 ? 'bg-accent' : 'bg-accent/60'
                  }`}
                  style={{ width: `${c.pct}%` }}
                />
              </div>
            </button>
          )
        })}

        <div className="pt-5 pb-1.5 px-3 eyebrow">Apply</div>

        <SidebarItem
          icon={<Icon.Task className="w-4 h-4" />}
          label="Tasks &amp; client work"
          active={view === 'tasks'}
          onClick={() => onNavigate({ view: 'tasks' })}
        />
        <SidebarItem
          icon={<Icon.Quiz className="w-4 h-4" />}
          label="End-of-week assessment"
          active={view === 'assessment'}
          rightSlot={
            progress.finalScore && (
              <span className="font-mono text-2xs text-accent">
                {progress.finalScore.score}/{progress.finalScore.total}
              </span>
            )
          }
          onClick={() => onNavigate({ view: 'assessment' })}
        />
        <SidebarItem
          icon={<Icon.Chat className="w-4 h-4" />}
          label="AI tutor"
          active={view === 'chat'}
          rightSlot={<Icon.Sparkle className="w-3 h-3 text-accent" />}
          onClick={() => onNavigate({ view: 'chat' })}
        />
      </nav>
    </aside>
  )
}

function SidebarItem({ icon, label, active, rightSlot, onClick }) {
  return (
    <button
      className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center gap-3 ${
        active
          ? 'bg-panel-2 text-text'
          : 'text-text-muted hover:bg-panel-2 hover:text-text'
      }`}
      onClick={onClick}
    >
      <span className={`shrink-0 ${active ? 'text-accent' : ''}`}>{icon}</span>
      <span className="text-[14px] font-medium tracking-tight flex-1 truncate">{label}</span>
      {rightSlot}
    </button>
  )
}
