import { Action, ActionTypes, SpellCoord } from "./actions";
import { Piece, AppConfig, AppMode, SpellMode, Tile, Terrain } from "./types";
import { update } from "lodash/fp";

export interface State {
  pieces: Piece[];
  config: AppConfig;
  spellMode: SpellMode;
  board: Tile[][];
}

export const initialState: State = { 
  pieces: [],
  config: {
    board: {
      width: 8,
      height: 8,
      cellDimension: 1
    },
    mode:  AppMode.Placement
  },
  spellMode: SpellMode.Line,
  board: []
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
          };
      case ActionTypes.updateSpellMode:
        return {
          ...state,
          spellMode: action.payload
        };
      case ActionTypes.updateBoardMode:
        let board = state.board;
        const first = action.payload[0];
        const last = action.payload[action.payload.length - 1];
        board[first.x][first.y] = {
          terrain: Terrain.none,
          spell: "Origin"
        }
        board[last.x][last.y] = {
          terrain: Terrain.none,
          spell: "Target"
        }
        for (let i = 1; i < action.payload.length - 1; i++) {
          board[action.payload[i].x][action.payload[i].y] = {
            terrain: Terrain.none,
            spell: "Target"
          }
        }
        return {
          ...state,
          board
        };
      case ActionTypes.movePiece:
    default:
      return state;
  }
}