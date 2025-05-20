// File: src/components/ExportPanel.tsx

import React from "react";
import Papa from "papaparse"; // ✅ simple and safe
import domtoimage from "dom-to-image";
import type { Slice } from "../types/segmentTypes";
import { timeToSeconds } from "../utils/timeHelpers";

type Props = {
  onImport: (slices: Omit<Slice, "id">[]) => void;
};

export const ExportPanel: React.FC<Props> = ({ onImport }) => {
  const handleExport = () => {
    const node = document.getElementById("clock-container");
    if (!node) return;

    domtoimage.toPng(node).then((dataUrl: string) => {
      const link = document.createElement("a");
      link.download = "clock.png";
      link.href = dataUrl;
      link.click();
    });
  };

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: (results: any) => {
        const importedSlices = results.data
          .filter(
            (row: any) => row.label && row.start && row.end
          )
          .map((row: any) => {
            const startSeconds = timeToSeconds(row.start);
            const endSeconds = timeToSeconds(row.end);
            const duration = (endSeconds - startSeconds + 3600) % 3600;

            return {
              label: row.label,
              startSeconds,
              duration,
              color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            };
          });

        onImport(importedSlices);
      },
    });
  };

  return (
    <div className="flex gap-2">
      <input type="file" accept=".csv" onChange={handleCSVUpload} />
      <button
        onClick={handleExport}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        📸 Export Clock as PNG
      </button>
    </div>
  );
};
