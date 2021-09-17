/* eslint-disable security/detect-object-injection */
import { Container } from "pixi.js";
import { Instance } from "../../types";
import * as components from "../components";
import { applyDefaultProps } from "./props";

export const appendChild = (parent: Instance, child: Instance): void => {
  parent.addChild?.(child);
  child.didMount?.call(child, child, parent);
};

export const removeChild = (parent: Instance, child: Instance) => {
  child.willUnmount?.call(child, child, parent);
  // unmount potential children
  if (child?.config?.destroyChildren !== false && child.children?.length) {
    [...child.children].forEach((c) => {
      removeChild(child, c as Instance);
    });
  }
  parent.removeChild(child);
  if (child?.config?.destroy !== false) {
    child.destroy();
  }
};

export const insertBefore = (parent: Instance, child: Instance, beforeChild: Instance): void => {
  const childExists = parent.children.indexOf(child) !== -1;
  const index = parent.getChildIndex(beforeChild);
  if (childExists) {
    parent.setChildIndex(child, index);
  } else {
    parent.addChildAt(child, index);
  }
};

export const createElement = (type: string, props = {}): Instance => {
  const instance: Instance = components[type]?.(props) ?? new Container();
  (instance.applyProps ?? applyDefaultProps)(instance, {}, props);
  return instance;
};
