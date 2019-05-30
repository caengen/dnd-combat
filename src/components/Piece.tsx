import React from "react";
import { DragSource, DragSourceMonitor, DragSourceConnector, DragElementWrapper, DragSourceOptions } from "react-dnd";
import { Draggables } from "../types";
import styled from "styled-components";

const pieceSource = {
  beginDrag(props: { id: string }) {
    return { pieceId: props.id };
  }
}

interface DndProps {
  connectDragSource: DragElementWrapper<DragSourceOptions>;
  isDragging: boolean;
}
function collect(connect: DragSourceConnector, monitor: DragSourceMonitor): DndProps {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

function Piece(props: DndProps) {
  const { connectDragSource, isDragging } = props;
  return connectDragSource(
    <div>
      <StyledPiece isDragging={isDragging}>
        ♘
      </StyledPiece>
    </div>
  );
}

const StyledPiece = styled.div<{isDragging: boolean}>`
  opacity: ${p => p.isDragging ? 0.5 : 1};
  font-size: 2em;
  font-weight: bold;
  cursor: move;
`;

export default DragSource(Draggables.Piece, pieceSource, collect)(Piece)

