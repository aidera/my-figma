export interface IDashboardElement {
  id: string;
  type: DashboardCreateModeElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  point1: {
    x: number;
    y: number;
  };
  point2: {
    x: number;
    y: number;
  };
}

export interface IDashboardElementRectangle extends IDashboardElement {
  fill: string;
  border: {
    width: number;
    color: string;
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

export interface IDashboardCreatingElement {
  point1: {
    x: number;
    y: number;
  };
  point2: {
    x: number;
    y: number;
  };
}

export type DashboardModeType = 'select' | 'create' | 'move';

export type DashboardCreateModeElementType =
  | 'rectangle'
  | 'circle'
  | 'line'
  | 'text'
  | 'image'
  | null;
