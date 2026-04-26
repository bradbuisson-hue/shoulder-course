import { courseMeta, modules } from '../content/modules.js'
import { Icon } from '../lib/icons.jsx'
import { moduleCompletion } from '../hooks/useProgress.js'

export default function CoverView({ progress, onNavigate }) {
  const overall = modules.reduce(
    (acc, m) => {
      const c = moduleCompletion(progress, m)
      return {
        completed: acc.completed + c.completedSteps,
        total: acc.total + c.totalSteps,
      }
    },
    { completed: 0, total: 0 }
  )
  const overallPct = overall.total === 0 ? 0 : Math.round((overall.completed / overall.total) * 100)
  const totalLessons = modules.reduce((a, m) => a + m.lessons.length, 0)

  return (
    <article className="max-w-5xl">
      {/* Hero */}
      <section className="relative pb-20 mb-12 animate-fade-up">
        <div className="hero-glow" />

        <div className="relative">
          <div className="flex items-center gap-2 mb-8">
            <span className="pill-neutral">
              <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
              {courseMeta.weekFocus}
            </span>
            <span className="pill-neutral">{courseMeta.edition}</span>
          </div>

          <h1 className="display text-[52px] sm:text-[80px] leading-[0.95] tracking-tightest mb-5 max-w-3xl">
            The Shoulder
            <br />
            <span className="text-text-muted">&amp; Rotator Cuff.</span>
          </h1>

          <p className="text-[18px] leading-[1.55] text-text-muted max-w-2xl mb-10">
            A clinical course for placement students. Five modules covering anatomy, common
            pathologies, rehabilitation techniques, programming, and session planning — built
            around applied client work and a study tutor that keeps the reasoning honest.
          </p>

          <div className="flex gap-3 flex-wrap">
            <button
              className="btn-primary"
              onClick={() => onNavigate({ view: 'module', moduleId: modules[0].id })}
            >
              {overall.completed > 0 ? 'Continue course' : 'Begin course'} <Icon.Arrow />
            </button>
            <button className="btn-secondary" onClick={() => onNavigate({ view: 'chat' })}>
              <Icon.Sparkle /> Talk to AI tutor
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mb-16 animate-fade-up" style={{ animationDelay: '0.1s' }}>
        <div className="grid grid-cols-3 divide-x divide-border border-y border-border">
          <div className="px-6 py-6">
            <div className="eyebrow mb-2">Modules</div>
            <div className="display text-3xl">{modules.length}</div>
          </div>
          <div className="px-6 py-6">
            <div className="eyebrow mb-2">Lessons</div>
            <div className="display text-3xl">{totalLessons}</div>
          </div>
          <div className="px-6 py-6">
            <div className="eyebrow mb-2">Progress</div>
            <div className="display text-3xl">
              {overallPct}<span className="text-text-subtle text-xl ml-0.5">%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Module list */}
      <section className="mb-16 animate-fade-up" style={{ animationDelay: '0.15s' }}>
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="display text-2xl">Course contents</h2>
          <span className="eyebrow">{modules.length} modules</span>
        </div>

        <div className="space-y-2">
          {modules.map((m) => {
            const c = moduleCompletion(progress, m)
            return (
              <button
                key={m.id}
                onClick={() => onNavigate({ view: 'module', moduleId: m.id })}
                className="w-full text-left card card-hover group p-5 grid grid-cols-[40px_1fr_auto] gap-5 items-baseline"
              >
                <span className="font-mono text-accent text-xs tracking-wider">{m.number}</span>
                <div>
                  <h3 className="font-medium text-[18px] tracking-tight leading-tight mb-1.5 text-text group-hover:text-accent transition-colors">
                    {m.title}
                  </h3>
                  <p className="text-[14px] text-text-muted leading-snug pr-6 mb-0">{m.summary}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="eyebrow mb-1.5">{m.duration}</div>
                  <div className="flex items-center gap-1.5 justify-end">
                    {c.isComplete ? (
                      <span className="pill-success">
                        <Icon.Check className="w-3 h-3" /> Complete
                      </span>
                    ) : (
                      <span className="font-mono text-2xs text-text-subtle tracking-wider">
                        {c.completedSteps}/{c.totalSteps}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* Feature cards */}
      <section className="grid sm:grid-cols-3 gap-4 mb-16 animate-fade-up" style={{ animationDelay: '0.2s' }}>
        <FeatureCard
          icon={<Icon.Quiz className="w-4 h-4" />}
          eyebrow="Per module"
          title="Quizzes &amp; case studies"
          text="Multiple-choice quizzes after each module, plus a clinical case study with reflection prompts."
        />
        <FeatureCard
          icon={<Icon.Task className="w-4 h-4" />}
          eyebrow="Applied"
          title="Tasks with clients"
          text="Practical tasks to complete with real or simulated clients, with space to log your reflections."
        />
        <FeatureCard
          icon={<Icon.Sparkle className="w-4 h-4" />}
          eyebrow="Always available"
          title="A study tutor"
          text="An AI tutor focused on the shoulder — for reasoning practice, not for spoon-feeding answers."
        />
      </section>

      <section className="border-t border-border pt-8 animate-fade-up" style={{ animationDelay: '0.25s' }}>
        <div className="grid sm:grid-cols-[160px_1fr] gap-4">
          <div className="eyebrow">How to work through this</div>
          <div className="text-[15px] leading-[1.7] text-text-muted">
            <p className="mb-3">
              Take the modules in order. Watch the videos, read the notes, complete the quizzes —
              the case studies and tasks are where the learning compounds. Use the AI tutor whenever
              you get stuck, and bring your reflections to your supervisor.
            </p>
            <p className="m-0 text-text-subtle">
              Aim for 80%+ on the end-of-week assessment before the supervisor sign-off.
            </p>
          </div>
        </div>
      </section>
    </article>
  )
}

function FeatureCard({ icon, eyebrow, title, text }) {
  return (
    <div className="card p-5">
      <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4">
        {icon}
      </div>
      <div className="eyebrow mb-1.5">{eyebrow}</div>
      <h3 className="font-medium text-[15.5px] tracking-tight mb-2 text-text" dangerouslySetInnerHTML={{ __html: title }} />
      <p className="text-[13.5px] text-text-muted leading-relaxed mb-0">{text}</p>
    </div>
  )
}
