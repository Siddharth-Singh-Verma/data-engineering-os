import { useState, useMemo, useCallback, useEffect } from 'react';
import type { Module } from '@/types';

export function useSearch(modules: Module[]) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Keyboard shortcut: Ctrl+K / Cmd+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return modules.filter(m =>
      m.title.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      m.phaseLabel.toLowerCase().includes(q) ||
      m.phase.toLowerCase().includes(q) ||
      m.learningObjectives.some(o => o.toLowerCase().includes(q))
    ).slice(0, 12);
  }, [query, modules]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => { setIsOpen(false); setQuery(''); }, []);

  return { query, setQuery, results, isOpen, open, close };
}
