import React from 'react';
import Unit from './Unit';

interface UnitData {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  id: number;
  size: string;
}

interface FloorPlanProps {
  units: UnitData[];
  onUnitClick: (unit: UnitData) => void;
  selectedUnitId: number | null; // New prop to indicate selected unit
}

const FloorPlan: React.FC<FloorPlanProps> = ({ units, onUnitClick, selectedUnitId }) => {
  return (
    <svg width="400" height="300" style={{ backgroundColor: '#bff2bf' }}>
      {units.map(unit => (
        <Unit
          key={unit.id}
          unit={unit}
          onClick={() => onUnitClick(unit)}
          selected={unit.id === selectedUnitId} // Pass selection status
        />
      ))}
    </svg>
  );
};

export default FloorPlan;
