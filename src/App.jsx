import { useState, useEffect } from 'react'
import { useProgress } from './hooks/useProgress.js'
import { useVideos } from './hooks/useVideos.js'
import { courseMeta, modules } from './content/modules.js'
import { Icon } from './lib/icons.jsx'

import Sidebar from './components/Sidebar.jsx'
import CoverView from './components/CoverView.jsx'
import ModuleView from './components/ModuleView.jsx'
import TasksView from './components/TasksView.jsx'
import AssessmentView from './components/AssessmentView.jsx'
import ChatTutor from './components/ChatTutor.jsx'
import AdminView from './components/AdminView.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'

export default function App() {
  // Admin page is a separate route at /admin
  const isAdmin =
    typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')

  if (isAdmin) {
    return <AdminView />
  }

  return <CourseApp />
}

function CourseApp() {
  const {
    state: progress,
    markLessonVisited,
    recordQuizScore,
    recordFinalScore,
    saveTaskNote,
    saveCaseReflection,
    setChatHistory,
    reset,
  } = useProgress()

  const { videos } = useVideos()

  const [view, setView] = useState({ view: 'cover' })
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [view])

  const navigate = (next) => {
    setView(next)
    setSidebarOpen(false)
  }

  const renderMain = () => {
    switch (view.view) {
      case 'module':
        return (
          <ModuleView
            moduleId={view.moduleId}
            progress={progress}
            videos={videos}
            onMarkLesson={markLessonVisited}
            onRecordQuiz={recordQuizScore}
            onSaveCase={saveCaseReflection}
            onNavigate={navigate}
          />
        )
      case 'tasks':
        return <TasksView progress={progress} onSaveTask={saveTaskNote} />
      case 'assessment':
        return <AssessmentView progress={progress} onRecordFinal={recordFinalScore} />
      case 'chat':
        return <ChatTutor history={progress.chatHistory} setHistory={setChatHistory} />
      case 'cover':
      default:
        return <CoverView progress={progress} onNavigate={navigate} />
    }
  }

  // Overall progress
  const overallTotal = modules.reduce(
    (acc, m) => acc + m.lessons.length + (m.quiz?.length ? 1 : 0),
    0
  )
  const overallDone = modules.reduce(
    (acc, m) =>
      acc +
      m.lessons.filter((l) => progress.visitedLessons[`${m.id}/${l.id}`]).length +
      (progress.quizScores[m.id] ? 1 : 0),
    0
  )
  const overallPct = Math.round((overallDone / overallTotal) * 100)

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-bg/70 backdrop-blur-sm border-b border-border">
        <div className="px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-4">
          <button
            className="lg:hidden text-text-muted hover:text-text p-1 -ml-1"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Icon.Menu />
          </button>

          <button
            onClick={() => navigate({ view: 'cover' })}
            className="lg:hidden flex items-center gap-2 hover:opacity-70 transition-opacity"
          >
            <Icon.Logo className="w-5 h-5 text-accent" />
            <span className="font-medium text-[14px] tracking-tight">{courseMeta.title}</span>
          </button>

          <div className="hidden lg:block flex-1" />

          <div className="ml-auto flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-panel-2/60 border border-border">
              <div className="w-20 h-1 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-500"
                  style={{ width: `${overallPct}%` }}
                />
              </div>
              <span className="font-mono text-2xs text-text-muted tracking-wider">
                {overallPct}%
              </span>
            </div>
            <ThemeToggle />
            <button
              onClick={() => setResetConfirmOpen(true)}
              className="w-9 h-9 inline-flex items-center justify-center text-text-muted hover:text-danger hover:bg-panel-2 rounded-lg transition-all"
              aria-label="Reset progress"
              title="Reset progress"
            >
              <Icon.Reset />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 grid lg:grid-cols-[260px_1fr]">
        {/* Sidebar — desktop */}
        <div className="hidden lg:block sticky top-14 h-[calc(100vh-3.5rem)]">
          <Sidebar
            view={view.view}
            currentModuleId={view.moduleId}
            progress={progress}
            onNavigate={navigate}
          />
        </div>

        {/* Sidebar — mobile drawer */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-40 flex">
            <div
              className="absolute inset-0 bg-black/50 animate-fade-in"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative w-[280px] max-w-[85vw] h-full animate-slide-in-right">
              <Sidebar
                view={view.view}
                currentModuleId={view.moduleId}
                progress={progress}
                onNavigate={navigate}
                onClose={() => setSidebarOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Main */}
        <main className="px-5 sm:px-8 lg:px-14 py-10 lg:py-14 max-w-full">
          {renderMain()}
        </main>
      </div>

      <footer className="border-t border-border mt-12 px-4 sm:px-6 lg:px-8 py-6 text-center">
        <p className="text-2xs text-text-subtle tracking-wide">
          {courseMeta.title} · {courseMeta.edition} · For educational use during placement
        </p>
      </footer>

      {/* Reset confirmation */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setResetConfirmOpen(false)}
          />
          <div className="relative card max-w-md w-full p-7 animate-fade-up shadow-lifted">
            <div className="eyebrow text-danger mb-2">Reset progress</div>
            <h2 className="display text-2xl mb-3 tracking-tight">Start over?</h2>
            <p className="text-[14.5px] leading-relaxed text-text-muted mb-6">
              This will clear all quiz scores, task notes, case reflections and chat history saved
              in this browser. Useful when handing the course to a new placement student.
            </p>
            <div className="flex gap-2 justify-end">
              <button className="btn-ghost" onClick={() => setResetConfirmOpen(false)}>
                Cancel
              </button>
              <button
                className="btn-danger"
                onClick={() => {
                  reset()
                  setResetConfirmOpen(false)
                  setView({ view: 'cover' })
                }}
              >
                Reset everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
