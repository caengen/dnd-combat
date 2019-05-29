import React from "react";
import styled from "styled-components";
import { Cell } from "../Cell";

function renderCell(index: number, boardHeight: number, dimension: number) {
  return (
    <CellWrapper key={index} boardHeight={boardHeight} flexBasis={dimension}>
      <Cell />
    </CellWrapper>
  )
}

interface BoardProps {
  cellDimension: number;
  width: number;
  height: number;
}
export function Board(props: BoardProps) {
  const {width, height, cellDimension} = props;
  const squares = []
  for (let i = 0; i < width * height; i++) {
    squares.push(renderCell(i, height, cellDimension));
  }

  return (
    <StyledBoard
      width={width * cellDimension}
      height={height * cellDimension}
    >
      {squares}
    </StyledBoard>
  );
}

interface StyledBoardProps {
  width: number;
  height: number;
}
const StyledBoard = styled.div<StyledBoardProps>`
  display: flex;
  width: ${p => p.width}em;
  height: ${p => p.height}em;
  flex-flow: row wrap;
`;

interface CellWrapperProps {
  flexBasis: number;
  boardHeight: number;
}
const CellWrapper = styled.div<CellWrapperProps>`
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: ${p => p.flexBasis}%;
  height: ${p => 512 * (p.flexBasis / 100)}px;
`;