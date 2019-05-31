import React, { useContext } from "react";
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
    <CellWrapper key={`${x}${y}`} dimension={dimension}>
      <BoardCell x={x} y={y} dropPiece={dropPiece}>
        {renderPiece(x, y, pieces)}
      </BoardCell>
    </CellWrapper>
  )
}

function renderPiece(x: number, y: number, pieces: PieceType[]) {
  for (let piece of pieces) {
    if (x === piece.x && y === piece.y) {
      return <Piece piece={piece} />;
    }
  }
}

interface BoardProps {
  cellDimension: number;
  width: number;
  height: number;
}
export function Board(props: BoardProps) {
  const { state, dispatch } = useContext(StoreContext);
  const {width, height, cellDimension} = props;
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

  return (
    <StyledBoard
      width={width * cellDimension}
      height={height * cellDimension}
      cellDimension={cellDimension}
    >
      {squares}
    </StyledBoard>
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