import { Terrain } from "./Terrain";
import { Piece } from "./Piece";

export interface Tile {
  x: number;
  y: number;
  terrain: Terrain;
  pieceIndex?: number;
  spell?: "Origin" | "Point" | "Target"
}