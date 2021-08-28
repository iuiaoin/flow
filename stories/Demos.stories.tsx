import * as React from "react";
import { FlowEditor } from "../src/components/FlowEditor";
import { Graph } from "../src/components/Graph";

// eslint-disable-next-line import/no-default-export
export default {
  title: "Demos/flow",
};

export const Basic = () => {
  return <FlowEditor />;
};

export const Test = () => {
  return (
    <Graph
      backgroundColor={0xf4f4f4}
      nodes={[{ id: "0", x: 23, y: 67 }]}
      edges={[
        { id: "0", source: "0", target: "1", sourcePort: "0", targetPort: "1" },
      ]}
    />
  );
};
