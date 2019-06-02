import React, { useContext, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import BoardCell from "./BoardCell";
import { Piece } from "..";
import {Piece as PieceType, AppMode, Coord, SpellMode, TileCoord, Tile} from "../../types";
import { StoreContext } from "../../StoreContext";
import { dropPiece, updateConfig, updateBoard } from "../../actions";
import App from "../../App";
import { plotLine } from "../../plots";
import { BoardInput } from "./BoardInput";
import { StyledBoard, CellWrapper } from "./Board.styles";

interface RenderCellArgs {
  x: number;
  y: number; 
  dimension: number;
  pieces: PieceType[];
  dropPiece: (id: string) => any;
  disableDrag?: boolean;
  tiles: Tile[][];
}
function renderCell(args: RenderCellArgs) {
  const { x, y, dimension, dropPiece, pieces, disableDrag, tiles } = args;
  const spell = tiles[x][y] ? tiles[x][y].spell : undefined
  return (
    <CellWrapper key={`X${x}Y${y}`} dimension={dimension}>
      <BoardCell x={x} y={y} spell={spell} dropPiece={dropPiece}>
        {renderPiece(x, y, pieces, disableDrag)}
      </BoardCell>
    </CellWrapper>
  )
}

function renderPiece(x: number, y: number, pieces: PieceType[], disableDrag?: boolean) {
  for (let piece of pieces) {
    if (x === piece.x && y === piece.y) {
      return (
        <Piece disableDrag={disableDrag} piece={piece} />
      );
    }
  }
}

export function Board() {
  const [ touch, setTouch ] = useState<{
    origin?: Coord,
    target?: Coord
  }>({});
  const { state, dispatch } = useContext(StoreContext);
  const { mode } = state.config;
  const { width, height, cellDimension } = state.config.board;
  const squares = [];

  useEffect(() => {
    if (!touch.origin || !touch.target || mode !== AppMode.Spell) {
      return;
    }

    if (state.spellMode === SpellMode.Line) {
      const coords = plotLine(touch.origin, touch.target);
      dispatch(
        updateBoard(
          coords.map((c, index, arr) => {
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
          })
        )
      );
    }
  }, [touch]);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      squares.push(renderCell({
        x, 
        y, 
        dimension: cellDimension,
        pieces: state.pieces,
        tiles: state.board,
        dropPiece: (id: string) => dispatch(dropPiece(id, x, y)),
        disableDrag: mode !== AppMode.Placement
      }));
    }
  }

  return (
    <div>
      <BoardInput />
      <StyledBoard
        width={width * cellDimension}
        height={height * cellDimension}
        cellDimension={cellDimension}
      >
        {squares}
      </StyledBoard>
    </div>
  );
}