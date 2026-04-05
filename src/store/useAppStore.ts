import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CoverData } from '../utils/templates';

interface ProfileState {
  name: string;
  department: string;
  bio: string;
}

interface SettingsState {
  theme: string;
  dpi: string;
  autoSync: boolean;
}

export type NotificationType = 'success' | 'error' | 'info';

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
}

export interface SavedCover extends CoverData {
  id: number;
  name: string;
  date: string;
  size: string;
  img: string;
  color: string;
}

interface AppState {
  profile: ProfileState;
  settings: SettingsState;
  savedCovers: SavedCover[];
  notifications: Notification[];
  
  updateProfile: (profile: Partial<ProfileState>) => void;
  updateSettings: (settings: Partial<SettingsState>) => void;
  saveCover: (cover: SavedCover) => void;
  deleteCover: (id: number) => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      profile: {
        name: 'Professor Default',
        department: 'Department of General Studies',
        bio: 'Your public and private profile data is securely maintained locally. Connect an institutional account to automatically fill cover generator forms with your standardized details.',
      },
      settings: {
        theme: 'system',
        dpi: '300',
        autoSync: true,
      },
      savedCovers: [],
      notifications: [],
      
      updateProfile: (profile) => set((state) => ({ profile: { ...state.profile, ...profile } })),
      updateSettings: (settings) => set((state) => ({ settings: { ...state.settings, ...settings } })),
      saveCover: (cover) => set((state) => ({ savedCovers: [cover, ...state.savedCovers] })),
      deleteCover: (id) => set((state) => ({ savedCovers: state.savedCovers.filter(c => c.id !== id) })),
      addNotification: (notification) => {
        const id = Math.random().toString(36).substring(2, 9);
        set((state) => ({ notifications: [...state.notifications, { ...notification, id }] }));
      },
      removeNotification: (id) => set((state) => ({ notifications: state.notifications.filter(n => n.id !== id) })),
    }),
    {
      name: 'scholarflow-storage',
    }
  )
);
