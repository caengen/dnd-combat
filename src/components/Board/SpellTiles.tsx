import React from "react";
import { SpellMode, Coord } from "../../types";
import { GridCell, Spell } from "./Board.styles";
import { plotLine, plotCircle, plotTriangle } from "../../plots";

interface SpellTilesProps {
  mode: SpellMode;
  origin?: Coord,
  target?: Coord;
}
export function SpellTiles(props: SpellTilesProps) {
  const { mode, origin, target } = props;
  if (!origin || !target) {
    return null;
  }

  let coords: Coord[] = [];
  if (mode === SpellMode.Line) {
    coords = plotLine(origin, target);
  }
  else if (mode === SpellMode.Circle) {
    const radius = Math.max(Math.abs(origin.x - target.x), Math.abs(origin.y - target.y));
    coords = plotCircle(origin, radius);
  }
  else if (mode === SpellMode.Cone) {
    const { points, distance } = plotTriangle(origin, target);
    coords = points;
  }

  return (
    <>
      {coords.map(renderGridCell)}
    </>
  );
}

function renderGridCell(coord: Coord) {
  return (
    <GridCell key={`SX${coord.x}Y${coord.y}`} row={coord.y + 1} col={coord.x + 1}>
      <Spell />
    </GridCell>
  );
}