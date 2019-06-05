import { Action, ActionTypes, DropPieceAction, UpdateBoardSizeType } from "./actions";
import { Piece, AppConfig, AppMode, SpellMode, Tile, Terrain } from "./types";
import { update } from "lodash/fp";

export interface State {
  pieces: Piece[];
  config: AppConfig;
  spellMode: SpellMode;
  board: Tile[][];
}

function initialiseBoard(width: number, height: number) {
  const rows: Tile[][] = [];
  let columns: Tile[] = [];
  for (let y = 0; y < height; y++) {
    columns = [];
    for (let x = 0; x < width; x++) {
      columns.push({
        x,
        y,
        terrain: Terrain.none
      });
    }
    rows.push(columns);
  }

  return rows;
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
  board: initialiseBoard(8, 8)
};

function handleDropPiece(state: State, action: DropPieceAction) {
  const index = state.pieces.findIndex(p => p.id === action.payload.id);
  if (index < 0) {
    return state;
  }

  const {x, y} = state.pieces[index];
  const newState = update(`pieces[${index}]`, (piece: Piece) => {
      return {
        ...piece,
        x: action.payload.x,
        y: action.payload.y
      };
    }, state);
  let board = state.board.slice();

  // remove the pieceIndex from the old tile
  if (x && y) {
    board[y][x] = {
      ...board[y][x],
      pieceIndex: undefined
    }
  }
  // add pieceIndex to the new tile
  board[action.payload.y][action.payload.x] = {
    ...board[action.payload.y][action.payload.x],
    pieceIndex: index
  }
  return {
    ...newState,
    board
  };
}

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
        return handleDropPiece(state, action);
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
      case ActionTypes.setBoard:
        return {
          ...state,
          board: action.payload
        };
      case ActionTypes.updateBoardMode:
        if (action.payload.length === 0) {
          return state;
        }

        let board = state.board.slice();
        const first = action.payload[0];
        const last = action.payload[action.payload.length - 1];
        board[first.y][first.x] = {
          ...state.board[first.y][first.x],
          spell: "Origin"
        }
        board[last.y][last.x] = {
          ...state.board[last.y][last.x],
          spell: "Target"
        }
        for (let i = 1; i < action.payload.length - 1; i++) {
          board[action.payload[i].y][action.payload[i].x] = {
            ...state.board[action.payload[i].y][action.payload[i].x],
            spell: "Target"
          }
        }
        return {
          ...state,
          board
        };
      case ActionTypes.updateBoardSize:
        let newBoard = state.board.slice();
        switch (action.payload) {
          case UpdateBoardSizeType.increaseWidth:
            for (let i = 0; i < newBoard.length; i++) {
              newBoard[i].push({
                x: newBoard[i].length,
                y: i,
                terrain: Terrain.none
              });
            }
            return {
              ...state,
              board: newBoard
            };
          case UpdateBoardSizeType.decreaseWidth:
            for (let i = 0; i < newBoard.length; i++) {
              newBoard[i].pop();
            }
            return {
              ...state,
              board: newBoard
            };
          case UpdateBoardSizeType.increaseHeight:
            const width = newBoard[0].length;
            let row = [];
            for(let i = 0; i < width; i++) {
              row.push({
                x: i,
                y: newBoard.length,
                terrain: Terrain.none
              });
            }
            newBoard.push(row);

            return {
              ...state,
              board: newBoard
            };
          case UpdateBoardSizeType.decreaseHeight:
            newBoard.pop();
            return {
              ...state,
              board: newBoard
            };
          default:
            return state;
        }
      case ActionTypes.movePiece:
    default:
      return state;
  }
}