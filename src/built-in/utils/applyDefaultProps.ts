/* eslint-disable security/detect-object-injection */
import { Instance, Props } from "../../types";
import { Events } from "../constants";
import { setValue } from "./setValue";

export const applyDefaultProps = (
  instance: Instance,
  oldProps: Props = {},
  newProps: Props = {}
): void => {
  let changed = false;
  const events = Object.values(Events);
  const newPropsKeys = Object.keys(newProps);

  if (!newProps.ignoreEvents) {
    for (const e of events) {
      if (oldProps[e] !== newProps[e]) {
        changed = true;
        if (typeof oldProps[e] === "function") {
          instance.removeListener(e, oldProps[e]);
        }
        if (typeof newProps[e] === "function") {
          instance.on(e, newProps[e]);
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
    return;
  }

  const propKeys = newPropsKeys.filter();

  const props = newPropKeys.filter(filterProps);

  for (let i = 0; i < props.length; i++) {
    const prop = props[i];
    const value = newProps[prop];

    if (newProps[prop] !== oldProps[prop]) {
      changed = true;
    }

    if (value !== undefined) {
      // set value if defined
      setValue(instance, prop, value);
    } else if (prop in PROPS_DISPLAY_OBJECT) {
      // is a default value, use that
      console.warn(
        `setting default value: ${prop}, from: ${instance[prop]} to: ${value} for`,
        instance
      );
      changed = true;
      setValue(instance, prop, PROPS_DISPLAY_OBJECT[prop]);
    } else {
      console.warn(`ignoring prop: ${prop}, from ${instance[prop]} to ${value} for`, instance);
    }
  }

  return changed;
};
