import React from 'react';
import Unit from './Unit';

interface UnitData {
  id: number;
  label: string;
  size: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  points?: { x: number; y: number }[];
}

interface FloorPlanProps {
  units: UnitData[];
  onUnitClick: (unit: UnitData) => void;
  selectedUnitId: number | null;
}

const FloorPlan: React.FC<FloorPlanProps> = ({ units, onUnitClick, selectedUnitId }) => {
  return (
    <svg width="400" height="300" style={{ backgroundColor: '#bff2bf' }}>
      {units.map(unit => (
        <Unit
          key={unit.id}
          unit={unit}
          onClick={() => onUnitClick(unit)}
          selected={unit.id === selectedUnitId}
        />
      ))}
    </svg>
  );
};

export default FloorPlan;
