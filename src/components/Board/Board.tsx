import React, { useContext } from "react";
import styled, { css } from "styled-components";
import BoardCell from "./BoardCell";
import { Piece } from "..";
import {Piece as PieceType, AppMode} from "../../types";
import { StoreContext } from "../../StoreContext";
import { dropPiece, updateConfig } from "../../actions";

interface RenderCellArgs {
  x: number;
  y: number; 
  dimension: number;
  pieces: PieceType[];
  dropPiece: (id: string) => any;
  disableDrag?: boolean;
}
function renderCell(args: RenderCellArgs) {
  const { x, y, dimension, dropPiece, pieces, disableDrag} = args;
  return (
    <CellWrapper key={`X${x}Y${y}`} dimension={dimension}>
      <BoardCell x={x} y={y} dropPiece={dropPiece}>
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
  const { state, dispatch } = useContext(StoreContext);
  const { board, mode } = state.config;
  const { width, height, cellDimension } = board;
  const squares = []

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      squares.push(renderCell({
        x, 
        y, 
        dimension: cellDimension,
        pieces: state.pieces,
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

export function BoardInput() {
  const { state, dispatch } = useContext(StoreContext);
  const { width, height, cellDimension } = state.config.board;
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateConfig(
      {
        ...state.config,
        board: {
          ...state.config.board,
          [e.target.name]: e.target.value
        }
      }
    ));
  }

  return (
    <StyledBoardInput>
      <InputWrapper>
        Width:
        <input value={width} onChange={handleInput} name="width" type="number" min="8" max="128" />
      </InputWrapper>
      <InputWrapper>
        Height: 
        <input value={height} onChange={handleInput} name="height" type="number" min="8" max="128" />
      </InputWrapper>
      <InputWrapper>
        Cell dimension:
        <input value={cellDimension} onChange={handleInput} name="cellDimension" type="number" min="1" max="8" />
      </InputWrapper>
    </StyledBoardInput>
  );
}

const StyledBoardInput = styled.div`
  display: flex;
`;

const InputWrapper = styled.div`
  margin: 0 .5em;
  font-size: .5em;
    display: flex;
    align-items: center;
    input {
      margin-left: .5em;
    }
`;

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