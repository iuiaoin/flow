/* eslint-disable @typescript-eslint/ban-types */
import { IApplicationOptions, Container as PixiContainer, Graphics as PixiGraphics } from "pixi.js";

export interface IStageProps {
  width?: number;
  height?: number;
  options?: IApplicationOptions;
}

export interface IExtra {
  config?: IConfig;
  didMount?(child: Instance, parent: Instance): void;
  willUnmount?(child: Instance, parent: Instance): void;
  applyProps?(instance: Instance, prevProps: Props, nextProps: Props): boolean;
}

export interface Instance extends Container, IExtra {}

export interface Container extends PixiContainer {}

export type Props = Record<string, unknown> | undefined;

export type UpdatePayload = Array<string | null | unknown>;

export interface IConfig {
  destroy?: boolean;
  destroyChildren?: boolean;
}

export interface GraphicsInstance extends PixiGraphics, IExtra {}

export type TProps<T> = T extends Function ? T : { [K in keyof T]: TProps<T[K]> };

export interface IGraphicsProps {
  draw(g: GraphicsInstance): void;
}
