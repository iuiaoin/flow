import { IApplicationOptions, Container as PixiContainer } from "pixi.js";

export interface IStageProps {
  width?: number;
  height?: number;
  options?: IApplicationOptions;
}

export interface Instance extends Container {
  config?: IConfig;
  didMount?(child: Instance, parent: Instance): void;
  willUnmount?(child: Instance, parent: Instance): void;
  applyProps?(instance: Instance, oldProps: Props, newProps: Props): boolean;
}

export interface Container extends PixiContainer {}

export type Props = Record<string, unknown> | undefined;

export type UpdatePayload = Array<string | null | unknown>;

export interface IConfig {
  destroy?: boolean;
  destroyChildren?: boolean;
}
