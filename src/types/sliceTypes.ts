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
