import React, { useContext, useState } from "react";
import {AppMode, Tile, Coord, Piece as IPiece} from "../../types";
import { StoreContext } from "../../StoreContext";
import { BoardInput } from "./BoardInput";
import { StyledBoard, GridCell } from "./Board.styles";
import { BoardTile } from "./BoardTile";
import Piece from "../Piece";
import debounce from "lodash/debounce";
import { SpellTiles } from "./SpellTiles";

function renderRow(spellState: SpellState, setSpellState: React.Dispatch<any>) {
  return (row: Tile[]) =>{
    return row.map(renderTile(spellState, setSpellState));
  }
}

function renderTile(spellState: SpellState, setSpellState: React.Dispatch<any>) {
  return (tile: Tile) => {
    const coord = {x: tile.x, y: tile.y};
    return (
      <BoardTile
        key={`X${tile.x}Y${tile.y}`}
        tile={tile}
        onMouseDown={() => setSpellOrigin(coord, spellState, setSpellState)}
        onMouseEnter={() => setSpellTarget(coord, spellState, setSpellState)}
        onMouseUp={() => resetSpellState(spellState, setSpellState)}
      />
    );
  }
}

function renderPiece(disableDrag: boolean){
  return (piece: IPiece) => {
    return (piece.x !== undefined && piece.y !== undefined) ? (
      <GridCell 
        key={`PX${piece.x}Y${piece.y}`}
        row={(piece.y + 1)} 
        col={(piece.x + 1)}
      >
        <Piece
          key={piece.id}
          piece={piece}
          disabledDrag={disableDrag}
        />
      </GridCell>
    ) : null;
  }
}

function setSpellOrigin(coord: Coord, spellState: SpellState, setSpellState: React.Dispatch<any>) {
  if (spellState.active) {
    return;
  }

  setSpellState({
    ...spellState,
    active: true,
    origin: coord
  });
}
function setSpellTarget(coord: Coord, spellState: SpellState, setSpellState: React.Dispatch<any>) {
  if (!spellState.active) {
    return;
  }

  setSpellState({
    ...spellState,
    target: coord
  });
}
function resetSpellState(spellState: SpellState, setSpellState: React.Dispatch<any>) {
  if (!spellState.active) {
    return;
  }

  setSpellState({
    active: false,
    origin: undefined,
    target: undefined
  });
}

interface SpellState {
  active: boolean;
  origin?: Coord;
  target?: Coord;
}
export function Board() {
  const { state } = useContext(StoreContext);
  const { mode } = state.config;
  const { cellDimension } = state.config.board;
  const [spellState, setSpellState] = useState<SpellState>({ active: false });
  
  return (
    <div>
      <BoardInput />
      <div>
        <StyledBoard
          width={state.board[0].length * cellDimension}
          height={state.board.length * cellDimension}
          cellDimension={cellDimension}
        >
          {state.board.map(renderRow(spellState, debounce(setSpellState, 250)))}
          {state.pieces.map(renderPiece(state.config.mode !== AppMode.Placement))}
          {(mode === AppMode.Spell) && <SpellTiles
            mode={state.spellMode}
            origin={spellState.origin}
            target={spellState.target}
          />}
        </StyledBoard>
      </div>
    </div>
  );
}