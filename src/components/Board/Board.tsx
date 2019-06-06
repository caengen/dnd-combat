import React, { useContext, useState } from "react";
import {AppMode, Coord, Piece as IPiece} from "../../types";
import { StoreContext } from "../../StoreContext";
import { BoardInput } from "./BoardInput";
import { StyledBoard, GridCell } from "./Board.styles";
import Piece from "../Piece";
import debounce from "lodash/debounce";
import { SpellTiles } from "./SpellTiles";
import { BoardTiles } from "./BoardTiles";

function renderPiece(disableDrag: boolean){
  return (piece: IPiece) => {
    return (piece.x !== undefined && piece.y !== undefined) ? (
      <GridCell 
        key={`PX${piece.x}Y${piece.y}`}
        row={(piece.y + 1)} 
        col={(piece.x + 1)}
      >
        <Piece
          key={piece.id}
          piece={piece}
          disabledDrag={disableDrag}
        />
      </GridCell>
    ) : null;
  }
}
export function Board() {
  const { state } = useContext(StoreContext);
  const { mode } = state.config;
  const { cellDimension } = state.config.board;
  const [origin, setOrigin] = useState<Coord | undefined>(undefined);
  const [target, setTarget] = useState<Coord | undefined>(undefined);
  const [active, setActive] = useState<boolean>(false);
  
  return (
    <div>
      <BoardInput />
      <div>
        <StyledBoard
          width={state.board[0].length * cellDimension}
          height={state.board.length * cellDimension}
          cellDimension={cellDimension}
        >
          <BoardTiles 
            board={state.board}
            setOrigin={setOrigin}
            setTarget={debounce(setTarget, 250)}
            setActive={setActive}
          />
          {state.pieces.map(renderPiece(state.config.mode !== AppMode.Placement))}
          {(mode === AppMode.Spell && active) && <SpellTiles
            mode={state.spellMode}
            origin={origin}
            target={target}
          />}
        </StyledBoard>
      </div>
    </div>
  );
}