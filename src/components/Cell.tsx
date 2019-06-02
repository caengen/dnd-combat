import React from "react";
import styled, { css } from "styled-components";

interface CellProps {
  children?: any;
  spell?: "Origin" | "Point" | "Target";
}
export function Cell(props: CellProps) {
  return (
    <StyledCell spell={props.spell}>
      {props.children}
    </StyledCell>
  );
}

const StyledCell = styled.div<{spell?: "Origin" | "Point" | "Target"}>`
  border: 1px solid black;
  width: 100%;
  height: 100%;
  & > div { /* draggable div */
    height: inherit;
  }
  ${p => {
    if (p.spell === "Origin") {
      return css`
        background-color: blue;
      `;
    }
    else if (p.spell === "Point") {
      return css`
        background-color: green;
      `;
    }
    else if (p.spell === "Target") {
      return css`
        background-color: red;
      `;
    }
  }}
`;