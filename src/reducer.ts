import { Action, ActionTypes } from "./actions";
import { Piece, AppConfig } from "./types";
import { update } from "lodash/fp";

export interface State {
  pieces: Piece[];
  config: AppConfig;
}

export const initialState: State = { 
  pieces: [],
  config: {
    board: {
      width: 8,
      height: 8,
      cellDimension: 1
    }
  }
};

export const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ActionTypes.addPiece:
      return {
        ...state,
        pieces: [
        ...state.pieces,
        {
          ...action.payload
        }
      ]};
      case ActionTypes.dropPiece:
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
      case ActionTypes.updateConfig:
          return {
            ...state,
            config: action.payload
          }
      case ActionTypes.movePiece:
    default:
      return state;
  }
}