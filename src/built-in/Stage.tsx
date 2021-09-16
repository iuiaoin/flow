import { Application } from "pixi.js";
import * as React from "react";
import { FiberRoot } from "react-reconciler";
import { AppProvider } from "../components/AppProvider";
import { IStageProps } from "../types";
import { PixiFiber } from "./reconciler/PixiFiber";

export class Stage extends React.Component<IStageProps> {
  public static defaultProps = {
    width: 800,
    height: 600
  };

  private app: Application;
  private canvas: HTMLCanvasElement | null;
  private mountNode: FiberRoot;

  public componentDidMount(): void {
    const { width, height, options } = this.props;
    this.app = new Application({
      width,
      height,
      autoDensity: true,
      view: this.canvas as HTMLCanvasElement,
      ...options
    });

    this.mountNode = PixiFiber.createContainer(this.app.stage, 2, false, null);
    PixiFiber.updateContainer(this.getChildren(), this.mountNode, this);
    this.renderStage();
  }

  public render(): React.ReactNode {
    const { options } = this.props;
    if (options?.view) {
      return null;
    }
    return <canvas ref={this.ref.bind(this)} />;
  }

  private ref(el: HTMLCanvasElement | null): void {
    this.canvas = el;
  }

  private getChildren(): React.ReactNode {
    const { children } = this.props;
    return <AppProvider value={this.app}>{children}</AppProvider>;
  }

  private renderStage(): void {
    this.app.renderer.render(this.app.stage);
  }
}
