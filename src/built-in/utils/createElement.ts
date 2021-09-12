import { Container } from "pixi.js";
import { Instance } from "../../types";

export const createElement = (type: string, props = {}): Instance => {
  return new Container();
};
