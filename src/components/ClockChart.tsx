import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import type { UISlice } from "../types/sliceTypes";
import { secondsToTime } from "../utils/timeUtils";

type ClockChartProps = {
  slices: UISlice[];
  onSelectSlice: (slice: UISlice) => void;
};

export const ClockChart: React.FC<ClockChartProps> = ({
  slices,
  onSelectSlice,
}) => {
  const CHART_SIZE = 540;
  const CLOCK_RADIUS = 143;
  const INNER_LABEL_RADIUS = 40;

  return (
    <div className="flex flex-col items-center">
      {/* Clock Chart */}
      <div
        id="clock-container"
        className="relative"
        style={{
          width: `${CHART_SIZE}px`,
          height: `${CHART_SIZE}px`,
          backgroundColor: "#000",
          backgroundImage: `url("/clock-face.svg")`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <div style={{ transform: "scale(0.9)", transformOrigin: "center top" }}>
          <PieChart width={CHART_SIZE} height={CHART_SIZE}>
            <Pie
              data={slices}
              cx={CHART_SIZE / 2.01}
              cy={CHART_SIZE / 2.01}
              innerRadius={30}
              outerRadius={CLOCK_RADIUS}
              dataKey="duration"
              nameKey="label"
              startAngle={89}
              endAngle={-270}
              stroke="#fff"
              strokeWidth={2}
              isAnimationActive={false}
              onClick={(_, index) => {
                const selected = slices[index];
                if (selected) onSelectSlice(selected);
              }}
              label={({ cx, cy, midAngle, index }) => {
                const RADIAN = Math.PI / 180;
                const radius = 140;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                return (
                  <text
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={16}
                    fontWeight="bold"
                    fill="#fff"
                    stroke="#000"
                    strokeWidth={2}
                    paintOrder="stroke"
                  >
                    {index + 1}
                  </text>
                );
              }}
              labelLine={false}
            >
              {slices.map((s) => (
                <Cell key={s.id} fill={s.color} />
              ))}
            </Pie>

            <Tooltip
              formatter={(_, name, props) => {
                const { startSeconds, endSeconds } = props?.payload || {};
                return `${name}: ${secondsToTime(startSeconds)} → ${secondsToTime(endSeconds)}`;
              }}
              contentStyle={{
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                border: "1px solid #fff",
                borderRadius: "4px",
                padding: "8px",
              }}
            />
          </PieChart>
        </div>
      </div>

      {/* ✅ External legend */}
      <div className="mt-6 w-full max-w-md px-4">
        <h2 className="text-lg font-bold mb-2 text-center text-white">Segments</h2>
        <div className="space-y-2">
          {slices.map((slice, index) => (
            <div
              key={slice.id}
              className="flex items-center justify-between bg-gray-800 p-2 rounded hover:bg-gray-700 cursor-pointer"
              onClick={() => onSelectSlice(slice)}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: slice.color }}
                />
                <span className="text-sm text-white font-medium">
                  {index + 1}. {slice.label}
                </span>
              </div>
              <span className="text-sm text-gray-400">
                {secondsToTime(slice.startSeconds)} →{" "}
                {secondsToTime(slice.endSeconds)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
