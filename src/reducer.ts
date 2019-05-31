import { PieceAction, PieceActionTypes } from "./actions";
import {Piece } from "./types";
import {update} from "lodash/fp";

export interface State {
  pieces: Piece[];
}

export const initialState: State = { pieces: [] };

export const reducer = (state: State = initialState, action: PieceAction): State => {
  switch (action.type) {
    case PieceActionTypes.addPiece:
      return {
        pieces: [
        ...state.pieces,
        {
          ...action.payload
        }
      ]};
      case PieceActionTypes.dropPiece:
        const index = state.pieces.findIndex(p => p.id === action.payload.id);
        if (index < 0) {
          return state;
        }
        
        return update(`pieces[${index}]`, (piece: Piece) => {
            return {
              ...piece,
              x: action.payload.x,
              y: action.payload.y
            };
          }, state);
      case PieceActionTypes.movePiece:
    default:
      return state;
  }
}