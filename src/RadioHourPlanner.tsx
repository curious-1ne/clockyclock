import React, { useState } from "react";
import { useSlices } from "./hooks/useSlices";
import { ClockChart } from "./components/ClockChart";
import { SliceList } from "./components/SliceList";
import { ExportPanel } from "./components/ExportPanel";
import { HexColorPicker } from "react-colorful";
import { timeToSeconds, secondsToTime } from "./utils/timeUtils";
import type { Slice, UISlice } from "./types/sliceTypes";

export default function RadioHourPlanner() {
  const {
    slices,
    updateSlice,
    deleteSlice,
    addSlice,
    getUISlices,
    setSlices,
  } = useSlices();

  const [selectedSlice, setSelectedSlice] = useState<Slice | null>(null);

  const convertToEditable = (s: UISlice): Slice | null => {
    if (s.id.startsWith("undecided")) return null;
    return {
      id: s.id,
      label: s.label,
      startSeconds: s.startSeconds,
      duration: s.duration,
      color: s.color,
    };
  };

  // Local editing state
  const [label, setLabel] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [color, setColor] = useState("#ffffff");

  // Update local fields when slice is selected
  React.useEffect(() => {
    if (!selectedSlice) return;
    setLabel(selectedSlice.label);
    setStart(secondsToTime(selectedSlice.startSeconds));
    setEnd(
      secondsToTime((selectedSlice.startSeconds + selectedSlice.duration) % 3600)
    );
    setColor(selectedSlice.color);
  }, [selectedSlice]);

  const handleSave = () => {
    if (!selectedSlice) return;
    const startSeconds = timeToSeconds(start);
    const endSeconds = timeToSeconds(end);
    const duration = (endSeconds - startSeconds + 3600) % 3600;
    updateSlice(selectedSlice.id, {
      label,
      startSeconds,
      duration,
      color,
    });
    setSelectedSlice(null);
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-6 relative">
      <h1 className="text-3xl font-bold text-center mb-6">
        Broadcast Clock Planner
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 justify-center">
        <ClockChart
          slices={getUISlices()}
          onSelectSlice={(s) => {
            const editable = convertToEditable(s);
            if (editable) setSelectedSlice(editable);
          }}
        />

        <div className="w-full lg:w-[500px] space-y-6">
          <SliceList
            slices={slices}
            onDelete={deleteSlice}
            onAdd={addSlice}
            onSelect={(s) => setSelectedSlice(s)}
          />

          <ExportPanel
            onImport={(imported) =>
              setSlices(
                imported.map((s) => ({
                  ...s,
                  id: Math.random().toString(36).slice(2, 9),
                }))
              )
            }
          />
        </div>

        {/* Always-visible editor */}
        <div className="bg-gray-800 p-4 rounded-lg w-80 shadow-lg z-50 self-start">
          <h2 className="text-xl font-bold mb-3">Edit Slice</h2>

          {!selectedSlice ? (
            <p className="text-gray-400 text-sm mb-4">Select a slice to begin editing.</p>
          ) : null}

          <input
            className="bg-gray-700 text-white p-2 rounded mb-2 w-full"
            placeholder="Label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            disabled={!selectedSlice}
          />

          <input
            className="bg-gray-700 text-white p-2 rounded mb-2 w-full"
            placeholder="Start (mm:ss)"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            disabled={!selectedSlice}
          />

          <input
            className="bg-gray-700 text-white p-2 rounded mb-2 w-full"
            placeholder="End (mm:ss)"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            disabled={!selectedSlice}
          />

          <div className="mb-3">
            <HexColorPicker
              color={color}
              onChange={setColor}
            />
          </div>

          <button
            className="bg-green-600 hover:bg-green-700 px-4 py-2 mb-2 rounded w-full disabled:opacity-50"
            onClick={handleSave}
            disabled={!selectedSlice}
          >
            Save Changes
          </button>
          <button
            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded w-full disabled:opacity-50"
            onClick={() => setSelectedSlice(null)}
            disabled={!selectedSlice}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
