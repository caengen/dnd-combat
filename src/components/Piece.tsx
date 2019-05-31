import React from "react";
import { DragSource, DragSourceMonitor, DragSourceConnector, DragElementWrapper, DragSourceOptions } from "react-dnd";
import { Draggables } from "../types";
import styled from "styled-components";
import { Piece as PieceType} from "../types";
import orc from "../assets/pieces/001-orc.svg";

const pieceSource = {
  beginDrag(props: PieceProps) {
    return { id: props.piece.id };
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

interface PieceProps {
  piece: PieceType;
  size?: number;
}
function Piece(props: PieceProps & DndProps) {
  const { size, connectDragSource, isDragging } = props;
  return connectDragSource(
    <div>
      <StyledPiece size={size} isDragging={isDragging}>
        {<img src={orc} />}
      </StyledPiece>
    </div>
  );
}

const StyledPiece = styled.div<{size?: number, isDragging: boolean}>`
  opacity: ${p => p.isDragging ? 0.5 : 1};
  img {
    width: ${p => p.size ? p.size : 1}em;
  }
  cursor: move;
`;

export default DragSource(Draggables.Piece, pieceSource, collect)(Piece)

