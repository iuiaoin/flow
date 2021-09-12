import { IPointData } from "pixi.js";
import { isNil } from "./isNil";

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
