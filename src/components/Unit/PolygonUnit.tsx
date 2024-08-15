import React from 'react';
import { DrawModeState, PolygonUnit as PolygonUnitType } from '../interfaces';

interface PolygonUnitProps {
  unit: PolygonUnitType;
  selected: boolean;
  selectModeState: boolean;
  drawModeState: DrawModeState;
  onClick: () => void;
}

const PolygonUnit: React.FC<PolygonUnitProps> = ({
  unit,
  selected,
  selectModeState,
  drawModeState,
  onClick,
}) => {
  const pointsString = unit.points?.map(p => `${p.x},${p.y}`).join(' ') || '';

  const calculateCentroid = (points: { x: number; y: number }[]) => {
    const centroid = points.reduce(
      (acc, point) => {
        acc.x += point.x;
        acc.y += point.y;
        return acc;
      },
      { x: 0, y: 0 }
    );
    return {
      x: centroid.x / points.length,
      y: centroid.y / points.length,
    };
  };

  return (
    <>
      <polygon
        points={pointsString}
        fill={selected ? '#00ff0090' : '#00ff0050'}
        stroke={unit.points.length < 3 ? '#ff000070' : "grey"}
        strokeWidth={1}
        onClick={onClick}
        style={{
          cursor: drawModeState.drawState ? 'crosshair' : selectModeState ? 'pointer' : 'initial',
        }}
      >
        <title>{unit.label}</title>
      </polygon>
      {
        unit.points.length > 2 ?
          <text
            x={calculateCentroid(unit.points).x}
            y={calculateCentroid(unit.points).y}
            fill="green"
            fontSize="12"
            textAnchor="middle"
            dominantBaseline="middle"
            pointerEvents='none'
            style={{ userSelect: 'none' }}
          >
            {unit.label}
          </text>
          : <></>
      }
    </>
  );
};

export default PolygonUnit;
