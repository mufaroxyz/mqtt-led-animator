import { useState } from "react";
import GridColumn from "./grid-columns";
import { Matrix, MatrixMetadata, RGB } from "./animation-grid";

interface GridCanvasProps {
  rows: number;
  cols: number;
  duration: number;
  gridData: MatrixMetadata;
  currentRGB: RGB;
  setGridData: (index: number, matrix: Matrix) => void;
}

export default function GridCanvas({
  rows,
  cols,
  duration,
  gridData,
  currentRGB,
  setGridData,
}: GridCanvasProps) {
  const [arrMap] = useState(() => Array.from({ length: cols }));

  return (
    <div className="flex">
      {arrMap.map((_, i) => (
        <GridColumn
          currentRGB={currentRGB}
          columnIndex={i}
          gridData={gridData}
          duration={duration}
          setGridData={setGridData}
          rows={rows}
          key={`grid-column-${i}-keyframe-${gridData.keyframe}`}
        />
      ))}
    </div>
  );
}
