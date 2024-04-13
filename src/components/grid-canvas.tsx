import { useState } from "react";
import GridColumn from "./grid-columns";
import { Matrix, MatrixMetadata, RGB } from "./tools";

interface GridCanvasProps {
  rows: number;
  cols: number;
  currentRGB: RGB;
  gridData: MatrixMetadata;
  useBig?: boolean;
  setGridData: (index: number, matrix: Matrix) => void;
}

export default function GridCanvas({
  rows,
  cols,
  gridData,
  currentRGB,
  useBig,
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
          rows={rows}
          useBig={useBig ?? false}
          setGridData={setGridData}
          key={`grid-column-${i}-keyframe-${gridData.keyframe}`}
        />
      ))}
    </div>
  );
}
