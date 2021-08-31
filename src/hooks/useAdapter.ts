import { Application } from "pixi.js";
import * as React from "react";

export const useAdapter = (
  app: React.MutableRefObject<Application | undefined>
) => {
  const resize = React.useCallback(() => {
    const parent = app.current?.view.parentNode as HTMLElement | undefined;
    app.current?.renderer.resize(
      parent?.clientWidth ?? 800,
      parent?.clientHeight ?? 600
    );
  }, []);

  React.useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);
};
