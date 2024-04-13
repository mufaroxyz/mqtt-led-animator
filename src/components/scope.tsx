import { useState } from "react";
import Tools from "./tools";

export default function Scope() {
  const [keyframeInView, setKeyframeInView] = useState(0);

  return (
    <div>
      <Tools
        currentlyInView={keyframeInView}
        setCurrentlyInView={setKeyframeInView}
      />
    </div>
  );
}
