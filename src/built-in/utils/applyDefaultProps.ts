/* eslint-disable security/detect-object-injection */
import { Instance, Props } from "../../types";
import { Events, PROPS_DISPLAY_OBJECT, PROPS_RESERVED } from "../constants";
import { setValue } from "./setValue";

export const applyDefaultProps = (
  instance: Instance,
  oldProps: Props = {},
  newProps: Props = {}
): boolean => {
  let changed = false;
  const events = Object.values(Events);
  const newPropsKeys = Object.keys(newProps);

  if (!newProps.ignoreEvents) {
    for (const e of events) {
      if (oldProps[e] !== newProps[e]) {
        changed = true;
        if (typeof oldProps[e] === "function") {
          instance.removeListener(e, oldProps[e] as typeof Function);
        }
        if (typeof newProps[e] === "function") {
          instance.on(e, newProps[e] as typeof Function);
        }
      }
    }
  }

  if (newProps.overwriteProps) {
    newPropsKeys.forEach((p) => {
      if (oldProps[p] !== newProps[p]) {
        changed = true;
        setValue(instance, p, newProps[p]);
      }
    });
    return changed;
  }

  const propKeys = newPropsKeys.filter(
    (p) => ![...Object.keys(PROPS_RESERVED), ...events].includes(p)
  );

  for (const p of propKeys) {
    const value = newProps[p];
    if (newProps[p] !== oldProps[p]) {
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
