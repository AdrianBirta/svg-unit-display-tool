import { useState } from 'react';
import FloorPlan from './components/FloorPlan';
import Sidebar from './components/Sidebar';
import './App.css';

interface UnitData {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  id: number;
  size: string;
}

const unitsData: UnitData[] = [
  { id: 1, label: 'Unit 1', x: 10, y: 20, width: 50, height: 50, size: '50m²' },
  { id: 2, label: 'Unit 2', x: 100, y: 100, width: 80, height: 80, size: '80m²' },
  { id: 3, label: 'Unit 3', x: 230, y: 180, width: 100, height: 100, size: '100m²' },
];

function App() {
  const [selectedUnit, setSelectedUnit] = useState<UnitData | null>(null);

  const handleUnitClick = (unit: UnitData) => {
    setSelectedUnit(prevUnit => prevUnit?.id === unit.id ? null : unit);
  };

  const logData = () => {
    console.log('All units:', unitsData);
    console.log('Selected unit:', selectedUnit);
  };

  return (
    <div className="App">
      <Sidebar unit={selectedUnit} logData={logData} />
      <FloorPlan
        units={unitsData}
        onUnitClick={handleUnitClick}
        selectedUnitId={selectedUnit?.id ?? null} // Pass selected unit ID
      />
    </div>
  );
}

export default App;
