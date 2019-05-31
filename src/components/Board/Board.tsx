import React, { useContext, useState } from "react";
import styled, { css } from "styled-components";
import BoardCell from "./BoardCell";
import { Piece } from "..";
import {Piece as PieceType} from "../../types";
import { StoreContext } from "../../StoreContext";
import { dropPiece } from "../../actions";

interface RenderCellArgs {
  x: number;
  y: number; 
  dimension: number;
  pieces: PieceType[];
  dropPiece: (id: string) => any;
}
function renderCell(args: RenderCellArgs) {
  const { x, y, dimension, dropPiece, pieces} = args;
  return (
    <CellWrapper key={`X${x}Y${y}`} dimension={dimension}>
      <BoardCell x={x} y={y} dropPiece={dropPiece}>
        {renderPiece(x, y, pieces)}
      </BoardCell>
    </CellWrapper>
  )
}

function renderPiece(x: number, y: number, pieces: PieceType[]) {
  for (let piece of pieces) {
    if (x === piece.x && y === piece.y) {
      return (
        <Piece piece={piece} />
      );
    }
  }
}

export function Board() {
  const { state, dispatch } = useContext(StoreContext);
  const [boardConfig, setBoardConfig] = useState({width: 8, height: 8, cellDimension: 1})
  const {width, height, cellDimension} = boardConfig;
  const squares = []
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      squares.push(renderCell({
        x, 
        y, 
        dimension: cellDimension,
        pieces: state.pieces,
        dropPiece: (id: string) => dispatch(dropPiece(id, x, y))
      }));
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardConfig({
      ...boardConfig,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      <div>
        Width:
        <input value={width} onChange={handleInput} name="width" type="number" min="8" max="128" />
      </div>
      <div>
        Height: 
        <input value={height} onChange={handleInput} name="height" type="number" min="8" max="128" />
      </div>
      <div>
        Cell dimension:
        <input value={cellDimension} onChange={handleInput} name="cellDimension" type="number" min="1" max="8" />
      </div>
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

interface StyledBoardProps {
  width: number;
  height: number;
  cellDimension: number;
}
const StyledBoard = styled.div<StyledBoardProps>`
  display: grid;
  ${p => css`grid-template-columns: repeat(${p.width}, ${p.cellDimension}em);`}
  grid-gap: .25em;
`;

interface CellWrapperProps {
  dimension: number;
}
const CellWrapper = styled.div<CellWrapperProps>`
  ${p => css`
    width: ${p.dimension}em;
    height: ${p.dimension}em;
  `}
  & > div {
    width: 100%;
    height: 100%;
  }
`;