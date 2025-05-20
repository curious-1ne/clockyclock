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
  const CHART_SIZE = 540;
  const CLOCK_RADIUS = 123;
  const LABEL_OFFSET = 60;
  const INNER_LABEL_RADIUS = 55; // 🛠️ pushed numbers outward

  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="flex flex-col gap-2 mt-4 px-4">
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
      style={{
        width: `${CHART_SIZE}px`,
        height: `${CHART_SIZE + 80}px`,
        backgroundColor: "#000",
        backgroundImage: `url("/clock-face.svg")`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        borderRadius: "12px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <PieChart width={CHART_SIZE} height={CHART_SIZE}>
        {/* Outer Pie */}
        <Pie
          data={slices}
          cx="50%"
          cy="50%"
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
          label={({ cx, cy, midAngle, outerRadius, index }) => {
            const RADIAN = Math.PI / 180;
            const angle = -midAngle * RADIAN;
            const labelRadius = outerRadius + LABEL_OFFSET;
            const x = cx + labelRadius * Math.cos(angle);
            const y = cy + labelRadius * Math.sin(angle);
            const lineX = cx + (outerRadius + 5) * Math.cos(angle);
            const lineY = cy + (outerRadius + 5) * Math.sin(angle);
            const textAnchor = x > cx ? "start" : "end";

            return (
              <g>
                <line
                  x1={lineX}
                  y1={lineY}
                  x2={x}
                  y2={y}
                  stroke="#FFD700"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
                <circle cx={x} cy={y} r={3} fill="#FFD700" />
                <rect
                  x={textAnchor === "start" ? x - 2 : x - 110}
                  y={y - 14}
                  width={110}
                  height={28}
                  rx={6}
                  fill="black"
                  stroke="#fff"
                  strokeWidth={1}
                />
                <text
                  x={x}
                  y={y + 1}
                  textAnchor={textAnchor}
                  dominantBaseline="middle"
                  fontSize={12}
                  fontWeight={600}
                  fill="#fff"
                >
                  {index + 1}. {slices[index].label}
                </text>
              </g>
            );
          }}
          labelLine={false}
        >
          {slices.map((s) => (
            <Cell key={s.id} fill={s.color} />
          ))}
        </Pie>

        {/* 🛠 Inner circle numbers — fixed placement */}
        <Pie
          data={slices}
          cx="50%"
          cy="50%"
          innerRadius={INNER_LABEL_RADIUS}
          outerRadius={INNER_LABEL_RADIUS}
          dataKey="duration"
          startAngle={90}
          endAngle={-270}
          isAnimationActive={false}
          label={({ cx, cy, midAngle, index }) => {
            const RADIAN = Math.PI / 180;
            const angle = -midAngle * RADIAN;
            const x = cx + INNER_LABEL_RADIUS * Math.cos(angle);
            const y = cy + INNER_LABEL_RADIUS * Math.sin(angle);
            return (
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={13}
                fontWeight={700}
                fill="#fff"
              >
                {index + 1}
              </text>
            );
          }}
          labelLine={false}
        />

        <Tooltip
          formatter={(_, name, props) => {
            const { startSeconds, endSeconds } = props?.payload || {};
            return `${name}: ${secondsToTime(startSeconds)} → ${secondsToTime(endSeconds)}`;
          }}
          contentStyle={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            border: "1px solid #fff",
            borderRadius: "6px",
            padding: "8px",
          }}
        />

        <Legend
          content={renderLegend}
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{ paddingTop: "24px" }}
        />
      </PieChart>
    </div>
  );
};
