import { useEffect, useState } from "react";
import GridCanvas from "./grid-canvas";
import { Button } from "./button";
import { Plus, Trash2, Upload } from "lucide-react";

export type Matrix = boolean[][];

export type MatrixMetadata = {
  keyframe: number;
  duration: number;
  matrix: Matrix;
};

type RGB = {
  r: number;
  g: number;
  b: number;
};

const getDefaultMatrix = () => {
  return Array.from({ length: 16 }, () =>
    Array.from({ length: 16 }, () => false)
  );
};

export default function AnimationGrid() {
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

  const updateDuration = (index: number, duration: number) => {
    setGridData((prev) =>
      prev.map((data) =>
        data.keyframe === index ? { ...data, duration } : data
      )
    );
  };

  return (
    <>
      <div className="w-full h-[800px] overflow-y-scroll overflow-x-hidden  p-4">
        <div className="grid grid-flow-row grid-cols-7 gap-4 mb-4">
          {gridData.map((data, i) => (
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <Button
                  variant="accent"
                  className="h-10"
                  onClick={() => {
                    const newGridData = [...gridData];
                    newGridData.splice(i, 1);
                    setGridData(newGridData);
                  }}
                  disabled={i === 0}
                >
                  <Trash2 />
                </Button>
                <div className="rounded-md flex justify-between w-20 border-2 border-solid-1 border-input-hover focus:border-input-border p-2 bg-input focus:outline-none transition-all duration-100 ease-in-out">
                  <input
                    className="w-10 text-right bg-transparent focus:outline-none"
                    value={data.duration}
                    onChange={(e) => {
                      if (isNaN(+e.target.value)) return e.preventDefault();
                      if (+e.target.value < 0 && +e.target.value > 10)
                        return e.preventDefault();

                      updateDuration(data.keyframe, +e.target.value);
                    }}
                  />
                  <div>
                    <span className="font-bold text-accent opacity-60">s</span>
                  </div>
                </div>
              </div>

              <div key={`grid-view-${i}`}>
                <GridCanvas
                  gridData={gridData[i]}
                  setGridData={updateGrid}
                  updateDuration={updateDuration}
                  key={`grid-canvas-${i}-keyframe-${data.keyframe}`}
                  duration={data.duration}
                  rows={16}
                  cols={16}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-10 items-center mb-2 px-6 bg-zinc-800 py-2 fixed bottom-0 left-[50%] -translate-x-[50%] rounded-xl border-solid border-2 border-accent">
        <div className="flex items-center gap-4">
          <div className="flex gap-4">
            <div className="flex gap-2 items-center">
              <p className="font-bold text-red-300">R</p>
              <input
                type="text"
                value={rgbMap.r}
                onChange={(e) => {
                  if (isNaN(+e.target.value)) return e.preventDefault();
                  if (+e.target.value < 0 && +e.target.value > 255)
                    return e.preventDefault();

                  setRgbMap({ ...rgbMap, r: +e.target.value });
                }}
                className="rounded-md flex justify-between w-20 border-2 border-solid-1 border-input-hover focus:border-input-border p-2 bg-input focus:outline-none transition-all duration-100 ease-in-out"
              />
            </div>
            <div className="flex gap-2 items-center">
              <p className="font-bold text-green-300">G</p>
              <input
                type="text"
                value={rgbMap.g}
                onChange={(e) => {
                  if (isNaN(+e.target.value)) return e.preventDefault();
                  if (+e.target.value < 0 && +e.target.value > 255)
                    return e.preventDefault();

                  setRgbMap({ ...rgbMap, g: +e.target.value });
                }}
                className="rounded-md flex justify-between w-20 border-2 border-solid-1 border-input-hover focus:border-input-border p-2 bg-input focus:outline-none transition-all duration-100 ease-in-out"
              />
            </div>

            <div className="flex gap-2 items-center">
              <p className="font-bold text-blue-300">B</p>
              <input
                type="text"
                value={rgbMap.b}
                onChange={(e) => {
                  if (isNaN(+e.target.value)) return e.preventDefault();
                  if (+e.target.value < 0 && +e.target.value > 255)
                    return e.preventDefault();

                  setRgbMap({ ...rgbMap, b: +e.target.value });
                }}
                className="rounded-md flex justify-between w-20 border-2 border-solid-1 border-input-hover focus:border-input-border p-2 bg-input focus:outline-none transition-all duration-100 ease-in-out"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center pr-4 gap-2">
          <Button
            variant="filled"
            onClick={() => {
              setGridData([
                ...gridData,
                {
                  keyframe: gridData[gridData.length - 1].keyframe + 1,
                  duration: 1,
                  matrix: getDefaultMatrix(),
                },
              ]);
            }}
            icon={<Plus size={20} />}
          >
            Add Keyframe
          </Button>
          <Button
            variant="filled"
            onClick={() => {}}
            icon={<Upload size={20} />}
          >
            Upload
          </Button>
        </div>
      </div>
    </>
  );
}
