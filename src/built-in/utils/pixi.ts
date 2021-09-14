/* eslint-disable security/detect-object-injection */
import { Point, ObservablePoint, IPointData } from "pixi.js";
import { Instance } from "../../types";
import { PIXI_REQUEST_RENDER } from "../constants";
import { isNil } from "./common";

export const isPointType = <T>(value: T): boolean => {
  return value instanceof Point || value instanceof ObservablePoint;
};

export const parsePoint = <T>(value: T): number[] => {
  let arr: Array<string | number> = [];

  if (typeof value === "undefined") {
    return arr as number[];
  } else if (typeof value === "string") {
    arr = value.split(",");
  } else if (typeof value === "number") {
    arr = [value];
  } else if (Array.isArray(value)) {
    arr = [...value];
  } else if (value !== null && typeof value === "object") {
    const x = ((value as unknown) as IPointData).x || 0;
    const y = ((value as unknown) as IPointData).y || 0;
    arr = [x, y];
  } else {
    return arr as number[];
  }

  return arr.filter((p) => !isNil(p) && !isNaN(Number(p))).map(Number);
};

export const setValue = <T>(instance: Instance, propKey: string, value: T) => {
  if (isPointType(instance[propKey]) && isPointType(value)) {
    // copy value
    instance[propKey].copyFrom(value);
  } else if (isPointType(instance[propKey])) {
    // parse value if a non-Point type is being assigned to a Point type
    const coordinates = parsePoint(value);
    instance[propKey].set(coordinates.shift(), coordinates.shift());
  } else {
    // just hard assign value
    instance[propKey] = value;
  }
};

export const dispatchRender = <T>(detail?: T): void => {
  window.dispatchEvent(new CustomEvent(PIXI_REQUEST_RENDER, { detail }));
};
