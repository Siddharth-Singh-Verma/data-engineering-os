import { useNavigate } from 'react-router';
import { Search, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { Module } from '@/types';
import { CATEGORY_LABELS } from '@/types';

interface SearchDialogProps {
  isOpen: boolean;
  query: string;
  setQuery: (q: string) => void;
  results: Module[];
  close: () => void;
}

export function SearchDialog({ isOpen, query, setQuery, results, close }: SearchDialogProps) {
  const navigate = useNavigate();

  const handleSelect = (moduleId: string) => {
    close();
    navigate(`/module/${moduleId}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={close}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-lg z-50 rounded-xl border overflow-hidden"
            style={{
              background: 'var(--color-bg-card)',
              borderColor: 'var(--color-border-default)',
              boxShadow: '0 25px 60px -12px rgba(0,0,0,0.5)',
            }}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
              <Search className="w-4 h-4 text-[var(--color-text-muted)]" />
              <input
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search modules, topics, concepts..."
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: 'var(--color-text-primary)' }}
                onKeyDown={e => {
                  if (e.key === 'Escape') close();
                  if (e.key === 'Enter' && results.length > 0) handleSelect(results[0].id);
                }}
              />
              <kbd
                className="px-1.5 py-0.5 rounded text-[10px] font-mono border"
                style={{ borderColor: 'var(--color-border-default)', color: 'var(--color-text-muted)' }}
              >
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[320px] overflow-y-auto">
              {query && results.length === 0 && (
                <div className="px-4 py-8 text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  No modules found for "{query}"
                </div>
              )}
              {results.map((mod, i) => (
                <button
                  key={mod.id}
                  onClick={() => handleSelect(mod.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-[var(--color-bg-card-hover)]"
                  style={{
                    borderBottom: i < results.length - 1 ? '1px solid var(--color-border-subtle)' : undefined,
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>
                      {mod.title}
                    </div>
                    <div className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>
                      {CATEGORY_LABELS[mod.phase] || mod.phaseLabel} · {mod.estimatedHours}h
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--color-text-muted)' }} />
                </button>
              ))}
            </div>

            {/* Hint */}
            {!query && (
              <div className="px-4 py-6 text-center text-xs" style={{ color: 'var(--color-text-muted)' }}>
                Start typing to search across all modules and topics
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
