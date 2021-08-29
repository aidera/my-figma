export type BasicCoords = { x: number; y: number };

export interface IDashboardElement {
  id: string;
  name: string;
  type: DashboardCreateModeElementType | null;
  x: number;
  y: number;
  width: number;
  height: number;
  point1: BasicCoords;
  point2: BasicCoords;
}

export interface IDashboardElementRectangle extends IDashboardElement {
  fill: string;
  border: {
    width: number;
    color: string;
    radius: number;
  };
}

export interface IDashboardElementCircle extends IDashboardElement {
  fill: string;
  border: {
    width: number;
    color: string;
  };
}

export interface IDashboardElementLine extends IDashboardElement {
  fill: string;
  lineWidth: number;
}

export type AnyDashboardElement =
  | IDashboardElement
  | IDashboardElementRectangle
  | IDashboardElementLine
  | IDashboardElementCircle;

export interface IDashboardCreatingElement {
  point1: BasicCoords;
  point2: BasicCoords;
}

export const DEFAULT_ELEMENT_NAME = {
  rectangle: 'Rectangle',
  circle: 'Circle',
  line: 'Line',
  text: 'Text',
  image: 'Image',
};

export type DashboardModeType = 'select' | 'create' | 'move';

export type DashboardCreateModeElementType =
  | 'rectangle'
  | 'circle'
  | 'line'
  | 'text'
  | 'image';

export enum DashboardResizeEnum {
  top,
  topRight,
  right,
  bottomRight,
  bottom,
  bottomLeft,
  left,
  topLeft,
}
