import { useState } from "react";
import { Matrix, MatrixMetadata, RGB } from "./animation-grid";

interface GridColumnProps {
  columnIndex: number;
  rows: number;
  duration: number;
  gridData: MatrixMetadata;
  currentRGB: RGB;
  setGridData: (index: number, matrix: Matrix) => void;
}

export default function GridColumn({
  columnIndex,
  currentRGB,
  rows,
  gridData,
  setGridData,
}: GridColumnProps) {
  const [arrMap] = useState(() => Array.from({ length: rows }));

  return (
    <div>
      {arrMap.map((_, i) => {
        const { r, g, b } = gridData.matrix[columnIndex][i][1];
        return (
          <div
            key={`grid-column_-${i}-keyframe-${gridData.keyframe}`}
            onClick={() => {
              const matrix = [...gridData.matrix];
              matrix[columnIndex][i][0] = !matrix[columnIndex][i];
              matrix[columnIndex][i][1] = currentRGB;

              setGridData(gridData.keyframe, matrix);
            }}
            style={{
              backgroundColor: `rgb(${r}, ${g}, ${b})` ?? "black",
            }}
            className="w-4 h-4 bg-button-dark border border-solid-1 border-input-hover cursor-pointer"
          ></div>
        );
      })}
    </div>
  );
}
