import React, { useContext, useState, useEffect } from "react";
import {AppMode, Tile, Terrain, SpellMode, Coord, TileCoord} from "../../types";
import { StoreContext } from "../../StoreContext";
import { setBoard, Action, updateBoard } from "../../actions";
import { BoardInput } from "./BoardInput";
import { StyledBoard } from "./Board.styles";
import { BoardTile } from "./BoardTile";
import { State } from "../../reducer";
import { plotLine, plotCircle, plotTriangle } from "../../plots";

function renderRow(mouseState: MouseState, setMouseState: React.Dispatch<React.SetStateAction<MouseState>>) {
  return (row: Tile[]) =>{
    return row.map(renderTile(mouseState, setMouseState));
  }
}

function renderTile(mouseState: MouseState, setMouseState: React.Dispatch<React.SetStateAction<MouseState>>) {
  return (tile: Tile) => {
    return (
      <BoardTile
        key={`X${tile.x}Y${tile.y}`}
        tile={tile}
        onMouseDown={handleMouseDown(setMouseState)}
        onMouseEnter={handleMouseEnter(setMouseState, mouseState)}
        onMouseUp={handleMouseUp(setMouseState)}
      />
    );
  }
}

function handleMouseDown(setMouseState: React.Dispatch<React.SetStateAction<MouseState>>) {
  return (x: number, y: number) => {
    setMouseState({
      origin: {x, y},
      target: {x, y}
    });
  }
}
function handleMouseEnter(setMouseState: React.Dispatch<React.SetStateAction<MouseState>>,  mouseState: MouseState) {
  return (x: number, y: number) => {
    setMouseState({
      ...mouseState,
      target: {x, y}
    });
  }
}

function handleMouseUp(setMouseState: React.Dispatch<React.SetStateAction<MouseState>>) {
  return (x: number, y: number) => {
    setMouseState({
      origin: undefined,
      target: undefined
    });
  }
}

function getSpellCoords(state: State, mouseState: MouseState) {
  if (!mouseState.origin || !mouseState.target) {
    return;
  }
  let coords: Coord[] = [];
  if (state.spellMode === SpellMode.Line) {
    coords = plotLine(mouseState.origin, mouseState.target);
  }
  else if (state.spellMode === SpellMode.Circle) {
    const radius = Math.max(Math.abs(mouseState.origin.x - mouseState.target.x), Math.abs(mouseState.origin.y - mouseState.target.y));
    coords = plotCircle(mouseState.origin, radius);
  }
  else if (state.spellMode === SpellMode.Cone) {
    const { points, distance } = plotTriangle(mouseState.origin, mouseState.target);
    coords = points;
  }
  return coords.map((c, index, arr) => {
    let spell = "Point";
    if (index === 0) {
      spell = "Origin";
    } else if (index === arr.length - 1) {
      spell = "Target";
    }
    return {
      x: c.x,
      y: c.y,
      spell
    } as TileCoord;
  });
}

interface MouseState {
  origin?: Coord,
  target?: Coord
}

export function Board() {
  const [ mouseState, setMouseState ] = useState<MouseState>({ origin: undefined, target: undefined });
  const { state, dispatch } = useContext(StoreContext);
  const { mode } = state.config;
  const { cellDimension } = state.config.board;

  let boardToDraw = state.board.slice();

  if (mode === AppMode.Spell && mouseState.origin && mouseState.target) {
    const spellCoords = getSpellCoords(state, mouseState);
    if (spellCoords) {
      for (const sc of spellCoords) {
        boardToDraw[sc.y][sc.x].spell = sc.spell;
      }
    }
  }

  return (
    <div>
      <BoardInput />
      <StyledBoard
        width={state.board[0].length * cellDimension}
        height={state.board.length * cellDimension}
        cellDimension={cellDimension}
      >
        {boardToDraw.map(renderRow(mouseState, setMouseState))}
      </StyledBoard>
    </div>
  );
}