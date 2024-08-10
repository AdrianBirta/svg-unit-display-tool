import { useState } from 'react';
import FloorPlan from './components/FloorPlan';
import Sidebar from './components/Sidebar';
import './App.css';

interface Point {
  x: number;
  y: number;
}

interface UnitData {
  id: number;
  label: string;
  size: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  points?: Point[]; // Array of points for polygons
}

function App() {
  const [unitsData, setUnitData] = useState<UnitData[]>([
    { id: 1, label: 'Unit 1', x: 10, y: 20, width: 50, height: 50, size: '50m²' },
    { id: 2, label: 'Unit 2', x: 100, y: 100, width: 80, height: 80, size: '80m²' },
    { id: 3, label: 'Unit 3', points: [{ x: 230, y: 180 }, { x: 300, y: 200 }, { x: 260, y: 250 }], size: '100m²' },
  ]);

  const [selectedUnit, setSelectedUnit] = useState<UnitData | null>(null);

  const handleUnitClick = (unit: UnitData) => {
    setSelectedUnit(prevUnit => prevUnit?.id === unit.id ? null : unit);
  };

  const addNewShape = (newShape: any) => {
    console.log('newShape added:', newShape);
    setUnitData(prevUnits => {
      return [
        ...prevUnits,
        newShape
      ]
    })
  }

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
        addNewShape={addNewShape}
      />
    </div>
  );
}

export default App;
