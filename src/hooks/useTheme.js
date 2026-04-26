import { useEffect, useState, useCallback } from 'react'

export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    if (document.documentElement.classList.contains('dark')) return 'dark'
    return 'light'
  })

  const setTheme = useCallback((next) => {
    if (next === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    try {
      localStorage.setItem('theme', next)
    } catch {}
    setThemeState(next)
  }, [])

  const toggle = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  // Sync state with class on mount (in case the inline init script set it)
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setThemeState(isDark ? 'dark' : 'light')
  }, [])

  return { theme, setTheme, toggle }
}
