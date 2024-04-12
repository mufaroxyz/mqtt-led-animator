import { useState } from "react";
import GridColumn from "./grid-columns";
import { Matrix, MatrixMetadata } from "./animation-grid";

interface GridCanvasProps {
  rows: number;
  cols: number;
  duration: number;
  gridData: MatrixMetadata;
  setGridData: (index: number, matrix: Matrix) => void;
  updateDuration: (index: number, duration: number) => void;
}

export default function GridCanvas({
  rows,
  cols,
  duration,
  gridData,
  setGridData,
  updateDuration,
}: GridCanvasProps) {
  const [arrMap] = useState(() => Array.from({ length: cols }));

  return (
    <div className="flex">
      {arrMap.map((_, i) => (
        <GridColumn
          columnIndex={i}
          gridData={gridData}
          duration={duration}
          setGridData={setGridData}
          updateDuration={updateDuration}
          rows={rows}
          key={`grid-column-${i}-keyframe-${gridData.keyframe}`}
        />
      ))}
    </div>
  );
}
