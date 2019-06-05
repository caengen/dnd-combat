import React, { useContext } from "react";
import { Tile } from "../../types";
import styled, { css } from "styled-components";
import { BoardCell } from ".";
import { StoreContext } from "../../StoreContext";
import { dropPiece } from "../../actions";

interface BoardTileProps {
  tile: Tile;
  onMouseDown?: (x: number, y: number) => void;
  onMouseEnter?: (x: number, y: number) => void;
  onMouseUp?: (x: number, y: number) => void;
}

export function BoardTile(props: BoardTileProps) {
  const { state, dispatch } = useContext(StoreContext)
  const { x, y, spell } = props.tile;
  const handleDrop = (id: string) => dispatch(dropPiece(id, x, y));

  const handleMouseDown = () => props.onMouseDown && props.onMouseDown(x, y);
  const handleMouseEnter = () => props.onMouseEnter && props.onMouseEnter(x, y);
  const handleMouseUp = () => props.onMouseUp && props.onMouseUp(x, y);
  return (
    <CellWrapper 
      key={`X${x}Y${y}`} 
      dimension={state.config.board.cellDimension}
      row={(y + 1)}
      col={(x + 1)}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseUp={handleMouseUp}
    >
      <BoardCell
        x={x} y={y} 
        spell={spell} 
        onDropPiece={handleDrop}
      />
    </CellWrapper>
  );
}

interface CellWrapperProps {
  dimension: number;
  row: number;
  col: number;
}
export const CellWrapper = styled.div<CellWrapperProps>`
  grid-column: ${p => p.col};
  grid-row: ${p => p.row};
  ${p => css`
    width: ${p.dimension}em;
    height: ${p.dimension}em;
  `}
  & > div {
    width: 100%;
    height: 100%;
  }
`;