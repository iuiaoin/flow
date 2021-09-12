import { Instance } from "../../types";

export const appendChild = (parent: Instance, child: Instance): void => {
  parent.addChild?.(child);
  child.didMount?.call(child, child, parent);
};
