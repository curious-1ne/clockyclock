import React, { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { timeToSeconds, secondsToTime } from "../utils/timeHelpers";
import type { Slice } from "../types/segmentTypes";

type Props = {
  slice: Slice;
  onSave: (id: string, updated: Partial<Slice>) => void;
  onClose: () => void;
};

export const SliceEditor: React.FC<Props> = ({ slice, onSave, onClose }) => {
  const [label, setLabel] = useState(slice.label);
  const [start, setStart] = useState(secondsToTime(slice.startSeconds));
  const [end, setEnd] = useState(
    secondsToTime((slice.startSeconds + slice.duration) % 3600)
  );
  const [color, setColor] = useState(slice.color);

  useEffect(() => {
    setLabel(slice.label);
    setStart(secondsToTime(slice.startSeconds));
    setEnd(secondsToTime((slice.startSeconds + slice.duration) % 3600));
    setColor(slice.color);
  }, [slice]);

  const handleSave = () => {
    try {
      const startSeconds = timeToSeconds(start);
      const endSeconds = timeToSeconds(end);
      const duration = (endSeconds - startSeconds + 3600) % 3600;
      onSave(slice.id, { label, startSeconds, duration, color });
      onClose();
    } catch {
      alert("Invalid time format. Use mm:ss");
    }
  };

  return (
    <div className="fixed top-6 right-6 w-80 z-50 bg-gray-800 text-white p-4 rounded shadow-lg border border-gray-600">
      <h2 className="text-xl font-bold mb-3">Edit Segment</h2>

      <label className="block text-sm mb-1">Label</label>
      <input
        className="bg-gray-700 p-2 mb-3 rounded w-full"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />

      <label className="block text-sm mb-1">Start (mm:ss)</label>
      <input
        className="bg-gray-700 p-2 mb-3 rounded w-full"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />

      <label className="block text-sm mb-1">End (mm:ss)</label>
      <input
        className="bg-gray-700 p-2 mb-3 rounded w-full"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />

      <label className="block text-sm mb-1">Color</label>
      <div className="mb-3">
        <HexColorPicker color={color} onChange={setColor} />
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full mt-2 h-10 rounded"
        />
      </div>

      <button
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded w-full mb-2"
        onClick={handleSave}
      >
        Save Changes
      </button>
      <button
        className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded w-full"
        onClick={onClose}
      >
        Cancel
      </button>
    </div>
  );
};
