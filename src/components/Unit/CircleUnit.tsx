import React from 'react';
import { CircleUnit as CircleUnitType, DrawModeState } from '../interfaces';

interface CircleUnitProps {
  unit: CircleUnitType;
  selected: boolean;
  selectModeState: boolean;
  drawModeState: DrawModeState;
  onClick: () => void;
}

const CircleUnit: React.FC<CircleUnitProps> = ({
  unit,
  selected,
  selectModeState,
  drawModeState,
  onClick,
}) => {
  return (
    <>
      <circle
        cx={unit.cx}
        cy={unit.cy}
        r={unit.r}
        fill={selected ? '#00ff0090' : unit.r < 20 ? 'red' : '#00ff0050'}
        stroke="grey"
        strokeWidth={1}
        onClick={onClick}
        style={{
          cursor: drawModeState.drawState ? 'crosshair' : selectModeState ? 'pointer' : 'initial',
        }}
      >
        <title>{unit.label}</title>
      </circle>
      {
        unit.r > 3 ?
          <text
            x={unit.cx}
            y={unit.cy}
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

export default CircleUnit;
