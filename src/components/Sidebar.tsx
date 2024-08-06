import React from 'react';

interface UnitData {
  x: number;
  y: number;
  label: string;
  id: number;
  size: string;
}

interface SidebarProps {
  unit: UnitData | null;
  logData: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ unit, logData }) => {
  if (!unit) {
    return <div className="sidebar">No unit selected. <br /> Please select one</div>;
  }

  return (
    <div className="sidebar">
      <section className="sidebar-details">
        <h2>{unit.label}</h2>
        <p>ID: {unit.id}</p>
        <p>Size: {unit.size}</p>
        <p>Coordinates: ({unit.x}, {unit.y})</p>
      </section>

      <button onClick={logData}>Log Data</button>
    </div>
  );
};

export default Sidebar;
