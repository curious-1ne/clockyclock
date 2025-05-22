import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SavedClock, Slice } from '../types/sliceTypes';

interface ClockState {
  savedClocks: SavedClock[];
  currentClock: SavedClock | null;
  addClock: (name: string, episodeNumber: string, slices: Slice[]) => void;
  loadClock: (id: string) => void;
  deleteClock: (id: string) => void;
}

export const useClockStore = create<ClockState>()(
  persist(
    (set, get) => ({
      savedClocks: [],
      currentClock: null,
      addClock: (name, episodeNumber, slices) => {
        const newClock: SavedClock = {
          id: crypto.randomUUID(),
          name,
          episodeNumber,
          date: new Date().toISOString(),
          slices,
        };
        set((state) => ({
          savedClocks: [...state.savedClocks, newClock],
          currentClock: newClock,
        }));
      },
      loadClock: (id) => {
        const clock = get().savedClocks.find((c) => c.id === id);
        if (clock) {
          set({ currentClock: clock });
        }
      },
      deleteClock: (id) => {
        set((state) => ({
          savedClocks: state.savedClocks.filter((c) => c.id !== id),
          currentClock: state.currentClock?.id === id ? null : state.currentClock,
        }));
      },
    }),
    {
      name: 'radio-clock-storage',
    }
  )
);