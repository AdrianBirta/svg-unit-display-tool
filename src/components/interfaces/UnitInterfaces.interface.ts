export interface Point {
  x: number;
  y: number;
}

export interface PolygonUnit {
  id: number;
  label: string;
  points: Point[];
}

export interface CircleUnit {
  id: number;
  label: string;
  cx: number;
  cy: number;
  r: number;
}
