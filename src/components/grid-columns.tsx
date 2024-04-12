import { useState } from "react";
import { Matrix, MatrixMetadata } from "./animation-grid";

interface GridColumnProps {
  columnIndex: number;
  rows: number;
  duration: number;
  gridData: MatrixMetadata;
  setGridData: (index: number, matrix: Matrix) => void;
  updateDuration: (index: number, duration: number) => void;
}

export default function GridColumn({
  columnIndex,
  rows,
  duration,
  gridData,
  setGridData,
  updateDuration,
}: GridColumnProps) {
  const [arrMap] = useState(() => Array.from({ length: rows }));

  return (
    <div>
      {arrMap.map((_, i) => {
        return (
          <div
            key={`grid-column_-${i}-keyframe-${gridData.keyframe}`}
            onClick={() => {
              const matrix = [...gridData.matrix];
              matrix[columnIndex][i] = !matrix[columnIndex][i];

              setGridData(gridData.keyframe, matrix);
            }}
            style={{
              backgroundColor: gridData.matrix[columnIndex][i]
                ? "rgba(255, 255, 255, 1)"
                : "rgba(255, 255, 255, 0)",
            }}
            className="w-4 h-4 bg-button-dark border border-solid-1 border-input-hover cursor-pointer"
          ></div>
        );
      })}
    </div>
  );
}
