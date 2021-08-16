import * as PIXI from "pixi.js";
import React from "react";

export const Example: React.FunctionComponent = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const app = new PIXI.Application({ backgroundColor: 0x1099bb });
  const bunny = PIXI.Sprite.from("asserts/images/icon.png");
  bunny.anchor.set(0.5);

  // move the sprite to the center of the screen
  bunny.x = app.screen.width / 2;
  bunny.y = app.screen.height / 2;

  app.stage.addChild(bunny);

  // Listen for animate update
  app.ticker.add((delta) => {
    // just for fun, let's rotate mr rabbit a little
    // delta is 1 if running at 100% performance
    // creates frame-independent transformation
    bunny.rotation += 0.1 * delta;
  });
  React.useEffect(() => {
    ref.current?.appendChild(app.view);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div ref={ref} />;
};
