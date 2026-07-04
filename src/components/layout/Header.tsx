import { Search, Menu } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onOpenSearch: () => void;
  onToggleSidebar: () => void;
}

export function Header({ title, subtitle, onOpenSearch, onToggleSidebar }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-6 py-3 border-b backdrop-blur-md"
      style={{
        background: 'color-mix(in srgb, var(--color-bg-primary) 85%, transparent)',
        borderColor: 'var(--color-border-subtle)',
      }}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-1.5 rounded-lg hover:bg-[var(--color-bg-card-hover)] transition-colors"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>{title}</h2>
          {subtitle && (
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{subtitle}</p>
          )}
        </div>
      </div>

      <button
        onClick={onOpenSearch}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm transition-all duration-200 hover:border-[var(--color-accent)]"
        style={{
          background: 'var(--color-bg-card)',
          borderColor: 'var(--color-border-default)',
          color: 'var(--color-text-muted)',
        }}
      >
        <Search className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden sm:inline px-1.5 py-0.5 rounded text-[10px] font-mono border" style={{ borderColor: 'var(--color-border-default)' }}>
          Ctrl+K
        </kbd>
      </button>
    </header>
  );
}
