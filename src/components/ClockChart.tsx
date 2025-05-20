<div
  id="clock-container"
  className="relative"
  style={{
    width: `${CHART_SIZE}px`,
    height: `${CHART_SIZE}px`,
    backgroundColor: "#000",
    backgroundImage: `url("/clock-face.svg")`,
    backgroundSize: "contain",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    borderRadius: "12px",
    overflow: "hidden",
  }}
>
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: CHART_SIZE,
      height: CHART_SIZE,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <PieChart width={CHART_SIZE} height={CHART_SIZE}>
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
              fontSize={24}
              fontWeight="bold"
              fill="#fff"
              stroke="#000"
              strokeWidth={3}
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
