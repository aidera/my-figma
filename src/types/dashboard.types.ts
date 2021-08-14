export interface IDashboardElement {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
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
