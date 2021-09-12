import { HostConfig as IHostConfig } from "react-reconciler";
import { Container, Instance, Props, UpdatePayload } from "../../types";
import { NO_CONTEXT } from "../constants";
import { appendChild } from "../utils/appendChild";
import { diffProperties } from "../utils/diffProperties";
import { dispatchRender } from "../utils/dispatchRender";
import { createElement } from "../utils/createElement";
import { hasOwnProperty } from "../utils/hasOwnProperty";
import { insertBefore } from "../utils/insertBefore";
import { removeChild } from "../utils/removeChild";

export const HostConfig: IHostConfig<
  string,
  Props,
  Container,
  Instance,
  unknown,
  unknown,
  unknown,
  unknown,
  Record<string, unknown>,
  UpdatePayload,
  unknown,
  number,
  number
> = {
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

  unhideInstance(instance: Instance, props: Record<string, unknown> | null | undefined): void {
    const visible =
      props !== undefined && props !== null && hasOwnProperty(props, "visible")
        ? !!props.visible
        : true;
    instance.visible = visible;
  },

  finalizeInitialChildren(): boolean {
    return false;
  },

  prepareUpdate(
    _instance: Instance,
    _type: string,
    oldProps: Props,
    newProps: Props
  ): UpdatePayload | null {
    return diffProperties(oldProps, newProps);
  },

  shouldSetTextContent(): boolean {
    return false;
  },

  createTextInstance(): void {
    // PixiFiber does not support text nodes as children of a Pixi component, use property instead.
  },

  unhideTextInstance(): void {
    // noop
  },

  scheduleTimeout: setTimeout,

  cancelTimeout: clearTimeout,

  noTimeout: -1,

  now: performance.now,

  isPrimaryRenderer: false,

  supportsMutation: true,

  supportsPersistence: false,

  supportsHydration: false,

  appendInitialChild(parent: Instance, child: Instance): void {
    appendChild(parent, child);
    dispatchRender("appendInitialChild");
  },

  appendChild(parent: Instance, child: Instance): void {
    appendChild(parent, child);
    dispatchRender("appendChild");
  },

  appendChildToContainer(container: Container, child: Instance): void {
    appendChild(container, child);
    dispatchRender("appendChildToContainer");
  },

  removeChild(parent: Instance, child: Instance): void {
    removeChild(parent, child);
    dispatchRender("removeChild");
  },

  removeChildFromContainer(container: Container, child: Instance): void {
    removeChild(container, child);
    dispatchRender("removeChildFromContainer");
  },

  insertBefore(parent: Instance, child: Instance, beforeChild: Instance): void {
    insertBefore(parent, child, beforeChild);
    dispatchRender("insertBefore");
  },

  insertInContainerBefore(container: Container, child: Instance, beforeChild: Instance): void {
    insertBefore(container, child, beforeChild);
    dispatchRender("insertInContainerBefore");
  },

  commitUpdate(
    instance: Instance,
    _updatePayload: UpdatePayload,
    _type: string,
    prevProps: Props,
    nextProps: Props
  ): void {
    const { applyProps } = instance;
    const changed = applyProps(instance, prevProps, nextProps);
    if (changed || prepareChanged) {
      dispatchRender("commitUpdate");
    }
  },

  commitMount(): void {
    // noop
  },

  commitTextUpdate(): void {
    // noop
  },

  resetTextContent(): void {
    // noop
  },

  clearContainer(): void {
    // TODO implement this
  },

  preparePortalMount(): void {
    // noop
  }
};
