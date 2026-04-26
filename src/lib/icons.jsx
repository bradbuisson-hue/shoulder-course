// Inline SVG icons — clean stroke-based, lucide-inspired but custom.

const baseProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const Icon = {
  Menu: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" {...baseProps}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  ),
  Close: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" {...baseProps}>
      <path d="M6 6l12 12M18 6l-12 12" />
    </svg>
  ),
  Check: ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" {...baseProps} strokeWidth={2}>
      <path d="M5 12l5 5L20 7" />
    </svg>
  ),
  Arrow: ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" {...baseProps}>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  ),
  ArrowLeft: ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" {...baseProps}>
      <path d="M19 12H5M11 5l-7 7 7 7" />
    </svg>
  ),
  ChevronDown: ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" {...baseProps}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  ),
  ChevronRight: ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" {...baseProps}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  ),
  Play: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  ),
  Sparkle: ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" {...baseProps}>
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
      <path d="M19 15l.7 2.1L22 18l-2.3.9L19 21l-.7-2.1L16 18l2.3-.9L19 15z" />
    </svg>
  ),
  Quiz: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" {...baseProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7" />
      <circle cx="12" cy="16.5" r=".5" fill="currentColor" />
    </svg>
  ),
  Case: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" {...baseProps}>
      <path d="M4 7h16v13H4z" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      <path d="M4 13h16" />
    </svg>
  ),
  Task: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" {...baseProps}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9 11l2 2 4-4" />
    </svg>
  ),
  Chat: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" {...baseProps}>
      <path d="M21 12a8 8 0 1 1-3.5-6.6L21 4l-1.4 3.5A8 8 0 0 1 21 12z" />
    </svg>
  ),
  Reset: ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" {...baseProps}>
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  ),
  Send: ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" {...baseProps}>
      <path d="M22 2L11 13" />
      <path d="M22 2L15 22l-4-9-9-4 20-7z" />
    </svg>
  ),
  Sun: ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" {...baseProps}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  ),
  Moon: ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" {...baseProps}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  Settings: ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" {...baseProps}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  Lock: ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" {...baseProps}>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  Book: ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" {...baseProps}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  Home: ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" {...baseProps}>
      <path d="M3 12l9-9 9 9M5 10v10h14V10" />
    </svg>
  ),
  Video: ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" {...baseProps}>
      <rect x="2" y="6" width="14" height="12" rx="2" />
      <path d="M22 8l-6 4 6 4z" />
    </svg>
  ),
  External: ({ className = 'w-3.5 h-3.5' }) => (
    <svg className={className} viewBox="0 0 24 24" {...baseProps}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  ),
  Logo: ({ className = 'w-6 h-6' }) => (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="9" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16" cy="16" r="3.5" fill="currentColor" />
    </svg>
  ),
}
