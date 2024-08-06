import React from 'react';

interface UnitData {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
}

interface UnitProps {
  unit: UnitData;
  onClick: () => void;
  selected: boolean;
}

const Unit: React.FC<UnitProps> = ({ unit, onClick, selected }) => {
  return (
    <rect
      x={unit.x}
      y={unit.y}
      width={unit.width}
      height={unit.height}
      fill={selected ? 'green' : 'lightgreen'}
      stroke="black"
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <title>{unit.label}</title>
    </rect>
  );
};

export default Unit;
