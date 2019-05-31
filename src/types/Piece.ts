import { DraggableType } from ".";

export interface Piece {
  id: string;
  type: DraggableType;
  name: string;
  listIndex: number;
  x?: number;
  y?: number;
}