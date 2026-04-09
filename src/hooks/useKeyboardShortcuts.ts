import { useEffect } from 'react';

interface ShortcutConfig {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  metaKey?: boolean;
  callback: () => void;
}

export function useKeyboardShortcuts(shortcuts: ShortcutConfig[]) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      shortcuts.forEach(shortcut => {
        const matchesKey = e.key.toLowerCase() === shortcut.key.toLowerCase();
        const matchesCtrl = (shortcut.ctrlKey ?? false) === (e.ctrlKey || e.metaKey);
        const matchesShift = (shortcut.shiftKey ?? false) === e.shiftKey;

        if (matchesKey && matchesCtrl && matchesShift) {
          e.preventDefault();
          shortcut.callback();
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}

// Common keyboard shortcuts
export const KeyboardShortcuts = {
  SAVE: 'ctrl+s',
  EXPORT: 'ctrl+e',
  UNDO: 'ctrl+z',
  REDO: 'ctrl+shift+z',
  HELP: 'ctrl+/',
};
