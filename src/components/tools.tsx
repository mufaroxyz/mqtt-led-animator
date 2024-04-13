import React, { useState } from "react";
import AnimationGrid from "./animation-grid";
import BigView from "./big-view";

interface ToolsProps {
  currentlyInView: number;
  setCurrentlyInView: React.Dispatch<React.SetStateAction<number>>;
}
type MatrixObject = [boolean, RGB];

export type Matrix = MatrixObject[][];

export type MatrixMetadata = {
  keyframe: number;
  duration: number;
  matrix: Matrix;
};

export type RGB = {
  r: number;
  g: number;
  b: number;
};

export const getDefaultMatrix = () => {
  return Array.from({ length: 16 }, () =>
    Array.from(
      { length: 16 },
      () => [false, { r: 0, g: 0, b: 0 }] as MatrixObject
    )
  );
};

export default function Tools({
  currentlyInView,
  setCurrentlyInView,
}: ToolsProps) {
  const [rgbMap, setRgbMap] = useState<RGB>({
    r: 255,
    g: 255,
    b: 255,
  });

  const [gridData, setGridData] = useState<MatrixMetadata[]>([
    {
      keyframe: 0,
      duration: 1,
      matrix: getDefaultMatrix(),
    },
  ]);

  const updateGrid = (index: number, matrix: Matrix) => {
    setGridData((prev) =>
      prev.map((data) => (data.keyframe === index ? { ...data, matrix } : data))
    );
  };

  return (
    <>
      {/* @ts-ignore */}
      <BigView
        rgbMap={rgbMap}
        gridData={gridData[currentlyInView]}
        key={`grid-canvas-${currentlyInView}-keyframe-${gridData[currentlyInView].keyframe}`}
        setGridData={updateGrid}
      />
      <AnimationGrid
        gridInView={currentlyInView}
        setGridInView={setCurrentlyInView}
        rgbMap={rgbMap}
        setRgbMap={setRgbMap}
        gridData={gridData}
        setGridData={setGridData}
      />
    </>
  );
}
