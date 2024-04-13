import GridCanvas from "./grid-canvas";
import { Button } from "./button";
import { Plus, Trash2, Upload } from "lucide-react";
import { MatrixMetadata, RGB, getDefaultMatrix } from "./tools";

interface AnimationGridProps {
  gridInView: number;
  setGridInView: React.Dispatch<React.SetStateAction<number>>;
  rgbMap: RGB;
  setRgbMap: React.Dispatch<React.SetStateAction<RGB>>;
  gridData: MatrixMetadata[];
  setGridData: React.Dispatch<React.SetStateAction<MatrixMetadata[]>>;
}

export default function AnimationGrid({
  gridInView,
  setGridInView,
  rgbMap,
  setRgbMap,
  gridData,
  setGridData,
}: AnimationGridProps) {
  return (
    <div className="fixed w-full bottom-0">
      <div className="flex w-fit gap-10 items-center mb-2 px-6 bg-zinc-800 py-2 bottom-0 mx-auto rounded-xl border-solid border-2 border-accent">
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
              setGridInView(gridData.length);
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
          <Button
            variant="accent"
            onClick={() => {
              const newGridData = [...gridData].filter(
                (data) => data.keyframe !== gridInView
              );
              setGridData(newGridData);
              setGridInView(0);
            }}
            icon={<Trash2 size={20} />}
          >
            Delete
          </Button>
        </div>
      </div>
      <div className="w-full h-fit overflow-y-hidden overflow-x-scroll  p-4">
        <div className="flex gap-4 mb-4">
          {gridData.map((data, i) => (
            <div className="flex flex-col gap-2" key={`grid-view-div-${i}`}>
              <div className="flex justify-center">
                <p>{data.keyframe + 1}</p>
              </div>

              <div
                key={`grid-view-${i}`}
                className="cursor-pointer"
                onClick={() => setGridInView(i)}
              >
                {/* @ts-ignore */}
                <GridCanvas
                  currentRGB={rgbMap}
                  gridData={gridData[i]}
                  key={`grid-canvas-${i}-keyframe-${data.keyframe}`}
                  rows={16}
                  cols={16}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
