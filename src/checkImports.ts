// File: src/checkImports.ts

// 👇 These force Vercel to include these files in the build
import { timeToSeconds, secondsToTime } from ../utils/timeUtils";
import type { Slice, UISlice } from "./types/segmentTypes";

// Dummy usage
const dummyTime = timeToSeconds("01:30");
const dummySlice: Slice = {
  id: "dummy",
  label: "Test",
  startSeconds: dummyTime,
  duration: 120,
  color: "#000000"
};
console.log("Forcing build to include:", dummySlice);
