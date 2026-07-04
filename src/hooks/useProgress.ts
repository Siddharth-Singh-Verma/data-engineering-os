import { useState, useEffect, useCallback } from 'react';
import type { UserProgress, ModuleProgress } from '@/types';

const STORAGE_KEY = 'deos-user-progress';

const defaultProgress: UserProgress = {
  completedModules: [],
  moduleProgress: {},
  studyDays: [],
  settings: { theme: 'dark' },
};

function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultProgress };
    return { ...defaultProgress, ...JSON.parse(raw) };
  } catch {
    return { ...defaultProgress };
  }
}

function saveProgress(progress: UserProgress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(loadProgress);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // Record today as a study day
  const recordStudyDay = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    setProgress(prev => {
      if (prev.studyDays.includes(today)) return prev;
      return { ...prev, studyDays: [...prev.studyDays, today] };
    });
  }, []);

  // Get or initialize module progress
  const getModuleProgress = useCallback((moduleId: string): ModuleProgress => {
    return progress.moduleProgress[moduleId] || {
      started: false,
      exercisesCompleted: [],
      quizAttempts: 0,
      hoursLogged: 0,
      notes: '',
    };
  }, [progress]);

  // Mark module as started
  const startModule = useCallback((moduleId: string) => {
    recordStudyDay();
    setProgress(prev => ({
      ...prev,
      moduleProgress: {
        ...prev.moduleProgress,
        [moduleId]: {
          ...prev.moduleProgress[moduleId] || {
            started: false, exercisesCompleted: [], quizAttempts: 0, hoursLogged: 0, notes: '',
          },
          started: true,
          lastVisited: new Date().toISOString(),
        },
      },
    }));
  }, [recordStudyDay]);

  // Toggle module completion
  const toggleModuleComplete = useCallback((moduleId: string) => {
    recordStudyDay();
    setProgress(prev => {
      const isCompleted = prev.completedModules.includes(moduleId);
      const completedModules = isCompleted
        ? prev.completedModules.filter(id => id !== moduleId)
        : [...prev.completedModules, moduleId];

      const mp = prev.moduleProgress[moduleId] || {
        started: true, exercisesCompleted: [], quizAttempts: 0, hoursLogged: 0, notes: '',
      };

      return {
        ...prev,
        completedModules,
        moduleProgress: {
          ...prev.moduleProgress,
          [moduleId]: {
            ...mp,
            started: true,
            completedAt: isCompleted ? undefined : new Date().toISOString(),
          },
        },
      };
    });
  }, [recordStudyDay]);

  // Toggle exercise completion
  const toggleExercise = useCallback((moduleId: string, exercise: string) => {
    recordStudyDay();
    setProgress(prev => {
      const mp = prev.moduleProgress[moduleId] || {
        started: true, exercisesCompleted: [], quizAttempts: 0, hoursLogged: 0, notes: '',
      };
      const done = mp.exercisesCompleted.includes(exercise);
      return {
        ...prev,
        moduleProgress: {
          ...prev.moduleProgress,
          [moduleId]: {
            ...mp,
            started: true,
            exercisesCompleted: done
              ? mp.exercisesCompleted.filter(e => e !== exercise)
              : [...mp.exercisesCompleted, exercise],
          },
        },
      };
    });
  }, [recordStudyDay]);

  // Save quiz score
  const saveQuizScore = useCallback((moduleId: string, score: number) => {
    recordStudyDay();
    setProgress(prev => {
      const mp = prev.moduleProgress[moduleId] || {
        started: true, exercisesCompleted: [], quizAttempts: 0, hoursLogged: 0, notes: '',
      };
      return {
        ...prev,
        moduleProgress: {
          ...prev.moduleProgress,
          [moduleId]: {
            ...mp,
            started: true,
            quizScore: score,
            quizAttempts: (mp.quizAttempts || 0) + 1,
          },
        },
      };
    });
  }, [recordStudyDay]);

  // Save notes
  const saveNotes = useCallback((moduleId: string, notes: string) => {
    setProgress(prev => {
      const mp = prev.moduleProgress[moduleId] || {
        started: true, exercisesCompleted: [], quizAttempts: 0, hoursLogged: 0, notes: '',
      };
      return {
        ...prev,
        moduleProgress: {
          ...prev.moduleProgress,
          [moduleId]: { ...mp, notes },
        },
      };
    });
  }, []);

  // Log hours
  const logHours = useCallback((moduleId: string, hours: number) => {
    recordStudyDay();
    setProgress(prev => {
      const mp = prev.moduleProgress[moduleId] || {
        started: true, exercisesCompleted: [], quizAttempts: 0, hoursLogged: 0, notes: '',
      };
      return {
        ...prev,
        moduleProgress: {
          ...prev.moduleProgress,
          [moduleId]: { ...mp, hoursLogged: (mp.hoursLogged || 0) + hours },
        },
      };
    });
  }, [recordStudyDay]);

  // Check if module is completed
  const isCompleted = useCallback((moduleId: string) => {
    return progress.completedModules.includes(moduleId);
  }, [progress.completedModules]);

  // Check if module is unlocked (all prerequisites completed)
  const isUnlocked = useCallback((prerequisites: string[]) => {
    if (prerequisites.length === 0) return true;
    return prerequisites.every(p => progress.completedModules.includes(p));
  }, [progress.completedModules]);

  // Set theme
  const setTheme = useCallback((theme: 'dark' | 'light') => {
    setProgress(prev => ({ ...prev, settings: { ...prev.settings, theme } }));
  }, []);

  // Reset all progress
  const resetProgress = useCallback(() => {
    setProgress({ ...defaultProgress });
  }, []);

  return {
    progress,
    getModuleProgress,
    startModule,
    toggleModuleComplete,
    toggleExercise,
    saveQuizScore,
    saveNotes,
    logHours,
    isCompleted,
    isUnlocked,
    setTheme,
    resetProgress,
    recordStudyDay,
  };
}
