/* eslint-disable security/detect-object-injection */
import { Instance, Props, UpdatePayload } from "../../types";
import { Events, PROPS_DISPLAY_OBJECT, PROPS_RESERVED } from "../constants";
import { setValue } from "./pixi";
import { hasOwnProperty, isNil } from "./common";

export const applyDefaultProps = (
  instance: Instance,
  prevProps: Props = {},
  nextProps: Props = {}
): boolean => {
  let changed = false;
  const events = Object.values(Events);
  const nextPropKeys = Object.keys(nextProps);

  if (!nextProps.ignoreEvents) {
    for (const e of events) {
      if (prevProps[e] !== nextProps[e]) {
        changed = true;
        if (typeof prevProps[e] === "function") {
          instance.removeListener(e, prevProps[e] as typeof Function);
        }
        if (typeof nextProps[e] === "function") {
          instance.on(e, nextProps[e] as typeof Function);
        }
      }
    }
  }

  if (nextProps.overwriteProps) {
    nextPropKeys.forEach((p) => {
      if (prevProps[p] !== nextProps[p]) {
        changed = true;
        setValue(instance, p, nextProps[p]);
      }
    });
    return changed;
  }

  const propKeys = nextPropKeys.filter(
    (p) => ![...Object.keys(PROPS_RESERVED), ...events].includes(p)
  );

  for (const p of propKeys) {
    const value = nextProps[p];
    if (nextProps[p] !== prevProps[p]) {
      changed = true;
    }
    if (value !== undefined) {
      setValue(instance, p, value);
    } else if (p in PROPS_DISPLAY_OBJECT) {
      changed = true;
      setValue(instance, p, PROPS_DISPLAY_OBJECT[p]);
    }
  }

  return changed;
};

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
