import React from 'react';

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

interface SidebarProps {
  unit: UnitData | null;
  logData: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ unit, logData }) => {
  if (!unit) {
    return <div className="sidebar">No unit selected. <br /> Please select one</div>;
  }

  const renderCoordinates = () => {
    if (unit.points) {
      // If the unit is a polygon, display all points
      return (
        <div>
          <h4>Coordinates:</h4>
          <ul>
            {unit.points.map((point, index) => (
              <li key={index}>
                Point {index + 1}: ({point.x}, {point.y})
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      // If the unit is a rectangle, display its top-left corner
      return <p>Coordinates: ({unit.x}, {unit.y})</p>;
    }
  };

  return (
    <div className="sidebar">
      <section className="sidebar-details">
        <h2>{unit.label}</h2>
        <p>ID: {unit.id}</p>
        <p>Size: {unit.size}</p>
        {renderCoordinates()}
      </section>

      <button onClick={logData}>Log Data</button>
    </div>
  );
};

export default Sidebar;
