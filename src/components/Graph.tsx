import * as React from "react";
import { Application, Graphics } from "pixi.js";
import { IGraphProps } from "../types";

export const Graph: React.FunctionComponent<IGraphProps> = (props) => {
  const { nodes, backgroundColor } = props;
  const app = new Application({ backgroundColor, antialias: true });
  const ref = React.useRef<HTMLDivElement>(null);

  nodes.forEach((node) => {
    const rect = new Graphics();
    rect.lineStyle(1, 0x8a8886, 1);
    rect.drawRoundedRect(0.5, 0.5, 262, 52, 4);
    rect.endFill();
    app.stage.addChild(rect);
  });

  React.useEffect(() => {
    ref.current?.appendChild(app.view);
  }, []);

  return <div ref={ref}></div>;
};
