import * as React from "react";
import { IGraphProps } from "../types";
import { Stage } from "../built-in/Stage";

export const Graph: React.FC<IGraphProps> = (props) => {
  const { backgroundColor } = props;
  return <Stage options={{ backgroundColor }} />;
};
