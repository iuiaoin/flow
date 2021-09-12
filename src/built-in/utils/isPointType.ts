import { Point, ObservablePoint } from "pixi.js";

export const isPointType = <T>(value: T): boolean => {
  return value instanceof Point || value instanceof ObservablePoint;
};
