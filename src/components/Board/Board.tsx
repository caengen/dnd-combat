import React from "react";
import styled, { css } from "styled-components";
import { BoardCell } from "./BoardCell";
import { Piece } from "..";

interface RenderCellArgs {
  key: string;
  x: number;
  y: number; 
  dimension: number;
  piecePosition: number[];
}
function renderCell(args: RenderCellArgs) {
  const { key, x, y, dimension, piecePosition} = args;
  return (
    <CellWrapper key={key} dimension={dimension}>
      <BoardCell x={x} y={y}>
        {renderPiece(x, y, piecePosition)}
      </BoardCell>
    </CellWrapper>
  )
}

function renderPiece(x: number, y: number, [pX, pY]: number[]) {
  if (x === pX && y === pY) {
    return <Piece />;
  }
}

interface BoardProps {
  cellDimension: number;
  width: number;
  height: number;
}
export function Board(props: BoardProps) {
  const {width, height, cellDimension} = props;
  const squares = []
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      squares.push(renderCell({
        index: `${x}${y}`, 
        x, 
        y, 
        dimension: cellDimension,
        
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
`;