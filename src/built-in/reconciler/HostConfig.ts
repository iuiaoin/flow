import { HostConfig as IHostConfig } from "react-reconciler";
import { NO_CONTEXT } from "../../constants";

export const HostConfig: IHostConfig = {
  getRootHostContext(): Record<string, unknown> {
    return NO_CONTEXT;
  },

  getChildHostContext(): Record<string, unknown> {
    return NO_CONTEXT;
  },

  getPublicInstance(instance: unknown): unknown {
    return instance;
  },

  prepareForCommit(): null {
    return null;
  },

  resetAfterCommit(): void {
    // noop
  },

  createInstance: 
};
