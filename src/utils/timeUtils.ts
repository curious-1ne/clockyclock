export const timeToSeconds = (time: string): number => {
  const [m, s] = time.split(":").map(Number);
  return m * 60 + s;
};

export const secondsToTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

export const clampSeconds = (sec: number): number => {
  return ((sec % 3600) + 3600) % 3600;
};
