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

  // Compute accurate startAngle and endAngle based on slice startSeconds
  const getAngle = (seconds: number) => 90 - (seconds / 3600) * 360;

  const pieData = slices.map((slice) => ({
    ...slice,
    startAngle: getAngle(slice.startSeconds),
    endAngle: getAngle((slice.startSeconds + slice.duration) % 3600),
  }));

  return (
    <div className="flex flex-col items-center gap-8">
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
        <PieChart width={CHART_SIZE} height={CHART_SIZE}>
          {pieData.map((slice, index) => (
            <Pie
              key={slice.id}
              data={[slice]}
              cx={CHART_SIZE / 2}
              cy={CHART_SIZE / 2}
              innerRadius={30}
              outerRadius={CLOCK_RADIUS}
              startAngle={slice.startAngle}
              endAngle={slice.endAngle}
              dataKey="duration"
              isAnimationActive={false}
              stroke="#fff"
              strokeWidth={2}
              onClick={() => onSelectSlice(slice)}
              label={({ cx, cy, midAngle }) => {
                const RADIAN = Math.PI / 180;
                const radius = 100;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                return (
                  <text
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={18}
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
              <Cell fill={slice.color} />
            </Pie>
          ))}

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

      {/* Legend Table */}
      <div className="w-full max-w-md bg-gray-900 rounded-lg p-4 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center text-white border-b border-gray-700 pb-2">
          Segments
        </h2>
        <div className="space-y-2">
          {slices.map((slice, index) => (
            <div
              key={slice.id}
              className="flex items-center justify-between bg-gray-800 p-3 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors duration-200"
              onClick={() => onSelectSlice(slice)}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-full border-2 border-white"
                  style={{ backgroundColor: slice.color }}
                />
                <span className="text-lg text-white font-medium">
                  {index + 1}. {slice.label}
                </span>
              </div>
              <span className="text-sm text-gray-300 font-mono">
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
