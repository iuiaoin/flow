import { IApplicationOptions } from "pixi.js";

export interface INode<T = unknown, P = unknown> {
  readonly id: string;
  readonly x: number;
  readonly y: number;
  readonly name?: string;
  readonly width?: number;
  readonly height?: number;
  readonly ports?: ReadonlyArray<IPort<P>>;
  readonly data?: Readonly<T>;
}

export interface IEdge<T = unknown> {
  readonly id: string;
  readonly source: string;
  readonly target: string;
  readonly sourcePort: string;
  readonly targetPort: string;
  readonly data?: Readonly<T>;
}

export interface IPort<T = unknown> {
  readonly id: string;
  readonly x: number;
  readonly y: number;
  readonly name?: string;
  readonly data?: Readonly<T>;
}

export interface IGraph<
  NodeData = unknown,
  EdgeData = unknown,
  PortData = unknown
> {
  readonly nodes: ReadonlyArray<INode<NodeData, PortData>>;
  readonly edges: ReadonlyArray<IEdge<EdgeData>>;
}

export interface IGraphProps extends IGraph, IApplicationOptions {}

export interface IStageProps {
  width?: number;
  height?: number;
  options?: IApplicationOptions;
}
