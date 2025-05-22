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
    (set) => ({
      savedClocks: [],
      currentClock: null,
      addClock: (name, episodeNumber, slices) => {
        const newClock: SavedClock = {
          id: crypto.randomUUID(),
          name,
          episodeNumber,
          date: new Date().toISOString(),
          slices: [...slices], // Create a new array to ensure proper state updates
        };
        set((state) => ({
          savedClocks: [...state.savedClocks, newClock],
          currentClock: newClock,
        }));
      },
      loadClock: (id) => {
        set((state) => ({
          currentClock: state.savedClocks.find((c) => c.id === id) || null,
        }));
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
      version: 1,
    }
  )
);