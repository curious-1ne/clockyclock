import React, { useState } from 'react';
import type { Slice } from '../types/sliceTypes';
import { useClockStore } from '../store/clockStore';

type Props = {
  slices: Slice[];
  onClose: () => void;
};

export const SaveClockModal: React.FC<Props> = ({ slices, onClose }) => {
  const [name, setName] = useState('');
  const [episodeNumber, setEpisodeNumber] = useState('');
  const addClock = useClockStore((state) => state.addClock);

  const handleSave = () => {
    if (!name || !episodeNumber) return;
    addClock(name, episodeNumber, slices);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Save Clock Configuration</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Show Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-700 rounded p-2"
              placeholder="Enter show name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Episode Number</label>
            <input
              type="text"
              value={episodeNumber}
              onChange={(e) => setEpisodeNumber(e.target.value)}
              className="w-full bg-gray-700 rounded p-2"
              placeholder="Enter episode number"
            />
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded flex-1"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded flex-1"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};