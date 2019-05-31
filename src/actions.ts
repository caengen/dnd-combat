import { DraggableType } from "./types";

export enum PieceActionTypes {
  addPiece = "AddPieceAction",
  movePiece = "MovePieceAction",
  dropPiece = "DropPieceAction",
}

export interface AddPieceAction {
  type: PieceActionTypes.addPiece;
  payload: {
    id: string;
    type: DraggableType;
    name: string;
    listIndex: number;
  };
}

export function addPiece(id: string, name: string, type: DraggableType, listIndex: number): AddPieceAction {
  return {
    type: PieceActionTypes.addPiece,
    payload: {
      id,
      name,
      type,
      listIndex
    }
  };
}

export interface MovePieceAction {
  type: PieceActionTypes.movePiece,
  payload: {
    id: string;
  };
}

export function movePiece(id: string): MovePieceAction {
  return {
    type: PieceActionTypes.movePiece,
    payload: {
      id
    }
  };
}

export interface DropPieceAction {
  type: PieceActionTypes.dropPiece,
  payload: {
    id: string;
    x: number;
    y: number;
  }
}

export function dropPiece(id: string, x: number, y: number): DropPieceAction {
  return {
    type: PieceActionTypes.dropPiece,
    payload: {
      id,
      x,
      y
    }
  }
}

export type PieceAction = AddPieceAction | MovePieceAction | DropPieceAction;