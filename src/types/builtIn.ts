import { IApplicationOptions, DisplayObject } from "pixi.js";

export interface IStageProps {
  width?: number;
  height?: number;
  options?: IApplicationOptions;
}

export type Instance = DisplayObject;
