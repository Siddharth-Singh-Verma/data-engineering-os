import { useEffect } from 'react';
import type { UserProgress } from '@/types';

export function useTheme(progress: UserProgress, setTheme: (t: 'dark' | 'light') => void) {
  const theme = progress.settings.theme;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return { theme, toggleTheme };
}
