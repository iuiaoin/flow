export const NO_CONTEXT = {};

export enum TYPES {
  Graphics = "Graphics",
  Sprite = "Sprite",
  Text = "Text"
}

export const PIXI_REQUEST_RENDER = "__PIXI_REQUEST_RENDER__";

export const Events = {
  Click: "click",
  MouseDown: "mousedown",
  MouseMove: "mousemove",
  MouseOut: "mouseout",
  MouseOver: "mouseover",
  MouseUp: "mouseup",
  MouseUpOutside: "mouseupoutside",
  Tap: "tap",
  TouchStart: "touchstart",
  TouchMove: "touchmove",
  TouchEnd: "touchend",
  TouchEndOutside: "touchendoutside",
  PointerCancel: "pointercancel",
  PointerOut: "pointerout",
  PointerOver: "pointerover",
  PointerTap: "pointertap",
  PointerDown: "pointerdown",
  PointerUp: "pointerup",
  PointerUpOutside: "pointerupoutside",
  PointerMove: "pointermove",
  RightClick: "rightclick",
  RightDown: "rightdown",
  RightUp: "rightup",
  RightUpOutside: "rightupoutside",
  TouchCancel: "touchcancel"
};

export const PROPS_RESERVED = {
  children: true,
  parent: true,
  worldAlpha: true,
  worldTransform: true,
  worldVisible: true
};

export const PROPS_DISPLAY_OBJECT = {
  alpha: 1,
  buttonMode: false,
  cacheAsBitmap: false,
  cursor: null,
  filterArea: null,
  filters: null,
  hitArea: null,
  interactive: false,
  mask: null,
  pivot: 0,
  position: 0,
  renderable: true,
  rotation: 0,
  scale: 1,
  skew: 0,
  transform: null,
  visible: true,
  x: 0,
  y: 0
};
