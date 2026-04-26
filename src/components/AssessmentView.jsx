import Quiz from './Quiz.jsx'
import { finalAssessment } from '../content/modules.js'

export default function AssessmentView({ progress, onRecordFinal }) {
  return (
    <article className="max-w-3xl">
      <header className="mb-10">
        <div className="eyebrow text-accent mb-3">Summative</div>
        <h1 className="display text-4xl sm:text-5xl mb-5 tracking-tightest">
          {finalAssessment.title}
        </h1>
        <p className="text-[16px] leading-[1.65] text-text-muted max-w-2xl">
          {finalAssessment.description}
        </p>
        {progress.finalScore && (
          <div className="mt-6 inline-flex items-center gap-3 card px-5 py-3">
            <span className="eyebrow">Last attempt</span>
            <span className="display text-2xl">
              {progress.finalScore.score}<span className="text-text-subtle">/{progress.finalScore.total}</span>
            </span>
            <span className="font-mono text-2xs text-text-muted">
              ({Math.round((progress.finalScore.score / progress.finalScore.total) * 100)}%)
            </span>
          </div>
        )}
      </header>

      <Quiz
        questions={finalAssessment.questions}
        savedScore={progress.finalScore}
        onComplete={(s, t) => onRecordFinal(s, t)}
        title="Final questions"
      />
    </article>
  )
}
