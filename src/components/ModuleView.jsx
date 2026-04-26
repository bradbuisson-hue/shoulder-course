import { useEffect, useRef } from 'react'
import { modules } from '../content/modules.js'
import { moduleCompletion } from '../hooks/useProgress.js'
import { resolveVideoUrl } from '../hooks/useVideos.js'
import VideoEmbed from './VideoEmbed.jsx'
import LessonContent from './LessonContent.jsx'
import Quiz from './Quiz.jsx'
import CaseStudy from './CaseStudy.jsx'
import { Icon } from '../lib/icons.jsx'

export default function ModuleView({
  moduleId,
  progress,
  videos,
  onMarkLesson,
  onRecordQuiz,
  onSaveCase,
  onNavigate,
}) {
  const module = modules.find((m) => m.id === moduleId)
  const topRef = useRef(null)

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'auto', block: 'start' })
    if (module) {
      module.lessons.forEach((l) => onMarkLesson(module.id, l.id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleId])

  if (!module) return <div>Module not found.</div>

  const c = moduleCompletion(progress, module)
  const idx = modules.findIndex((m) => m.id === moduleId)
  const prev = idx > 0 ? modules[idx - 1] : null
  const next = idx < modules.length - 1 ? modules[idx + 1] : null

  return (
    <article ref={topRef} className="max-w-3xl">
      <header className="mb-12 animate-fade-up">
        <div className="flex items-center gap-3 mb-5">
          <span className="pill-neutral">
            <span className="font-mono text-accent">{module.number}</span>
            <span className="text-text-muted">·</span>
            {module.duration}
          </span>
          {c.isComplete && (
            <span className="pill-success">
              <Icon.Check className="w-3 h-3" /> Complete
            </span>
          )}
        </div>

        <h1 className="display text-4xl sm:text-5xl tracking-tightest leading-[1.05] mb-5">
          {module.title}
        </h1>

        <p className="text-[17px] leading-[1.6] text-text-muted max-w-2xl">
          {module.summary}
        </p>

        <div className="mt-7 flex items-center gap-3">
          <div className="flex-1 h-1 bg-panel-2 rounded-full overflow-hidden max-w-md">
            <div
              className="h-full bg-accent rounded-full transition-all duration-500"
              style={{ width: `${c.pct}%` }}
            />
          </div>
          <span className="font-mono text-2xs text-text-subtle tracking-wider">
            {c.completedSteps}/{c.totalSteps}
          </span>
        </div>
      </header>

      <div className="space-y-14">
        {module.lessons.map((lesson, li) => {
          const videoUrl = resolveVideoUrl(videos, module.id, lesson.id, lesson.videoPlaceholder)
          return (
            <section
              key={lesson.id}
              className="animate-fade-up"
              style={{ animationDelay: `${0.05 * li}s` }}
            >
              <div className="flex items-baseline gap-3 mb-5">
                <span className="font-mono text-accent text-2xs tracking-wider">
                  {module.number}.{String(li + 1).padStart(2, '0')}
                </span>
                <h2 className="display text-2xl tracking-tighter">{lesson.title}</h2>
              </div>

              <VideoEmbed url={videoUrl} title={lesson.title} />

              <LessonContent blocks={lesson.blocks} />
            </section>
          )
        })}
      </div>

      {module.quiz?.length > 0 && (
        <Quiz
          questions={module.quiz}
          savedScore={progress.quizScores[module.id]}
          onComplete={(s, t) => onRecordQuiz(module.id, s, t)}
          title={`Module ${module.number} quiz`}
        />
      )}

      {module.caseStudy && (
        <CaseStudy
          caseStudy={module.caseStudy}
          savedReflection={progress.caseReflections[module.id]}
          onSave={(text) => onSaveCase(module.id, text)}
        />
      )}

      <nav className="mt-16 pt-8 border-t border-border grid grid-cols-2 gap-4">
        {prev ? (
          <button
            className="text-left group card card-hover p-4"
            onClick={() => onNavigate({ view: 'module', moduleId: prev.id })}
          >
            <div className="eyebrow mb-1 flex items-center gap-1.5">
              <Icon.ArrowLeft className="w-3 h-3" /> Previous
            </div>
            <div className="font-medium text-[15px] tracking-tight group-hover:text-accent transition-colors">
              {prev.title}
            </div>
          </button>
        ) : (
          <button
            className="text-left group card card-hover p-4"
            onClick={() => onNavigate({ view: 'cover' })}
          >
            <div className="eyebrow mb-1 flex items-center gap-1.5">
              <Icon.ArrowLeft className="w-3 h-3" /> Back
            </div>
            <div className="font-medium text-[15px] tracking-tight group-hover:text-accent transition-colors">
              Course overview
            </div>
          </button>
        )}
        {next ? (
          <button
            className="text-right group card card-hover p-4"
            onClick={() => onNavigate({ view: 'module', moduleId: next.id })}
          >
            <div className="eyebrow mb-1 flex items-center justify-end gap-1.5">
              Next <Icon.Arrow className="w-3 h-3" />
            </div>
            <div className="font-medium text-[15px] tracking-tight group-hover:text-accent transition-colors">
              {next.title}
            </div>
          </button>
        ) : (
          <button
            className="text-right group card card-hover p-4"
            onClick={() => onNavigate({ view: 'assessment' })}
          >
            <div className="eyebrow mb-1 flex items-center justify-end gap-1.5">
              Next <Icon.Arrow className="w-3 h-3" />
            </div>
            <div className="font-medium text-[15px] tracking-tight group-hover:text-accent transition-colors">
              End-of-week assessment
            </div>
          </button>
        )}
      </nav>
    </article>
  )
}
