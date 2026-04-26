import { useTheme } from '../hooks/useTheme.js'
import { Icon } from '../lib/icons.jsx'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'
  return (
    <button
      onClick={toggle}
      className={`relative inline-flex items-center justify-center w-9 h-9 text-text-muted hover:text-text hover:bg-panel-2 rounded-lg transition-all ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className={`absolute transition-all duration-300 ${isDark ? 'opacity-0 scale-50 rotate-90' : 'opacity-100 scale-100 rotate-0'}`}>
        <Icon.Sun className="w-4 h-4" />
      </span>
      <span className={`absolute transition-all duration-300 ${isDark ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-90'}`}>
        <Icon.Moon className="w-4 h-4" />
      </span>
    </button>
  )
}
