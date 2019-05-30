import React, {useState} from "react";
import styled from "styled-components";
import { Piece } from ".";
import uuidv4 from "uuid";
import { Draggables } from "../types";

interface Monster {
  id: string;
  kind: string;
}
function renderMonster(monsters: Monster) {
  return (
    <li>
      <Piece />
    </li>
  );
}
export function PieceList() {
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [players, setPlayers] = useState([]);
  
  const addMonster = () => {
    setMonsters([
      ...monsters,
      { id: uuidv4(), kind: Draggables.Monster }
    ]);
  }

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
          {players}
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