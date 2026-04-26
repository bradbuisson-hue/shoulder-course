import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'shoulder-course-progress-v1'

const initialState = {
  visitedLessons: {},
  quizScores: {},
  finalScore: null,
  taskNotes: {},
  caseReflections: {},
  chatHistory: [],
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialState
    return { ...initialState, ...JSON.parse(raw) }
  } catch {
    return initialState
  }
}

export function useProgress() {
  const [state, setState] = useState(() =>
    typeof window === 'undefined' ? initialState : load()
  )

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {}
  }, [state])

  const markLessonVisited = useCallback((moduleId, lessonId) => {
    setState((s) => ({
      ...s,
      visitedLessons: { ...s.visitedLessons, [`${moduleId}/${lessonId}`]: true },
    }))
  }, [])

  const recordQuizScore = useCallback((moduleId, score, total) => {
    setState((s) => ({
      ...s,
      quizScores: {
        ...s.quizScores,
        [moduleId]: { score, total, completedAt: new Date().toISOString() },
      },
    }))
  }, [])

  const recordFinalScore = useCallback((score, total) => {
    setState((s) => ({
      ...s,
      finalScore: { score, total, completedAt: new Date().toISOString() },
    }))
  }, [])

  const saveTaskNote = useCallback((key, text) => {
    setState((s) => ({
      ...s,
      taskNotes: {
        ...s.taskNotes,
        [key]: { text, savedAt: new Date().toISOString() },
      },
    }))
  }, [])

  const saveCaseReflection = useCallback((moduleId, text) => {
    setState((s) => ({
      ...s,
      caseReflections: {
        ...s.caseReflections,
        [moduleId]: { text, savedAt: new Date().toISOString() },
      },
    }))
  }, [])

  const setChatHistory = useCallback((history) => {
    setState((s) => ({ ...s, chatHistory: history }))
  }, [])

  const reset = useCallback(() => {
    setState(initialState)
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
  }, [])

  return {
    state,
    markLessonVisited,
    recordQuizScore,
    recordFinalScore,
    saveTaskNote,
    saveCaseReflection,
    setChatHistory,
    reset,
  }
}

export function moduleCompletion(state, module) {
  const totalLessons = module.lessons.length
  const visitedLessons = module.lessons.filter(
    (l) => state.visitedLessons[`${module.id}/${l.id}`]
  ).length
  const quizDone = !!state.quizScores[module.id]
  const totalSteps = totalLessons + (module.quiz?.length ? 1 : 0)
  const completedSteps = visitedLessons + (quizDone ? 1 : 0)
  return {
    totalSteps,
    completedSteps,
    pct: totalSteps === 0 ? 0 : Math.round((completedSteps / totalSteps) * 100),
    isComplete: completedSteps === totalSteps,
  }
}
