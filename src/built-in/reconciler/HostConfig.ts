import { HostConfig as IHostConfig } from "react-reconciler";
import { Instance } from "../../types";
import { NO_CONTEXT } from "../constants";
import { createElement } from "../utils/element";

export const HostConfig: IHostConfig = {
  getRootHostContext(): Record<string, unknown> {
    return NO_CONTEXT;
  },

  getChildHostContext(): Record<string, unknown> {
    return NO_CONTEXT;
  },

  getPublicInstance(instance: Instance): Instance {
    return instance;
  },

  prepareForCommit(): null {
    return null;
  },

  resetAfterCommit(): void {
    // noop
  },

  createInstance: createElement,

  hideInstance(instance: Instance): void {
    instance.visible = false;
  },

  unhideInstance(
    instance: Instance,
    props: Record<string, unknown> | null | undefined
  ): void {
    const visible =
      props !== undefined &&
      props !== null &&
      Object.prototype.hasOwnProperty.call(props, "visible")
        ? !!props.visible
        : true;
    instance.visible = visible;
  }
};
