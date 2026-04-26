import { Icon } from '../lib/icons.jsx'

function getEmbed(url) {
  if (!url) return null
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) {
      const id = u.pathname.slice(1)
      return { type: 'iframe', src: `https://www.youtube.com/embed/${id}` }
    }
    if (u.hostname.includes('youtube.com')) {
      const id = u.searchParams.get('v')
      if (id) return { type: 'iframe', src: `https://www.youtube.com/embed/${id}` }
    }
    if (u.hostname.includes('vimeo.com')) {
      const id = u.pathname.split('/').filter(Boolean).pop()
      return { type: 'iframe', src: `https://player.vimeo.com/video/${id}` }
    }
    if (u.pathname.endsWith('.mp4') || u.pathname.endsWith('.webm')) {
      return { type: 'video', src: url }
    }
    return { type: 'iframe', src: url }
  } catch {
    return null
  }
}

export default function VideoEmbed({ url, title }) {
  const embed = getEmbed(url)

  if (!embed) {
    return (
      <div className="my-7 aspect-video rounded-xl border border-dashed border-border bg-panel/40 flex flex-col items-center justify-center text-center px-6 group hover:border-border-strong transition-colors">
        <div className="w-12 h-12 rounded-full bg-panel border border-border flex items-center justify-center text-text-subtle mb-3 group-hover:text-accent group-hover:border-accent/40 transition-colors">
          <Icon.Video className="w-5 h-5" />
        </div>
        <div className="eyebrow mb-1.5">Video slot</div>
        <p className="text-sm text-text-muted max-w-sm leading-relaxed">
          No video added yet. Add one from the <span className="text-accent font-medium">admin page</span> or by editing this lesson in <code className="font-mono text-xs bg-panel-2 px-1.5 py-0.5 rounded">src/content/modules.js</code>.
        </p>
      </div>
    )
  }

  return (
    <div className="my-7 aspect-video bg-black rounded-xl overflow-hidden border border-border shadow-soft">
      {embed.type === 'iframe' ? (
        <iframe
          src={embed.src}
          title={title || 'Lesson video'}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <video controls className="w-full h-full">
          <source src={embed.src} />
        </video>
      )}
    </div>
  )
}
