import { useMemo } from 'react';
import type { Module, UserProgress, CareerLevel } from '@/types';

export interface DashboardStats {
  totalModules: number;
  completedCount: number;
  progressPercent: number;
  totalHours: number;
  hoursLogged: number;
  studyDays: number;
  currentStreak: number;
  avgQuizScore: number;
  mustKnowProgress: number;
  interviewReadiness: number;
  resumeReadiness: number;
  projectsCompleted: number;
  totalProjects: number;
  currentCareerLevel: CareerLevel;
  recommendedNext: { id: string; title: string; phase: string } | null;
  phaseProgress: Record<string, { total: number; completed: number; percent: number }>;
  weakAreas: { moduleId: string; title: string; reason: string }[];
  recentModules: string[];
}

const CAREER_LEVEL_ORDER: CareerLevel[] = ['foundation', 'junior', 'mid', 'senior', 'architect'];

export function useStats(modules: Module[], progress: UserProgress): DashboardStats {
  return useMemo(() => {
    const totalModules = modules.length;
    const completedCount = progress.completedModules.length;
    const progressPercent = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;

    // Total estimated hours
    const totalHours = modules.reduce((sum, m) => sum + m.estimatedHours, 0);

    // Hours logged
    const hoursLogged = Object.values(progress.moduleProgress).reduce(
      (sum, mp) => sum + (mp.hoursLogged || 0), 0
    );

    // Study days
    const studyDays = progress.studyDays.length;

    // Current streak
    let currentStreak = 0;
    const sortedDays = [...progress.studyDays].sort().reverse();
    if (sortedDays.length > 0) {
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (sortedDays[0] === today || sortedDays[0] === yesterday) {
        currentStreak = 1;
        for (let i = 1; i < sortedDays.length; i++) {
          const prev = new Date(sortedDays[i - 1]);
          const curr = new Date(sortedDays[i]);
          const diff = (prev.getTime() - curr.getTime()) / 86400000;
          if (diff <= 1.5) currentStreak++;
          else break;
        }
      }
    }

    // Average quiz score
    const quizScores = Object.values(progress.moduleProgress)
      .filter(mp => mp.quizScore !== undefined)
      .map(mp => mp.quizScore!);
    const avgQuizScore = quizScores.length > 0
      ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length)
      : 0;

    // Must-know progress
    const mustKnow = modules.filter(m => m.importance === 'must-know');
    const mustKnowDone = mustKnow.filter(m => progress.completedModules.includes(m.id));
    const mustKnowProgress = mustKnow.length > 0
      ? Math.round((mustKnowDone.length / mustKnow.length) * 100)
      : 0;

    // Interview readiness (weighted by interviewWeight/interviewImportance)
    const totalWeight = modules.reduce((sum, m) => sum + (m.interviewImportance || m.interviewWeight), 0);
    const completedWeight = modules
      .filter(m => progress.completedModules.includes(m.id))
      .reduce((sum, m) => sum + (m.interviewImportance || m.interviewWeight), 0);
    const interviewReadiness = totalWeight > 0
      ? Math.round((completedWeight / totalWeight) * 100)
      : 0;

    // Projects completed
    const projectModules = modules.filter(m => m.phase === 'projects');
    const totalProjects = projectModules.length;
    const projectsCompleted = projectModules.filter(m => progress.completedModules.includes(m.id)).length;

    // Resume readiness (projects + must-know + quiz scores)
    const projectScore = totalProjects > 0 ? (projectsCompleted / totalProjects) * 40 : 0;
    const mustKnowScore = mustKnowProgress * 0.4;
    const quizScore = avgQuizScore * 0.2;
    const resumeReadiness = Math.round(projectScore + mustKnowScore + quizScore);

    // Current career level (highest level where >50% of modules at that level are completed)
    let currentCareerLevel: CareerLevel = 'foundation';
    for (const level of CAREER_LEVEL_ORDER) {
      const levelModules = modules.filter(m => m.careerLevel === level);
      if (levelModules.length === 0) continue;
      const levelCompleted = levelModules.filter(m => progress.completedModules.includes(m.id)).length;
      if (levelCompleted / levelModules.length >= 0.5) {
        currentCareerLevel = level;
      }
    }

    // Recommended next topic (first unlocked, not-started, highest-priority module)
    let recommendedNext: { id: string; title: string; phase: string } | null = null;
    const unstarted = modules
      .filter(m => !progress.completedModules.includes(m.id))
      .filter(m => m.prerequisites.every(p => progress.completedModules.includes(p)))
      .sort((a, b) => (b.interviewImportance || b.interviewWeight) - (a.interviewImportance || a.interviewWeight));
    if (unstarted.length > 0) {
      recommendedNext = { id: unstarted[0].id, title: unstarted[0].title, phase: unstarted[0].phase };
    }

    // Phase progress
    const phaseProgress: Record<string, { total: number; completed: number; percent: number }> = {};
    for (const m of modules) {
      if (!phaseProgress[m.phase]) {
        phaseProgress[m.phase] = { total: 0, completed: 0, percent: 0 };
      }
      phaseProgress[m.phase].total++;
      if (progress.completedModules.includes(m.id)) {
        phaseProgress[m.phase].completed++;
      }
    }
    for (const key of Object.keys(phaseProgress)) {
      const p = phaseProgress[key];
      p.percent = p.total > 0 ? Math.round((p.completed / p.total) * 100) : 0;
    }

    // Weak areas
    const weakAreas: { moduleId: string; title: string; reason: string }[] = [];
    for (const m of modules) {
      const mp = progress.moduleProgress[m.id];
      if (mp?.quizScore !== undefined && mp.quizScore < 60) {
        weakAreas.push({ moduleId: m.id, title: m.title, reason: `Quiz score: ${mp.quizScore}%` });
      }
    }

    // Recent modules (last 5 visited)
    const recentModules = Object.entries(progress.moduleProgress)
      .filter(([, mp]) => mp.lastVisited)
      .sort((a, b) => (b[1].lastVisited || '').localeCompare(a[1].lastVisited || ''))
      .slice(0, 5)
      .map(([id]) => id);

    return {
      totalModules, completedCount, progressPercent, totalHours, hoursLogged,
      studyDays, currentStreak, avgQuizScore, mustKnowProgress, interviewReadiness,
      resumeReadiness, projectsCompleted, totalProjects, currentCareerLevel, recommendedNext,
      phaseProgress, weakAreas, recentModules,
    };
  }, [modules, progress]);
}
