import React from "react";
import styled from "styled-components";

interface CellProps {
  children?: any;
}
export function Cell(props: CellProps) {
  return (
    <StyledCell>
      {props.children}
    </StyledCell>
  );
}

const StyledCell = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 100%;
  & > div { /* draggable div */
    height: inherit;
  }
`;