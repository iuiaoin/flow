import { Graphics as PixiGraphics } from "pixi.js";
import { Instance, Props, GraphicsInstance, TProps, IGraphicsProps } from "../types";
import { applyDefaultProps } from "./utils/props";

export const Graphics = (): GraphicsInstance => {
  const g: GraphicsInstance = new PixiGraphics();
  g.applyProps = (
    instance: Instance,
    prevProps: TProps<IGraphicsProps>,
    nextProps: TProps<IGraphicsProps>
  ) => {
    const { draw, ...props } = nextProps;
    let changed = applyDefaultProps(instance, prevProps, props as Props);

    if (prevProps.draw !== draw) {
      changed = true;
      draw.call(g, g);
    }

    return changed;
  };

  return g;
};
