import React from "react";
import styled from "styled-components";

interface CellProps {
}
export function Cell(props: CellProps) {

  return (
    <StyledCell />
  );
}

const StyledCell = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 100%;
`;