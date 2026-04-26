import { InlineMD } from '../lib/InlineMD.jsx'

function Block({ block }) {
  switch (block.type) {
    case 'p':
      return (
        <p className="text-[16px] leading-[1.75] text-text-muted mb-4">
          <InlineMD text={block.text} />
        </p>
      )
    case 'h':
      return (
        <h3 className="text-xl font-medium tracking-tight mt-9 mb-3 text-text">
          <InlineMD text={block.text} />
        </h3>
      )
    case 'ul':
      return (
        <ul className="mb-6 space-y-2.5">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="text-[15.5px] leading-[1.7] text-text-muted pl-5 relative"
            >
              <span className="absolute left-0 top-[10px] w-1.5 h-1.5 rounded-full bg-accent" />
              <InlineMD text={item} />
            </li>
          ))}
        </ul>
      )
    case 'ol':
      return (
        <ol className="mb-6 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-4">
              <span className="font-mono text-2xs text-accent pt-1.5 tracking-wider shrink-0 w-6">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-[15.5px] leading-[1.7] text-text-muted flex-1">
                <InlineMD text={item} />
              </span>
            </li>
          ))}
        </ol>
      )
    case 'callout': {
      const tone = block.tone || 'sage'
      return (
        <aside className="my-6 rounded-xl border border-border bg-panel/60 p-5 backdrop-blur-sm">
          <div className="flex gap-3">
            <span
              className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${
                tone === 'rust' ? 'bg-amber-500' : 'bg-accent'
              }`}
            />
            <div className="flex-1">
              {block.title && (
                <div className={`eyebrow mb-1.5 ${
                  tone === 'rust' ? 'text-amber-600 dark:text-amber-500' : 'text-accent'
                }`}>
                  {block.title}
                </div>
              )}
              <p className="text-[15px] leading-[1.7] text-text-muted m-0">
                <InlineMD text={block.text} />
              </p>
            </div>
          </div>
        </aside>
      )
    }
    case 'quote':
      return (
        <blockquote className="border-l-2 border-accent pl-5 my-6 text-[16px] leading-relaxed italic text-text-muted">
          <InlineMD text={block.text} />
          {block.by && (
            <footer className="not-italic mt-2 text-sm text-text-subtle">— {block.by}</footer>
          )}
        </blockquote>
      )
    case 'definition':
      return (
        <div className="my-6 rounded-xl border border-border bg-panel/40 p-5">
          <div className="grid sm:grid-cols-[100px_1fr] gap-x-5 gap-y-1">
            <div className="eyebrow text-accent pt-0.5">Definition</div>
            <div>
              <div className="font-medium text-[16px] tracking-tight text-text mb-1">{block.term}</div>
              <p className="text-[15px] leading-[1.7] text-text-muted m-0">
                <InlineMD text={block.text} />
              </p>
            </div>
          </div>
        </div>
      )
    default:
      return null
  }
}

export default function LessonContent({ blocks }) {
  return (
    <div>
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  )
}
