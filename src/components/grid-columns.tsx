import { useState } from "react";
import { MatrixMetadata, RGB } from "./tools";
import { cn } from "./utils";

interface GridColumnProps {
  columnIndex: number;
  rows: number;
  gridData: MatrixMetadata;
  currentRGB: RGB;
  useBig: boolean;
  setGridData: (keyframe: number, matrix: MatrixMetadata["matrix"]) => void;
}

export default function GridColumn({
  columnIndex,
  currentRGB,
  useBig,
  rows,
  gridData,
  setGridData,
}: GridColumnProps) {
  const [arrMap] = useState(() => Array.from({ length: rows }));

  return (
    <div>
      {arrMap.map((_, i) => {
        const { r, g, b } = gridData.matrix[columnIndex][i][1] ?? {
          r: 0,
          g: 0,
          b: 0,
        };
        return (
          <div
            key={`grid-column_-${i}-keyframe-${gridData.keyframe}`}
            onClick={() => {
              if (!useBig) return;
              console.log(gridData);
              const matrix = [...gridData.matrix];
              matrix[columnIndex][i][0] = !matrix[columnIndex][i];
              matrix[columnIndex][i][1] = currentRGB;

              setGridData(gridData.keyframe, matrix);
            }}
            style={{
              backgroundColor: `rgb(${r}, ${g}, ${b})` ?? "black",
            }}
            className={cn(
              "w-[10px] h-[10px] bg-button-dark border border-solid-1 border-input-hover",
              useBig ? "w-[30px] h-[30px]" : ""
            )}
          ></div>
        );
      })}
    </div>
  );
}
