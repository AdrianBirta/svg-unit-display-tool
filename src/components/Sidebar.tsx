import React from 'react';
import DrawControl from './DrawControl';
import { CircleUnit, DrawModeState, PolygonUnit } from './interfaces';
import { isCircleUnit, isPolygonUnit } from './typeGuards';
import { Trash } from 'react-bootstrap-icons';

type UnitData = PolygonUnit | CircleUnit;

interface SidebarProps {
  units: UnitData[];
  unit: UnitData | null;
  selectModeState: boolean;
  drawModeState: DrawModeState;
  onSelectModeState: () => void;
  onDrawModeState: (drawState: string) => void;
  onDeleteUnit: (unitID: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  unit,
  units,
  selectModeState,
  drawModeState,
  onSelectModeState,
  onDrawModeState,
  onDeleteUnit,
}) => {
  const renderCoordinates = (unitItem: UnitData = unit!) => {
    if (isPolygonUnit(unitItem)) {
      return (
        <>
          <span>
            <i>Coordinates:</i>
          </span>
          {(unitItem as PolygonUnit).points!.map((point, index) => (
            <span key={unitItem.label + index}>
              ({point.x.toFixed(0)}, {point.y.toFixed(0)})
            </span>
          ))}
        </>
      );
    } else if (isCircleUnit(unitItem)) {
      return (
        <span>
          <span>
            <i>Coordinates:</i>
          </span>{' '}
          ({(unitItem as CircleUnit).cx?.toFixed(0)}, {(unitItem as CircleUnit).cy?.toFixed(0)}, r:
          {(unitItem as CircleUnit).r?.toFixed(0)})
        </span>
      );
    } else {
      return (
        <span>
          <span>
            <i>Coordinates:</i>
          </span>{' '}
          ({(unitItem as any).x?.toFixed(0)}, {(unitItem as any).y?.toFixed(0)})
        </span>
      );
    }
  };

  return (
    <div className="sidebar">
      <section className="sidebar-draw">
        <DrawControl
          selectModeState={selectModeState}
          drawModeState={drawModeState}
          onSelectModeState={onSelectModeState}
          onDrawModeState={onDrawModeState}
        />
      </section>

      <section className="sidebar-selected-unit">
        {unit ? (
          <div>
            <span>
              <h3>Selected Unit </h3>
              <p>Label: {unit.label}</p>
              {renderCoordinates()}
            </span>
            <span>
              <button
                onClick={() => onDeleteUnit(unit.id)}
                className="control-button"
              >
                <Trash color="black" size={20} />
              </button>
            </span>
          </div>
        ) : (
          <></>
        )}
      </section>

      <section className="sidebar-units">
        <h3>Units </h3>
        {units.length ? (
          units.map((unitItem, index) => {
            return (
              <div key={unitItem.label}>
                <span>
                  {index + 1}. <b>{unitItem.label}</b>:{' '}
                </span>
                {renderCoordinates(unitItem)}
              </div>
            );
          })
        ) : (
          <>No unit on the Floor Map. Start Drawing!</>
        )}
      </section>
    </div>
  );
};

export default Sidebar;
