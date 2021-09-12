import { PIXI_REQUEST_RENDER } from "../constants";

export const dispatchRender = <T>(detail?: T): void => {
  window.dispatchEvent(new CustomEvent(PIXI_REQUEST_RENDER, { detail }));
};
