import { Terrain } from "./Terrain";
import { Piece } from "./Piece";

export interface Tile {
  terrain: Terrain;
  piece: Piece;
}