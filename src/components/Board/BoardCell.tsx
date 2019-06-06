import React from "react";
import {Cell } from "..";
import { DropTargetConnector, DropTargetMonitor, DragElementWrapper, DropTarget } from "react-dnd";
import { Draggables } from "../../types";
import { Action } from "../../actions";

const cellTarget = {
  drop(props: BoardCellProps, monitor: DropTargetMonitor) {
    // see beginDrag in Piece.tsx
    const item: { id: string } = monitor.getItem();
    props.onDropPiece(item.id)
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
  onDropPiece: (id: string) => Action;
  children?: any;
}
function BoardCell(props: BoardCellProps & DndProps) {
  return props.connectDropTarget(
    <div>
      <Cell>{props.children}</Cell>
    </div>
  );
}

export default DropTarget(Draggables.Piece, cellTarget, collect)(BoardCell)
