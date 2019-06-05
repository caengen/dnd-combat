import styled, { css } from "styled-components";

interface StyledBoardProps {
  width: number;
  height: number;
  cellDimension: number;
}
export const StyledBoard = styled.div<StyledBoardProps>`
  display: grid;
  ${p => css`grid-template-columns: repeat(${p.width}, ${p.cellDimension}em);`}
  ${p => css`grid-template-rows: repeat(${p.height}, ${p.cellDimension}em);`}
  grid-gap: .25em;
`;

export const BaseLayer = styled.div`
  position: relative;
`;
export const Layer = styled.div`
  position: absolute;
  top: 0;
`;

interface PieceGridCellProps {
  row: number;
  col: number;
}
export const GridCell = styled.div<PieceGridCellProps>`
  grid-column: ${p => p.col};
  grid-row: ${p => p.row};
`;
export const Spell = styled.div`
  background-color: rgba(255, 0, 0, 0.5);
  width: 100%;
  height: 100%;
`;