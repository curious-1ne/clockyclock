import React, { useState, useEffect } from "react";
import { useSlices } from "./hooks/useSlices";
import { ClockChart } from "./components/ClockChart";
import { SliceList } from "./components/SliceList";
import { ExportPanel } from "./components/ExportPanel";
import { SaveClockModal } from "./components/SaveClockModal";
import { SavedClocksList } from "./components/SavedClocksList";
import { useClockStore } from "./store/clockStore";
import type { Slice, UISlice } from "./types/sliceTypes";
import { SliceEditor } from "./components/SliceEditor";

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
  const [showSaveModal, setShowSaveModal] = useState(false);
  const currentClock = useClockStore((state) => state.currentClock);

  useEffect(() => {
    if (currentClock) {
      setSlices(currentClock.slices);
    }
  }, [currentClock, setSlices]);

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

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            {currentClock ? (
              <>
                {currentClock.name} - Episode {currentClock.episodeNumber}
              </>
            ) : (
              "Broadcast Clock Planner"
            )}
          </h1>
          <button
            onClick={() => setShowSaveModal(true)}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          >
            Save Clock
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ClockChart
              slices={getUISlices()}
              onSelectSlice={(s) => {
                const editable = convertToEditable(s);
                if (editable) setSelectedSlice(editable);
              }}
            />
          </div>

          <div className="space-y-6">
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
                    id: crypto.randomUUID(),
                  }))
                )
              }
            />

            <SavedClocksList />
          </div>
        </div>

        {selectedSlice && (
          <SliceEditor
            slice={selectedSlice}
            onSave={updateSlice}
            onClose={() => setSelectedSlice(null)}
          />
        )}

        {showSaveModal && (
          <SaveClockModal
            slices={slices}
            onClose={() => setShowSaveModal(false)}
          />
        )}
      </div>
    </div>
  );
}