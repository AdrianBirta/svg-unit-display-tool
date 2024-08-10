import React, { useEffect, useState } from 'react';
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
  addNewShape: (newShape: any) => void;
}

const FloorPlan: React.FC<FloorPlanProps> = ({ units, onUnitClick, selectedUnitId, addNewShape }) => {
  const [newShape, setNewShape] = useState<UnitData>({
    id: units.length + 1,
    label: `Unit ${units.length + 1}`,
    points: [],
    size: '?',
  });
  const [drawState, setDrawState] = useState(false);
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);

  const handleMouseDown = (event: any) => {
    const svgElement = event.currentTarget;
    const point = svgElement.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    const svgPoint = point.matrixTransform(svgElement.getScreenCTM()?.inverse());

    if (drawState) {
      setNewShape((prevNewShape: any) => ({
        ...prevNewShape,
        points: [...prevNewShape.points, { x: svgPoint.x, y: svgPoint.y }],
      }));
    }
  };

  const handlePointClick = (index: number, event: React.MouseEvent<SVGRectElement>) => {
    if (drawState) {
      event.stopPropagation();
      console.log(`Point ${index + 1} clicked!`);
      if (index === 0) {
        addNewShape(newShape)
        setDrawState(false)

        setNewShape(prevNewShape => {
          return {
            ...prevNewShape,
            id: prevNewShape.id + 1,
            label: `Unit ${prevNewShape.id + 1}`,
            points: []
          }
        })
      }
    }
  };

  const handleMouseEnter = (index: number) => {
    setHoveredPointIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredPointIndex(null);
  };

  useEffect(() => {
    console.log('newShape:', newShape);
  }, [newShape]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
      <input
        type="button"
        value={drawState ? 'Stop Drawing' : 'Start Drawing'}
        onClick={() => setDrawState(!drawState)}
        style={{ width: '100px' }}
      />
      <svg
        width="400"
        height="300"
        style={{ backgroundColor: '#bff2bf' }}
        onMouseDown={handleMouseDown}
      >
        {units?.map((unit) => (
          <Unit
            key={unit.id}
            unit={unit}
            onClick={() => onUnitClick(unit)}
            selected={unit.id === selectedUnitId}
          />
        ))}
        {drawState && (
          <>
            <Unit
              key={newShape.id}
              unit={newShape}
              onClick={() => onUnitClick(newShape)}
              selected={newShape.id === selectedUnitId}
            />
            {newShape.points?.map((point, index) => (
              <rect
                key={index}
                x={point.x - 5} // Center the point
                y={point.y - 5} // Center the point
                width={10} // Increased size for easier clicking
                height={10} // Increased size for easier clicking
                fill={index === 0 && hoveredPointIndex === index ? 'green' : 'white'} // Change color based on hover
                stroke="black"
                style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                className="point"
                onMouseDown={(e) => handlePointClick(index, e)} // Allow interaction with points
                onMouseEnter={() => handleMouseEnter(index)} // Highlight on hover
                onMouseLeave={handleMouseLeave} // Reset highlight on hover leave
              />
            ))}
          </>
        )}
      </svg>
    </div>
  );
};

export default FloorPlan;
