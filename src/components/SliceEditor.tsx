import React, { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { timeToSeconds, secondsToTime } from "../utils/timeUtils";
import type { Slice } from "../types/sliceTypes";

type Props = {
  slice: Slice;
  onSave: (id: string, updated: Partial<Slice>) => void;
  onClose: () => void;
};

export const SliceEditor: React.FC<Props> = ({ slice, onSave, onClose }) => {
  const [label, setLabel] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setLabel(slice.label);
    setStart(secondsToTime(slice.startSeconds));
    setEnd(secondsToTime((slice.startSeconds + slice.duration) % 3600));
    setColor(slice.color);
  }, [slice]);

  const handleSave = () => {
    const startSeconds = timeToSeconds(start);
    const endSeconds = timeToSeconds(end);
    const duration = (endSeconds - startSeconds + 3600) % 3600;
    onSave(slice.id, { label, startSeconds, duration, color });
    onClose();
  };

  return (
    <div className="fixed top-4 right-4 bg-gray-800 text-white p-4 rounded shadow-lg w-80 z-50">
      <h2 className="text-xl font-bold mb-3">Edit Segment</h2>

      <input
        className="bg-gray-700 p-2 rounded mb-3 w-full"
        placeholder="Label"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />

      <input
        className="bg-gray-700 p-2 rounded mb-3 w-full"
        placeholder="Start (mm:ss)"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />

      <input
        className="bg-gray-700 p-2 rounded mb-3 w-full"
        placeholder="End (mm:ss)"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />

      <div className="mb-4">
        <HexColorPicker color={color} onChange={setColor} />
      </div>

      <button
        onClick={handleSave}
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded w-full mb-2"
      >
        Save Changes
      </button>

      <button
        onClick={onClose}
        className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded w-full"
      >
        Cancel
      </button>
    </div>
  );
};
