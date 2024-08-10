import React from 'react';

interface UnitData {
  id: number;
  label: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  points?: { x: number; y: number }[];
}

interface UnitProps {
  unit: UnitData;
  onClick: () => void;
  selected: boolean;
}

const Unit: React.FC<UnitProps> = ({ unit, onClick, selected }) => {
  if (unit.points) {
    const pointsString = unit.points.map(p => `${p.x},${p.y}`).join(' ');

    return (
      <polygon
        points={pointsString}
        fill={selected ? 'green' : 'lightgreen'}
        stroke="black"
        onClick={onClick}
        style={{ cursor: 'pointer' }}
      >
        <title>{unit.label}</title>
      </polygon>
    );
  }

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
