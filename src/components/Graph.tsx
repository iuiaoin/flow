import * as React from "react";
import { Application, Graphics } from "pixi.js";
import { IGraphProps } from "../types";

export const Graph: React.FunctionComponent<IGraphProps> = (props) => {
  const { nodes, backgroundColor } = props;
  const app = new Application({ backgroundColor });
  const ref = React.useRef<HTMLDivElement>(null);

  nodes.forEach((node) => {
    const rect = new Graphics();
    rect.lineStyle(4, 0xff3300, 1);
    rect.drawRect(20, 20, 64, 37);
    rect.endFill();
    app.stage.addChild(rect);
  });

  React.useEffect(() => {
    ref.current?.appendChild(app.view);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={ref}></div>;
};
