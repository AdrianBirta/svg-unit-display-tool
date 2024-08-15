import React from 'react';
import { PolygonUnit as PolygonUnitType, CircleUnit as CircleUnitType, DrawModeState } from '../interfaces';
import PolygonUnit from './PolygonUnit';
import CircleUnit from './CircleUnit';
import { isPolygonUnit, isCircleUnit } from '../typeGuards';

type UnitData = PolygonUnitType | CircleUnitType;

interface UnitProps {
  unit: UnitData;
  selected: boolean;
  selectModeState: boolean;
  drawModeState: DrawModeState;
  onClick: () => void;
}

const Unit: React.FC<UnitProps> = ({
  unit,
  selected,
  selectModeState,
  drawModeState,
  onClick,
}) => {
  if (isPolygonUnit(unit)) {
    return (
      <PolygonUnit
        unit={unit}
        selected={selected}
        selectModeState={selectModeState}
        drawModeState={drawModeState}
        onClick={onClick}
      />
    );
  } else if (isCircleUnit(unit)) {
    return (
      <CircleUnit
        unit={unit}
        selected={selected}
        selectModeState={selectModeState}
        drawModeState={drawModeState}
        onClick={onClick}
      />
    );
  }

  return null; // Or handle other unit types if necessary
};

export default Unit;
