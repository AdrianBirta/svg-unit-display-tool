import { PolygonUnit, CircleUnit } from './interfaces';

export function isPolygonUnit(unit: PolygonUnit | CircleUnit): unit is PolygonUnit {
  return (unit as PolygonUnit).points !== undefined;
}

export function isCircleUnit(unit: PolygonUnit | CircleUnit): unit is CircleUnit {
  return (unit as CircleUnit).cx !== undefined && (unit as CircleUnit).cy !== undefined;
}
