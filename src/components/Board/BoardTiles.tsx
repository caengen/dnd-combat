import React, { memo } from "react";
import { SpellState } from "./Board.types";
import { Coord, Tile } from "../../types";
import { BoardTile } from "./BoardTile";

interface BoardTilesProps {
 setOrigin: (coord?: Coord) => void;
 setTarget: (coord?: Coord) => void;
 setActive: (active: boolean) => void;
 board: Tile[][];
}
export const BoardTiles = memo<BoardTilesProps>(props => {
  const { board, setOrigin, setTarget, setActive } = props;
  const tiles = [];
  const onMouseDown = (x: number, y: number) => {
    setActive(true);
    setOrigin({x, y});
  };
  const onMouseEnter = (x: number, y: number) => {
    setTarget({x, y});
  };
  const onMouseUp = () => {
    setActive(false);
    setTarget(undefined);
  };
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      tiles.push(
        <BoardTile
          key={`X${board[row][col].x}Y${board[row][col].y}`}
          tile={board[row][col]}
          onMouseDown={() => onMouseDown(board[row][col].x, board[row][col].y)}
          onMouseEnter={() => onMouseEnter(board[row][col].x, board[row][col].y)}
          onMouseUp={onMouseUp}
        />
      );
    }
  }
  return <>
    {tiles}
  </>;
});
