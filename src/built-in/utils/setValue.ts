/* eslint-disable security/detect-object-injection */
import { Instance } from "../../types";
import { isPointType } from "./isPointType";
import { parsePoint } from "./parsePoint";

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
