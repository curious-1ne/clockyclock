import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
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
  const CHART_SIZE = 640;
  const CLOCK_RADIUS = 180; // Adjusted to match background
  const INNER_LABEL_RADIUS = 40;

  // Custom legend that's clickable
  const renderLegend = (props: any) => {
    const { payload } = props;
    
    return (
      <div className="flex flex-col gap-2 mt-4">
        {payload.map((entry: any, index: number) => (
          <div
            key={`legend-${index}`}
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-700 p-2 rounded"
            onClick={() => onSelectSlice(slices[index])}
          >
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      id="clock-container"
      className="relative"
      style={{
        width: `${CHART_SIZE}px`,
        height: `${CHART_SIZE + 120}px`,
        backgroundColor: "#000",
        backgroundImage: `url("/clock-face.svg")`,
        backgroundSize: "contain",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <div style={{ transform: "scale(0.9)", transformOrigin: "center top" }}>
        <PieChart width={CHART_SIZE} height={CHART_SIZE}>
          <Pie
            data={slices}
            cx={CHART_SIZE / 2}
            cy={CHART_SIZE / 2}
            innerRadius={30}
            outerRadius={CLOCK_RADIUS}
            dataKey="duration"
            nameKey="label"
            startAngle={90}
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
              const radius = 140; // Adjusted for better number placement
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
          
          <Legend
            content={renderLegend}
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{
              paddingTop: "20px",
            }}
          />
        </PieChart>
      </div>
    </div>
  );
};