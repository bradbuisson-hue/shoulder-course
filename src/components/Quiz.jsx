import { useState } from 'react'
import { Icon } from '../lib/icons.jsx'
import { InlineMD } from '../lib/InlineMD.jsx'

export default function Quiz({ questions, savedScore, onComplete, title = 'Module quiz' }) {
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(!!savedScore)

  const allAnswered = questions.every((_, i) => answers[i] !== undefined)
  const score = questions.reduce(
    (acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0),
    0
  )

  const handleSubmit = () => {
    if (!allAnswered) return
    setSubmitted(true)
    onComplete?.(score, questions.length)
    window.scrollTo({ top: window.scrollY, behavior: 'smooth' })
  }

  const handleRetry = () => {
    setAnswers({})
    setSubmitted(false)
  }

  return (
    <section className="my-16">
      <div className="flex items-baseline justify-between gap-4 mb-2">
        <div>
          <div className="eyebrow text-accent mb-2">Check your understanding</div>
          <h2 className="display text-3xl">{title}</h2>
        </div>
        {savedScore && (
          <span className="pill-success">
            Last score: {savedScore.score}/{savedScore.total}
          </span>
        )}
      </div>

      <p className="text-text-muted mb-8 text-[15px]">
        {questions.length} questions. Pick the best answer; rationale appears after submission.
      </p>

      <ol className="space-y-7">
        {questions.map((q, qi) => {
          return (
            <li key={qi} className="card p-6">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-mono text-2xs text-accent tracking-wider">
                  Q{String(qi + 1).padStart(2, '0')}
                </span>
                <p className="text-[16.5px] leading-snug text-text font-medium tracking-tight">
                  {q.q}
                </p>
              </div>
              <div className="space-y-2 mt-4">
                {q.options.map((opt, oi) => {
                  const selected = answers[qi] === oi
                  const correct = q.answer === oi
                  let cls =
                    'w-full text-left px-4 py-3 rounded-lg border transition-all text-[14.5px] flex items-start gap-3 '
                  if (submitted) {
                    if (correct) cls += 'border-accent bg-accent/10 text-text'
                    else if (selected && !correct) cls += 'border-danger/40 bg-danger/5 text-text-muted line-through'
                    else cls += 'border-border text-text-subtle'
                  } else {
                    cls += selected
                      ? 'border-accent bg-accent/5 text-text'
                      : 'border-border hover:border-border-strong text-text-muted hover:text-text bg-panel/40'
                  }
                  return (
                    <button
                      key={oi}
                      className={cls}
                      disabled={submitted}
                      onClick={() => setAnswers((a) => ({ ...a, [qi]: oi }))}
                    >
                      <span className={`font-mono text-2xs tracking-widest pt-0.5 shrink-0 ${
                        submitted && correct ? 'text-accent' : 'text-text-subtle'
                      }`}>
                        {String.fromCharCode(65 + oi)}
                      </span>
                      <span className="flex-1"><InlineMD text={opt} /></span>
                      {submitted && correct && <Icon.Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />}
                    </button>
                  )
                })}
              </div>
              {submitted && (
                <div className="mt-4 px-4 py-3 rounded-lg bg-panel-2/60 border-l-2 border-accent">
                  <div className="eyebrow text-accent mb-1">Rationale</div>
                  <p className="text-[14px] leading-relaxed text-text-muted m-0">
                    <InlineMD text={q.explanation} />
                  </p>
                </div>
              )}
            </li>
          )
        })}
      </ol>

      <div className="mt-8 pt-6 border-t border-border flex items-center justify-between flex-wrap gap-4">
        {!submitted ? (
          <>
            <p className="text-sm text-text-muted">
              {allAnswered
                ? 'All set.'
                : `${Object.keys(answers).length} of ${questions.length} answered`}
            </p>
            <button className="btn-primary" disabled={!allAnswered} onClick={handleSubmit}>
              Submit answers <Icon.Arrow />
            </button>
          </>
        ) : (
          <>
            <div>
              <div className="eyebrow mb-1">Result</div>
              <div className="display text-3xl">
                {score} <span className="text-text-subtle">/ {questions.length}</span>
                <span className="ml-3 text-base text-text-muted font-normal tracking-normal">
                  {Math.round((score / questions.length) * 100)}%
                </span>
              </div>
            </div>
            <button className="btn-secondary" onClick={handleRetry}>
              <Icon.Reset /> Try again
            </button>
          </>
        )}
      </div>
    </section>
  )
}
