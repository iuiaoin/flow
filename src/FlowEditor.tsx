import { Application, Sprite } from "pixi.js";
import React from "react";
import { useFitParent } from "./hooks/useFitParent";

interface IFlowEditorProps {}

export const FlowEditor: React.FunctionComponent<IFlowEditorProps> = (
  props
) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const app = new Application({ backgroundColor: 0xf4f4f4 });
  const bunny = Sprite.from("asserts/images/icon.png");
  bunny.anchor.set(0.5);

  const initPosition = React.useCallback(() => {
    bunny.position.set(app.screen.width / 2, app.screen.height / 2);
  }, [app.screen, bunny]);

  app.stage.addChild(bunny);

  // Listen for animate update
  app.ticker.add((delta: number) => {
    bunny.rotation += 0.1 * delta;
  });
  React.useEffect(() => {
    ref.current?.appendChild(app.view);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFitParent(app, initPosition);

  return <div ref={ref} />;
};
