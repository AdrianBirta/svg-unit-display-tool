import { useEffect, useRef, useState } from 'react';
import FloorPlan from './components/FloorPlan';
import Sidebar from './components/Sidebar';
import './App.css';
import { CircleUnit, PolygonUnit, Point, DrawModeState } from './components/interfaces';
import { isCircleUnit } from './components/typeGuards';

type UnitData = PolygonUnit | CircleUnit;

function App() {
  const shapesCounter = useRef(2);
  const [unitsData, setUnitsData] = useState<UnitData[]>([
    {
      id: 1,
      label: 'Unit 1',
      points: [{ x: 230, y: 180 }, { x: 300, y: 200 }, { x: 260, y: 250 }],
    },
    {
      id: 2,
      label: 'Unit 2',
      cx: 30,
      cy: 30,
      r: 20
    }
  ]);

  const [newShape, setNewShape] = useState<UnitData>({
    id: 0,
    label: '',
    points: [],
    cx: 0,
    cy: 0,
    r: 0,
  });

  const [drawModeState, setDrawModeState] = useState<DrawModeState>({ drawType: '', drawState: false });
  const [selectModeState, setSelectModeState] = useState(true);

  const [selectedUnit, setSelectedUnit] = useState<UnitData | null>(null);

  const handleCreateNewShape = (svgPoint: Point | null, distance?: number) => {
    setNewShape((prevNewShape) => {
      if (drawModeState.drawType === 'polygon') {
        if (svgPoint) {
          // Ensure we're handling a PolygonUnit
          const polygonUnit = prevNewShape as PolygonUnit;
          return {
            ...polygonUnit,
            points: [...polygonUnit.points, { x: svgPoint.x, y: svgPoint.y }],
          };
        } else {
          const polygonUnit = prevNewShape as PolygonUnit;
          return {
            ...polygonUnit,
            points: [],
          };
        }
      } else if (drawModeState.drawType === 'circle' && svgPoint && distance !== undefined) {
        // Ensure we're handling a CircleUnit
        const circleUnit = prevNewShape as CircleUnit;
        return {
          ...circleUnit,
          cx: svgPoint.x,
          cy: svgPoint.y,
          r: distance,
        };
      }

      return prevNewShape; // Fallback for TypeScript, though this line should never be reached.
    });
  };

  const handleAddNewShape = () => {
    shapesCounter.current = shapesCounter.current + 1

    if (isCircleUnit(newShape) && newShape.r < 20) {
      setNewShape({
        id: 0,
        label: ``,
        cx: 0,
        cy: 0,
        r: 0,
      } as CircleUnit);

      return;
    }

    setUnitsData(prevUnits => {
      return [
        ...prevUnits,
        {
          ...newShape,
          id: shapesCounter.current,
          label: `Unit ${shapesCounter.current}`,
        }
      ]
    })

  }

  const handleSelectModeState = () => {
    setSelectModeState(!selectModeState);
    if (!selectModeState) {
      setDrawModeState(prevDrawMode => ({ ...prevDrawMode, drawState: false }))
    } else {
      setSelectedUnit(null)
    }
  }

  const handleDrawModeState = (drawType: string) => {
    setSelectedUnit(null);

    if (!drawModeState.drawState) {
      setSelectModeState(false);
      setDrawModeState(prevDrawMode => ({ drawType, drawState: !prevDrawMode.drawState }));
    } else {
      if (drawModeState.drawType !== drawType) {
        setDrawModeState(prevDrawMode => ({ ...prevDrawMode, drawType }));
      } else {
        setDrawModeState(prevDrawMode => ({ drawType, drawState: !prevDrawMode.drawState }));
      }
    }
  };

  const handleDeleteUnit = (unitID: number) => {
    setSelectedUnit(null);
    setUnitsData(prevUnitsData => {
      return prevUnitsData.filter(unitData => unitData.id !== unitID)
    })
  }

  const handleUnitClick = (unit: UnitData) => {
    if (selectModeState) {
      setSelectedUnit(prevUnit => prevUnit?.id === unit.id ? null : unit);
      setNewShape(unit)
    }
  };

  useEffect(() => {
    if (drawModeState.drawType === 'polygon') {
      setNewShape({
        id: 0,
        label: ``,
        points: [],
      } as PolygonUnit);
    } else if (drawModeState.drawType === 'circle') {
      setNewShape({
        id: 0,
        label: ``,
        cx: 0,
        cy: 0,
        r: 0,
      } as CircleUnit);
    }
  }, [drawModeState, drawModeState.drawType])

  return (
    <div className="App">
      <h1>SVG Unit Display Tool</h1>
      <section className="app-content">
        <Sidebar
          units={unitsData}
          unit={selectedUnit}
          selectModeState={selectModeState}
          drawModeState={drawModeState}
          onSelectModeState={handleSelectModeState}
          onDrawModeState={handleDrawModeState}
          onDeleteUnit={handleDeleteUnit}
        />
        <FloorPlan
          units={unitsData}
          onUnitClick={handleUnitClick}
          selectedUnitId={selectedUnit?.id ?? null} // Pass selected unit ID
          selectModeState={selectModeState}
          drawModeState={drawModeState}
          onCreateNewShape={handleCreateNewShape}
          onAddNewShape={handleAddNewShape}
          newShape={newShape}
        />
      </section>
    </div>
  );
}

export default App;
