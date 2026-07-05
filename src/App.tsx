import { useState, useMemo } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import { AnimatePresence } from 'motion/react';

// Hooks
import { useProgress } from '@/hooks/useProgress';
import { useTheme } from '@/hooks/useTheme';
import { useSearch } from '@/hooks/useSearch';
import { useStats } from '@/hooks/useStats';

// Data
import modulesData from '@/data/modules.json';
import roadmapData from '@/data/roadmap.json';
import quizzesData from '@/data/quizzes.json';

// Types
import type { Module, ModuleQuiz, RoadmapData } from '@/types';

// Components
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { SearchDialog } from '@/components/common/SearchDialog';
import { RoadmapCanvas } from '@/components/roadmap/RoadmapCanvas';
import { ModulePage } from '@/components/module/ModulePage';
import { DashboardPage } from '@/components/dashboard/DashboardPage';

const modules = modulesData as Module[];
const quizzes = quizzesData as ModuleQuiz[];
const roadmap = roadmapData as RoadmapData;

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Progress management
  const {
    progress, getModuleProgress, startModule, toggleModuleComplete,
    toggleExercise, saveQuizScore, saveNotes, logHours,
    isCompleted, isUnlocked, setTheme, resetProgress, recordStudyDay,
  } = useProgress();

  // Theme
  const { theme, toggleTheme } = useTheme(progress, setTheme);

  // Search
  const { query, setQuery, results, isOpen: searchOpen, open: openSearch, close: closeSearch } = useSearch(modules);

  // Stats
  const stats = useStats(modules, progress);

  // Page title/subtitle based on route
  const pageInfo = useMemo(() => {
    if (location.pathname === '/roadmap') return { title: 'Roadmap', subtitle: `${stats.completedCount}/${stats.totalModules} modules completed` };
    if (location.pathname.startsWith('/module/')) {
      const id = location.pathname.split('/module/')[1];
      const mod = modules.find(m => m.id === id);
      return { title: mod?.title || 'Module', subtitle: mod?.phaseLabel };
    }
    return { title: 'Dashboard', subtitle: 'Track your progress and readiness' };
  }, [location.pathname, stats]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        theme={theme}
        toggleTheme={toggleTheme}
        progressPercent={stats.progressPercent}
        resetProgress={resetProgress}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-[240px]">
        <Header
          title={pageInfo.title}
          subtitle={pageInfo.subtitle}
          onOpenSearch={openSearch}
          onToggleSidebar={() => setSidebarOpen(prev => !prev)}
        />

        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              {/* Dashboard page (Default Landing) */}
              <Route
                path="/"
                element={
                  <div className="p-6">
                    <DashboardPage stats={stats} modules={modules} />
                  </div>
                }
              />

              {/* Roadmap */}
              <Route
                path="/roadmap"
                element={
                  <div className="h-full">
                    <RoadmapCanvas
                      roadmapData={roadmap}
                      modules={modules}
                      progress={progress}
                      toggleModuleComplete={toggleModuleComplete}
                    />
                  </div>
                }
              />

              {/* Module detail */}
              <Route
                path="/module/:id"
                element={
                  <div className="p-6">
                    <ModulePage
                      modules={modules}
                      quizzes={quizzes}
                      getModuleProgress={getModuleProgress}
                      startModule={startModule}
                      toggleModuleComplete={toggleModuleComplete}
                      toggleExercise={toggleExercise}
                      saveQuizScore={saveQuizScore}
                      saveNotes={saveNotes}
                      isCompleted={isCompleted}
                      isUnlocked={isUnlocked}
                    />
                  </div>
                }
              />
            </Routes>
          </AnimatePresence>
        </main>
      </div>

      {/* Search Dialog */}
      <SearchDialog
        isOpen={searchOpen}
        query={query}
        setQuery={setQuery}
        results={results}
        close={closeSearch}
      />
    </div>
  );
}
