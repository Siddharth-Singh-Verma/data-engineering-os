import { NavLink } from 'react-router';
import { Map, LayoutDashboard, BookOpen, Sun, Moon, RotateCcw } from 'lucide-react';

interface SidebarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  progressPercent: number;
  resetProgress: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ theme, toggleTheme, progressPercent, resetProgress, isOpen, onClose }: SidebarProps) {
  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/roadmap', icon: Map, label: 'Roadmap' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full z-50 w-[240px] flex flex-col border-r transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          background: 'var(--color-bg-secondary)',
          borderColor: 'var(--color-border-subtle)',
        }}
      >
        {/* Logo */}
        <div className="p-5 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>DEOS</h1>
              <p className="text-[10px] leading-none" style={{ color: 'var(--color-text-muted)' }}>Data Engineering OS</p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="px-5 pb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Progress</span>
            <span className="text-xs font-semibold" style={{ color: 'var(--color-accent)' }}>{progressPercent}%</span>
          </div>
          <div className="h-1.5 rounded-full" style={{ background: 'var(--color-bg-surface)' }}>
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${progressPercent}%`,
                background: 'linear-gradient(90deg, hsl(217, 91%, 60%), hsl(270, 60%, 60%))',
              }}
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-white'
                    : 'hover:bg-[var(--color-bg-card-hover)]'
                }`
              }
              style={({ isActive }) => ({
                background: isActive ? 'var(--color-accent-muted)' : undefined,
                color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
              })}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="p-3 border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 w-full hover:bg-[var(--color-bg-card-hover)]"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button
            onClick={() => { if (confirm('Reset all progress? This cannot be undone.')) resetProgress(); }}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 w-full hover:bg-[var(--color-bg-card-hover)]"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <RotateCcw className="w-4 h-4" />
            Reset Progress
          </button>
        </div>

        {/* Keyboard shortcut hint */}
        <div className="px-5 pb-4">
          <div
            className="text-[10px] px-2 py-1.5 rounded-md text-center"
            style={{ background: 'var(--color-bg-surface)', color: 'var(--color-text-muted)' }}
          >
            Press <kbd className="px-1 py-0.5 rounded text-[9px] font-mono border" style={{ borderColor: 'var(--color-border-default)' }}>Ctrl+K</kbd> to search
          </div>
        </div>
      </aside>
    </>
  );
}
