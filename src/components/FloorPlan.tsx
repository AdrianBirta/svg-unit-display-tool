import React, { useState } from 'react';
import Unit from './Unit/Unit.tsx';
import { CircleUnit, DrawModeState, Point, PolygonUnit } from './interfaces';
import { isCircleUnit, isPolygonUnit } from './typeGuards.ts';

type UnitData = PolygonUnit | CircleUnit;

interface FloorPlanProps {
  units: UnitData[];
  newShape: UnitData;
  selectedUnitId: number | null;
  selectModeState: boolean;
  drawModeState: DrawModeState;
  onUnitClick: (unit: UnitData) => void;
  onCreateNewShape: (svgPoint: Point | null, distance?: number) => void;
  onAddNewShape: () => void;
}

const FloorPlan: React.FC<FloorPlanProps> = ({
  units,
  newShape,
  selectedUnitId,
  selectModeState,
  drawModeState,
  onUnitClick,
  onCreateNewShape,
  onAddNewShape,
}) => {
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);
  const [dragState, setDragState] = useState(false);

  const [initialPoint, setInitialPoint] = useState<Point | null>(null)

  const getSVGPoint = (currentTarget: any, clientX: any, clientY: any) => {
    const svgElement = currentTarget;
    const point = svgElement.createSVGPoint();
    point.x = clientX;
    point.y = clientY;
    return point.matrixTransform(svgElement.getScreenCTM()?.inverse());
  };

  const handleMouseDownSVG = (event: any) => {
    const svgPoint = getSVGPoint(event.currentTarget, event.clientX, event.clientY);

    if (drawModeState.drawState) {
      setInitialPoint(svgPoint)
      onCreateNewShape({ x: svgPoint.x, y: svgPoint.y });
    }
  };

  const handleMouseMoveSVG = (event: any) => {
    if (drawModeState.drawState && drawModeState.drawType === 'circle' && initialPoint) {
      const svgPoint = getSVGPoint(event.currentTarget, event.clientX, event.clientY);

      const distance = Math.sqrt(
        Math.pow(svgPoint.x - initialPoint.x, 2) + Math.pow(svgPoint.y - initialPoint.y, 2)
      );

      // Update the circle's radius based on the distance
      if (initialPoint) {
        onCreateNewShape(
          {
            x: initialPoint.x,
            y: initialPoint.y,
          },
          distance
        );
      }
    }
  }

  const handleMouseUpSVG = () => {
    // Switch drawing tool while drawing polygon will reset initial point
    if (initialPoint !== null) {
      setInitialPoint(null);
    }

    if (drawModeState.drawState && drawModeState.drawType === 'circle' && initialPoint) {
      onAddNewShape();
      onCreateNewShape(null);
      setInitialPoint(null);
    }
  }

  const handlePointClickRect = (index: number, event: React.MouseEvent<SVGRectElement>) => {
    setDragState(true);

    if (drawModeState.drawState) {
      event.stopPropagation();
      if (
        index === 0 &&
        isPolygonUnit(newShape) &&
        newShape.points.length > 2
      ) {
        console.log(isPolygonUnit(newShape) && newShape.points)
        onAddNewShape();
        onCreateNewShape(null);
        setInitialPoint(null);
      }
    }
  };

  const handleMouseEnterRect = (index: number) => {
    setHoveredPointIndex(index);
  };

  const handleMouseLeaveRect = () => {
    setHoveredPointIndex(null);
  };

  return (
    <div className='floorPlan'>
      <svg
        style={{
          cursor: drawModeState.drawState ? 'crosshair' : 'initial',
          width: '500px',
          height: '400px',
          borderRight: '1px solid lightgreen',
          borderBottom: '1px solid lightgreen',
        }}
        onMouseDown={handleMouseDownSVG}
        onMouseUp={handleMouseUpSVG}
        onMouseMove={handleMouseMoveSVG}
      >
        {/* Define the pattern for shredded lines */}
        <defs>
          <pattern
            id="grid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="green"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>

        {/* Apply the pattern as background */}
        <rect
          width="100%"
          height="100%"
          fill="url(#grid)"
        />
        {units?.map((unit) => (
          <Unit
            key={unit.id}
            unit={unit}
            onClick={() => onUnitClick(unit)}
            selected={unit.id === selectedUnitId}
            selectModeState={selectModeState}
            drawModeState={drawModeState}
          />
        ))}
        {drawModeState.drawState && isPolygonUnit(newShape) && (
          <>
            <Unit
              key={newShape.id}
              unit={newShape}
              onClick={() => onUnitClick(newShape)}
              selected={newShape.id === selectedUnitId}
              selectModeState={selectModeState}
              drawModeState={drawModeState}
            />
            {newShape.points.map((point, index) => (
              <rect
                key={index}
                x={point.x - 5}
                y={point.y - 5}
                width={10}
                height={10}
                fill={
                  index === 0 &&
                    hoveredPointIndex === index &&
                    newShape.points.length > 1 &&
                    newShape.points.length < 3 ?
                    '#dd5050'
                    : index === 0 && hoveredPointIndex === index
                      ? 'green'
                      : hoveredPointIndex !== index
                        ? 'white'
                        : 'lightgray'
                }
                stroke="black"
                style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                className="point"
                onMouseDown={(e) => handlePointClickRect(index, e)}
                onMouseEnter={() => handleMouseEnterRect(index)}
                onMouseLeave={handleMouseLeaveRect}
              />
            ))}
          </>
        )}
        {drawModeState.drawState && isCircleUnit(newShape) && (
          <>
            <Unit
              key={newShape.id}
              unit={newShape}
              onClick={() => onUnitClick(newShape)}
              selected={newShape.id === selectedUnitId}
              selectModeState={selectModeState}
              drawModeState={drawModeState}
            />
          </>
        )}
      </svg>
    </div>
  );
};

export default FloorPlan;
