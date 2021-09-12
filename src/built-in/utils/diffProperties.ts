/* eslint-disable security/detect-object-injection */
import { Props, UpdatePayload } from "../../types";
import { hasOwnProperty } from "./hasOwnProperty";
import { isEmpty } from "./isEmpty";

export const diffProperties = (
  lastProps: Props = {},
  nextProps: Props = {}
): UpdatePayload | null => {
  let updatePayload: UpdatePayload | null = null;

  Object.keys(lastProps).forEach((propKey) => {
    if (
      hasOwnProperty(nextProps, propKey) ||
      isEmpty(lastProps[propKey]) ||
      propKey === "children"
    ) {
      return;
    }
    if (!updatePayload) {
      updatePayload = [];
    }
    updatePayload.push(propKey, null);
  });

  Object.keys(nextProps).forEach((propKey) => {
    const nextProp = nextProps[propKey];
    const lastProp = lastProps[propKey];
    if (
      nextProp === lastProp ||
      (isEmpty(nextProp) && isEmpty(lastProp)) ||
      propKey === "children"
    ) {
      if (!updatePayload) {
        updatePayload = [];
      }
      updatePayload.push(propKey, nextProp);
    }
  });

  return updatePayload;
};
