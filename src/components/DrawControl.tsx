import { DrawModeState } from "./interfaces";
import { Circle, Cursor, Heptagon } from 'react-bootstrap-icons';

interface DrawControlProps {
  selectModeState: boolean;
  drawModeState: DrawModeState;
  onSelectModeState: () => void;
  onDrawModeState: (drawType: string) => void;
}

const DrawControl: React.FC<DrawControlProps> = ({
  selectModeState,
  drawModeState,
  onSelectModeState,
  onDrawModeState
}) => {
  return (
    <>
      <h3>Draw Units Control </h3>
      <section className="draw-control-buttons">
        <button
          onClick={onSelectModeState}
          className={selectModeState ? "control-button active-button" : "control-button"}
        >
          <Cursor
            color={selectModeState ? 'white' : 'black'}
            size={20}
          />
        </button>

        <button
          onClick={() => onDrawModeState('polygon')}
          className={drawModeState.drawState && drawModeState.drawType === 'polygon' ? "control-button active-button" : "control-button"}
        >
          <Heptagon
            color={drawModeState.drawState && drawModeState.drawType === 'polygon' ? 'white' : 'black'}
            size={20}
          />
        </button>

        <button
          onClick={() => onDrawModeState('circle')}
          className={drawModeState.drawState && drawModeState.drawType === 'circle' ? "control-button active-button" : "control-button"}
        >
          <Circle
            color={drawModeState.drawState && drawModeState.drawType === 'circle' ? 'white' : 'black'}
            size={20}
          />
        </button>

      </section>
    </>
  )
}

export default DrawControl;