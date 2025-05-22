export type Slice = {
  id: string;
  label: string;
  startSeconds: number;
  duration: number;
  color: string;
};

export type UISlice = Slice & {
  endSeconds: number;
};

export type SavedClock = {
  id: string;
  name: string;
  episodeNumber: string;
  date: string;
  slices: Slice[];
};