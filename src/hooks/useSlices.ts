// File: src/hooks/useSlices.ts

import { useState } from "react";
import type { Slice, UISlice } from "../types/sliceTypesFixed";


export const useSlices = () => {
  const [slices, setSlices] = useState<Slice[]>([
    {
      id: Math.random().toString(36).slice(2, 9),
      label: "Show Segment",
      startSeconds: 0,
      duration: 840, // 14 mins
      color: "#60a5fa",
    },
    {
      id: Math.random().toString(36).slice(2, 9),
      label: "Commercial",
      startSeconds: 840,
      duration: 900, // 15 mins
      color: "#fbbf24",
    },
    {
      id: Math.random().toString(36).slice(2, 9),
      label: "Network Break",
      startSeconds: 1740,
      duration: 900, // 15 mins
      color: "#9333ea",
    },
    {
      id: Math.random().toString(36).slice(2, 9),
      label: "News",
      startSeconds: 2640,
      duration: 960, // 16 mins
      color: "#10b981",
    },
  ]);

  const addSlice = (newSlice: Omit<Slice, "id">) => {
    const sliceWithId: Slice = {
      id: Math.random().toString(36).slice(2, 9),
      ...newSlice,
    };

    setSlices((prev) =>
      [...prev, sliceWithId].sort((a, b) => a.startSeconds - b.startSeconds)
    );
  };

 const updateSlice = (id: string, updated: Partial<Slice>) => {
  setSlices((prev) =>
    prev.map((s) => (s.id === id ? { ...s, ...updated } : s))
  );
};


  const deleteSlice = (id: string) => {
    setSlices((prev) => prev.filter((s) => s.id !== id));
  };

  const getUISlices = (): UISlice[] => {
    const sorted = [...slices].sort((a, b) => a.startSeconds - b.startSeconds);
    const filled: UISlice[] = [];

    let current = 0;

    for (let i = 0; i < sorted.length; i++) {
      const slice = sorted[i];
      const { startSeconds, duration } = slice;
      const endSeconds = startSeconds + duration;

      // Fill gap before slice (if needed)
      if (startSeconds > current) {
        filled.push({
          id: `undecided-${i}`,
          label: "Undecided",
          startSeconds: current,
          duration: startSeconds - current,
          color: "#444444",
          endSeconds: startSeconds,
        });
      }

      // Defined slice
      filled.push({
        ...slice,
        endSeconds: endSeconds - 1, // Visual end 1s before next
      });

      current = endSeconds;
    }

    // Fill remaining time
    if (current < 3600) {
      filled.push({
        id: "undecided-final",
        label: "Undecided",
        startSeconds: current,
        duration: 3600 - current,
        color: "#444444",
        endSeconds: 3600,
      });
    }

    return filled;
  };

  return {
    slices,
    addSlice,
    updateSlice,
    deleteSlice,
    setSlices,
    getUISlices,
  };
};
