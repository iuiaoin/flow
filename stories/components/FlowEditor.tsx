import { Application, Sprite } from "pixi.js";
import React from "react";

export const FlowEditor: React.FunctionComponent = () => {
  const ref = React.useRef<HTMLCanvasElement>(null);
  const app = React.useRef<Application>();
  const bunny = Sprite.from(
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
  );
  bunny.anchor.set(0.5);

  const initPosition = () => {
    bunny.position.set(
      (app.current?.screen.width ?? 800) / 2,
      (app.current?.screen.height ?? 600) / 2
    );
  };

  const resize = () => {
    const parent = app.current?.view.parentNode as HTMLElement;
    app.current?.renderer.resize(parent.clientWidth, parent.clientHeight);
    initPosition();
  };

  React.useEffect(() => {
    app.current = new Application({
      backgroundColor: 0xf4f4f4,
      view: ref.current as HTMLCanvasElement,
    });
    app.current.stage.addChild(bunny);
    app.current.ticker.add((delta: number) => {
      bunny.rotation += 0.1 * delta;
    });
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} />;
};
