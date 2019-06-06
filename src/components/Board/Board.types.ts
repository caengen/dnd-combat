import { Coord } from "../../types";

export interface SpellState {
  active: boolean;
  origin?: Coord;
  target?: Coord;
}