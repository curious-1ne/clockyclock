// File: src/utils/timeUtils.ts

/**
 * Converts a time string like "mm:ss" into total seconds
 */
export const timeToSeconds = (time: string): number => {
    const [m, s] = time.split(':').map(Number);
    return m * 60 + s;
  };
  
  /**
   * Converts total seconds into a "mm:ss" string
   */
  export const secondsToTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };
  
  /**
   * Clamps any number of seconds into the 0–3599 range
   * Handles wraparound using mod math (e.g. -60 → 3540)
   */
  export const clampSeconds = (sec: number): number => {
    return ((sec % 3600) + 3600) % 3600;
  };
  