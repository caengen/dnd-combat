import styled, { css } from "styled-components";

interface StyledBoardProps {
  width: number;
  height: number;
  cellDimension: number;
}
export const StyledBoard = styled.div<StyledBoardProps>`
  display: grid;
  ${p => css`grid-template-columns: repeat(${p.width}, ${p.cellDimension}em);`}
  grid-gap: .25em;
`;