import React from "react";
import { Piece } from "../types";
import styled from "styled-components";

export function PieceInfo(props: {piece: Piece}) { 
  const placed = `X: ${props.piece.x}, Y: ${props.piece.y}`;
  return (
    <StyledPieceInfo>
      <Name>{props.piece.name}</Name>
      <InfoRow>Type: {props.piece.type}</InfoRow>
      <InfoRow>{props.piece.x !== undefined ? placed : "Not placed"}</InfoRow>
    </StyledPieceInfo>
  );
}

const StyledPieceInfo = styled.section`
  padding: 0 1em;
`;

const Name = styled.h1`
  font-size: 1em;
  margin: 0;
  text-align: left;
`;

const InfoRow = styled.p`
  font-size: .75em;
  text-align: left;
  margin: 0;
`;