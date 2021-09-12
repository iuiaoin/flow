import { Instance } from "../../types";

export const insertBefore = (parent: Instance, child: Instance, beforeChild: Instance): void => {
  const childExists = parent.children.indexOf(child) !== -1;
  const index = parent.getChildIndex(beforeChild);
  if (childExists) {
    parent.setChildIndex(child, index);
  } else {
    parent.addChildAt(child, index);
  }
};
