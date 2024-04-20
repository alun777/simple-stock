import { useMemo } from "react";
import { Box } from "@mui/material";

type RadarData = {
  value: number;
  label: string;
};

type RadarGraphProps = {
  radarData: RadarData[];
  size: number;
};

type Point = [number, number];

const svgY = (degrees: number) => degrees + 180;

const degToRadians = (degrees: number) => {
  return (degrees * Math.PI) / 180;
};

const calculateEdgePointFn =
  (center: number, radius: number) =>
  (degree: number, scale: number = 1): Point => {
    const degreeInRadians = degToRadians(degree);
    const degreeInRadiansY = degToRadians(svgY(degree));
    return [
      center + Math.cos(degreeInRadians) * radius * scale,
      center + Math.sin(degreeInRadiansY) * radius * scale,
    ];
  };

const RadarGraph = (props: RadarGraphProps) => {
  const viewBoxSize = props.size || 120;
  const viewBoxCenter = viewBoxSize * 0.5;
  const radius = viewBoxSize * 0.4;

  const calculateEdgePoint = useMemo(
    () => calculateEdgePointFn(viewBoxCenter, radius),
    [radius, viewBoxCenter]
  );

  return (
    <Box
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <svg
        height='100%'
        width='100%'
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      >
        <circle
          cx={viewBoxCenter}
          cy={viewBoxCenter}
          r={radius}
          stroke='black'
          strokeOpacity='0.2'
          strokeWidth='0.5'
          fill='#666666'
        />

        {[...Array(3)].map((_, i) => (
          <circle
            key={`circle_outline_${i}`}
            cx={viewBoxCenter}
            cy={viewBoxCenter}
            r={(i + 1) * radius * 0.25}
            stroke='black'
            strokeOpacity='0.2'
            strokeWidth='0.5'
            fill='transparent'
          />
        ))}

        {[...Array(3)].map((_, i) => (
          <line
            key={`crosshair_${i}`}
            x1={calculateEdgePoint(i * 60)[0]}
            y1={calculateEdgePoint(i * 60)[1]}
            x2={calculateEdgePoint(i * 60 + 180)[0]}
            y2={calculateEdgePoint(i * 60 + 180)[1]}
            stroke='black'
            strokeOpacity='0.2'
            strokeWidth='0.1'
            fill='transparent'
          />
        ))}

        <polygon
          stroke={"#FFA500"}
          strokeWidth={1.2}
          fill={"#FFA500"}
          fillOpacity={0.9}
          points={`${props.radarData.map((r, i) => {
            const edgePoint = calculateEdgePoint(i * 60, r.value / 100);
            return `${edgePoint[0]},${edgePoint[1]}`;
          })}`}
        />
      </svg>
    </Box>
  );
};

export default RadarGraph;
