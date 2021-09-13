/* eslint-disable security/detect-object-injection */
import { Props, UpdatePayload } from "../../types";
import { hasOwnProperty } from "./hasOwnProperty";
import { isNil } from "./isNil";

export const diffProperties = (
  prevProps: Props = {},
  nextProps: Props = {}
): UpdatePayload | null => {
  let updatePayload: UpdatePayload | null = null;

  Object.keys(prevProps).forEach((propKey) => {
    if (hasOwnProperty(nextProps, propKey) || isNil(prevProps[propKey]) || propKey === "children") {
      return;
    }
    if (!updatePayload) {
      updatePayload = [];
    }
    updatePayload.push(propKey, null);
  });

  Object.keys(nextProps).forEach((propKey) => {
    const nextProp = nextProps[propKey];
    const prevProp = prevProps[propKey];
    if (nextProp === prevProp || (isNil(nextProp) && isNil(prevProp)) || propKey === "children") {
      return;
    }
    if (!updatePayload) {
      updatePayload = [];
    }
    updatePayload.push(propKey, nextProp);
  });

  return updatePayload;
};
