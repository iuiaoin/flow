import * as React from "react";
import { Application } from "pixi.js";

export const useFitParent = (app: Application, initPosition?: () => void) => {
  React.useEffect(() => {
    resize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resize = React.useCallback(() => {
    const parent = app.view.parentNode as HTMLElement;
    app.renderer.resize(parent.clientWidth, parent.clientHeight);
    initPosition?.();
  }, [app.renderer, app.view, initPosition]);

  window.addEventListener("resize", resize);
};
