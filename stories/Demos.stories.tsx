import * as React from "react";
import { Graph } from "../src/components/Graph";
import { TestComponent } from "./components/TestComponent";
import "./styles/base.m.scss";
import { Wrapper } from "./components/Wrapper";

export default {
  title: "Demos/flow",
};

export const Test = () => {
  return (
    <Wrapper>
      <TestComponent />
    </Wrapper>
  );
};

export const Basic = () => {
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
