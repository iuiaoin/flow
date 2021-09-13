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
import { applyDefaultProps } from "../utils/applyDefaultProps";

export class HostConfig
  implements
    IHostConfig<
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
    > {
  public readonly isPrimaryRenderer: boolean = false;
  public readonly supportsMutation: boolean = true;
  public readonly supportsPersistence: boolean = false;
  public readonly supportsHydration: boolean = false;
  public readonly noTimeout: number = -1;
  public readonly createInstance = createElement;
  public readonly scheduleTimeout = setTimeout;
  public readonly cancelTimeout = clearTimeout;
  public readonly now = performance.now;
  private prepareChanged: UpdatePayload | null = null;

  public getRootHostContext(): Record<string, unknown> {
    return NO_CONTEXT;
  }

  public getChildHostContext(): Record<string, unknown> {
    return NO_CONTEXT;
  }

  public getPublicInstance(instance: Instance): Instance {
    return instance;
  }

  public prepareForCommit(): null {
    return null;
  }

  public resetAfterCommit(): void {
    // noop
  }

  public hideInstance(instance: Instance): void {
    instance.visible = false;
  }

  public unhideInstance(
    instance: Instance,
    props: Record<string, unknown> | null | undefined
  ): void {
    const visible =
      props !== undefined && props !== null && hasOwnProperty(props, "visible")
        ? !!props.visible
        : true;
    instance.visible = visible;
  }

  public finalizeInitialChildren(): boolean {
    return false;
  }

  public prepareUpdate(
    _instance: Instance,
    _type: string,
    prevProps: Props,
    nextProps: Props
  ): UpdatePayload | null {
    this.prepareChanged = diffProperties(prevProps, nextProps);
    return this.prepareChanged;
  }

  public shouldSetTextContent(): boolean {
    return false;
  }

  public createTextInstance(): void {
    // PixiFiber does not support text nodes as children of a Pixi component, use property instead.
  }

  public unhideTextInstance(): void {
    // noop
  }

  public appendInitialChild(parent: Instance, child: Instance): void {
    appendChild(parent, child);
    dispatchRender("appendInitialChild");
  }

  public appendChild(parent: Instance, child: Instance): void {
    appendChild(parent, child);
    dispatchRender("appendChild");
  }

  public appendChildToContainer(container: Container, child: Instance): void {
    appendChild(container, child);
    dispatchRender("appendChildToContainer");
  }

  public removeChild(parent: Instance, child: Instance): void {
    removeChild(parent, child);
    dispatchRender("removeChild");
  }

  public removeChildFromContainer(container: Container, child: Instance): void {
    removeChild(container, child);
    dispatchRender("removeChildFromContainer");
  }

  public insertBefore(parent: Instance, child: Instance, beforeChild: Instance): void {
    insertBefore(parent, child, beforeChild);
    dispatchRender("insertBefore");
  }

  public insertInContainerBefore(
    container: Container,
    child: Instance,
    beforeChild: Instance
  ): void {
    insertBefore(container, child, beforeChild);
    dispatchRender("insertInContainerBefore");
  }

  public commitUpdate(
    instance: Instance,
    _updatePayload: UpdatePayload,
    _type: string,
    prevProps: Props,
    nextProps: Props
  ): void {
    const { applyProps = applyDefaultProps } = instance;
    const changed = applyProps(instance, prevProps, nextProps);
    if (changed || this.prepareChanged) {
      dispatchRender("commitUpdate");
    }
  }

  public commitMount(): void {
    // noop
  }

  public commitTextUpdate(): void {
    // noop
  }

  public resetTextContent(): void {
    // noop
  }

  public clearContainer(): void {
    // TODO implement this
  }

  public preparePortalMount(): void {
    // noop
  }
}
