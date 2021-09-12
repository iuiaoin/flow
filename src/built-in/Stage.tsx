import { Application } from "pixi.js";
import * as React from "react";
import { IStageProps } from "../types";

export const Stage: React.FC<IStageProps> = (props) => {
  const { width = 800, height = 600, options } = props;
  const ref = React.useRef<HTMLCanvasElement>(null);
  const app = React.useRef<Application>();

  React.useEffect(() => {
    app.current = new Application({
      width,
      height,
      autoDensity: true,
      view: ref.current as HTMLCanvasElement,
      ...options
    });
  }, []);

  return <canvas ref={ref} />;
};
