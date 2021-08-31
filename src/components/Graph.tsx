import * as React from "react";
import { Application } from "pixi.js";
import { IGraphProps } from "../types";
import { useAdapter } from "../hooks/useAdapter";

export const Graph: React.FunctionComponent<IGraphProps> = (props) => {
  const { backgroundColor } = props;
  const ref = React.useRef<HTMLCanvasElement>(null);
  const app = React.useRef<Application>();

  React.useEffect(() => {
    app.current = new Application({
      backgroundColor,
      view: ref.current as HTMLCanvasElement,
    });
  }, [backgroundColor]);

  useAdapter(app);

  return <canvas ref={ref} />;
};
