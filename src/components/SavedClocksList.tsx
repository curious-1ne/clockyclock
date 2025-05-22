import React from 'react';
import { useClockStore } from '../store/clockStore';

export const SavedClocksList: React.FC = () => {
  const { savedClocks, loadClock, deleteClock } = useClockStore();

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Saved Clocks</h2>
      
      <div className="space-y-2">
        {savedClocks.length === 0 ? (
          <p className="text-gray-400">No saved clocks yet</p>
        ) : (
          savedClocks.map((clock) => (
            <div
              key={clock.id}
              className="flex items-center justify-between bg-gray-700 p-3 rounded hover:bg-gray-600"
            >
              <div>
                <h3 className="font-medium">{clock.name}</h3>
                <p className="text-sm text-gray-400">
                  Episode {clock.episodeNumber} • {new Date(clock.date).toLocaleDateString()}
                </p>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => loadClock(clock.id)}
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                >
                  Load
                </button>
                <button
                  onClick={() => deleteClock(clock.id)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};