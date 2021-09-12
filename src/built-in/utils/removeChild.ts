import { Instance } from "../../types";

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
