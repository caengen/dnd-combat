import React, { useContext} from "react";
import styled from "styled-components";
import { Piece, PieceInfo } from ".";
import uuidv4 from "uuid";
import { DraggableType, Piece as PieceType } from "../types";
import { StoreContext } from "../StoreContext";
import { addPiece } from "../actions";

function renderMonster(monster: PieceType) {
  return (
    <Li key={monster.id}>
      <Piece size={2} piece={monster} />
      <PieceInfo piece={monster} />
    </Li>
  );
}
function renderPC(pc: PieceType) {
  return (
    <Li key={pc.id}>
      <Piece size={2} piece={pc} />
      <PieceInfo piece={pc} />
    </Li>
  );
}
export function PieceList() {
  const { state, dispatch} = useContext(StoreContext);
  const monsters = state.pieces.filter(p => p.type === DraggableType.Monster);
  const pcs = state.pieces.filter(p => p.type === DraggableType.Player);
  const addMonster = () => {
    const name = monsters.length !== 0 ? `Monster ${monsters.length}` : "Monster";
    dispatch(
      addPiece(uuidv4(), name, DraggableType.Monster, monsters.length)
    )
  };

  return (
    <StyledPieceList>
      <MonsterSection>
        <h1>Monsters</h1>
        <Ul>
          {monsters.map(renderMonster)}
        </Ul>
        <button onClick={addMonster}>Add monster</button>
      </MonsterSection>
      <PlayerSection>
        <h1>Players</h1>
        <Ul>
          {pcs.map(renderPC)}
        </Ul>
        <button>Add PC</button>
      </PlayerSection>
    </StyledPieceList>
  );
}

const StyledPieceList = styled.div`
  display: flex;
`;

const Ul = styled.ul`
  padding: 0;
`;

const Li = styled.li`
  list-style: none;
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