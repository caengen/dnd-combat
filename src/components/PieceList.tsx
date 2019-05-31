import React, { useContext} from "react";
import styled from "styled-components";
import { Piece } from ".";
import uuidv4 from "uuid";
import { DraggableType, Piece as PieceType } from "../types";
import { StoreContext } from "../StoreContext";
import { addPiece } from "../actions";

function renderMonster(monster: PieceType) {
  return (
    <li key={monster.id}>
      <Piece piece={monster} />
    </li>
  );
}
function renderPC(pc: PieceType) {
  return (
    <li key={pc.id}>
      <Piece piece={pc} />
    </li>
  );
}
export function PieceList() {
  const { state, dispatch} = useContext(StoreContext);
  const monsters = state.pieces.filter(p => p.type === DraggableType.Monster);
  const pcs = state.pieces.filter(p => p.type === DraggableType.Player);
  const addMonster = () => {
    dispatch(
      addPiece(uuidv4(), "Monster", DraggableType.Monster, monsters.length)
    )
  };

  return (
    <StyledPieceList>
      <MonsterSection>
        <h1>Monsters</h1>
        <ul>
          {monsters.map(renderMonster)}
        </ul>
        <button onClick={addMonster}>Add monster</button>
      </MonsterSection>
      <PlayerSection>
        <h1>Players</h1>
        <ul>
          {pcs.map(renderPC)}
        </ul>
        <button>Add PC</button>
      </PlayerSection>
    </StyledPieceList>
  );
}

const StyledPieceList = styled.div`
  display: flex;
`;

const Section = styled.section`
  border: 1px solid black;
  padding: 1em;
`;

const MonsterSection = styled(Section)`
`;

const PlayerSection = styled(Section)`
  margin-left: 1em;
`;