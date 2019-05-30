import React from "react";
import {Cell } from "..";
import { DropTargetConnector, DropTargetMonitor, DragElementWrapper, DropTarget } from "react-dnd";
import { Draggables } from "../../types";

const cellTarget = {
  drop(props: BoardCellProps, monitor: DropTargetMonitor) {
    movePiece(props.x, props.y)
  }
}

interface DndProps {
  connectDropTarget: DragElementWrapper<any>;
  isOver: boolean;
}
function collect(connect: DropTargetConnector, monitor: DropTargetMonitor): DndProps {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

interface BoardCellProps {
  x: number;
  y: number;
  children?: any;
}
function BoardCell(props: BoardCellProps & DndProps) {
  return props.connectDropTarget(
    <Cell>{props.children}</Cell>
  );
}

export default DropTarget(Draggables.Piece, cellTarget, collect)(BoardCell)
