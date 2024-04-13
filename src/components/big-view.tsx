import GridCanvas from "./grid-canvas";
import { Matrix, MatrixMetadata, RGB } from "./tools";

interface BigViewProps {
  gridInView: number;
  setGridInView: React.Dispatch<React.SetStateAction<number>>;
  rgbMap: RGB;
  setRgbMap: React.Dispatch<React.SetStateAction<RGB>>;
  gridData: MatrixMetadata;
  setGridData: (index: number, matrix: Matrix) => void;
}

export default function BigView({
  gridInView,
  rgbMap,
  gridData,
  setGridData,
}: BigViewProps) {
  return (
    <div className="w-full ">
      <div className="w-full h-full p-4">
        <div className="flex justify-center gap-4 mb-4">
          <div
            className="flex flex-col gap-2"
            key={`grid-view-div-${gridInView}-big-view`}
          >
            <GridCanvas
              currentRGB={rgbMap}
              gridData={gridData}
              key={`grid-canvas-${gridInView}-keyframe-${gridData.keyframe}`}
              rows={16}
              cols={16}
              setGridData={setGridData}
              useBig
            />
          </div>
        </div>
      </div>
    </div>
  );
}
