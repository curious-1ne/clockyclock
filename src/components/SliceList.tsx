import React, { useState } from "react";
import { secondsToTime, timeToSeconds } from "../utils/timeUtils";
import type { Slice } from "../types/sliceTypes";

type Props = {
  slices: Slice[];
  onDelete: (id: string) => void;
  onAdd: (newSlice: Omit<Slice, "id">) => void;
  onSelect: (slice: Slice) => void;
};

export const SliceList: React.FC<Props> = ({
  slices,
  onDelete,
  onAdd,
  onSelect,
}) => {
  const [newRow, setNewRow] = useState({ label: "", start: "", end: "" });

  const handleAdd = () => {
    const { label, start, end } = newRow;
    if (!label || !start || !end) return;

    try {
      const startSec = timeToSeconds(start);
      const endSec = timeToSeconds(end);
      if (isNaN(startSec) || isNaN(endSec)) throw new Error("NaN");

      const duration = (endSec - startSec + 3600) % 3600;

      if (duration === 0) {
        alert("Duration must be > 0 seconds");
        return;
      }

      const color = `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`;

      onAdd({ label, startSeconds: startSec, duration, color });
      setNewRow({ label: "", start: "", end: "" });
    } catch {
      alert("Invalid time format. Please use mm:ss");
    }
  };

  return (
    <div className="w-full space-y-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-700">
            <th>Color</th>
            <th>Label</th>
            <th>Start</th>
            <th>End</th>
            <th>✖</th>
          </tr>
        </thead>
        <tbody>
          {slices.map((s) => {
            const end = secondsToTime((s.startSeconds + s.duration) % 3600);
            return (
              <tr
                key={s.id}
                className="border-b border-gray-700 hover:bg-gray-800 cursor-pointer"
                onClick={() => onSelect(s)}
              >
                <td className="p-2">
                  <div
                    className="w-5 h-5 rounded"
                    style={{ backgroundColor: s.color }}
                  />
                </td>
                <td className="p-2">{s.label}</td>
                <td className="p-2">{secondsToTime(s.startSeconds)}</td>
                <td className="p-2">{end}</td>
                <td className="p-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // prevent opening editor on delete
                      onDelete(s.id);
                    }}
                    className="text-red-400 hover:text-red-600"
                  >
                    ✖
                  </button>
                </td>
              </tr>
            );
          })}

          <tr>
            <td></td>
            <td>
              <input
                className="bg-gray-700 text-white p-1 rounded w-full"
                placeholder="New section"
                value={newRow.label}
                onChange={(e) =>
                  setNewRow((r) => ({ ...r, label: e.target.value }))
                }
              />
            </td>
            <td>
              <input
                className="bg-gray-700 text-white p-1 rounded w-full"
                placeholder="mm:ss"
                value={newRow.start}
                onChange={(e) =>
                  setNewRow((r) => ({ ...r, start: e.target.value }))
                }
              />
            </td>
            <td>
              <input
                className="bg-gray-700 text-white p-1 rounded w-full"
                placeholder="mm:ss"
                value={newRow.end}
                onChange={(e) =>
                  setNewRow((r) => ({ ...r, end: e.target.value }))
                }
              />
            </td>
            <td>
              <button
                onClick={handleAdd}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                ➕
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
