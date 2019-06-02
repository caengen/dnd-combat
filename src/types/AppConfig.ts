export enum AppMode {
  Placement = "Placement",
  Terrain = "Terrain",
  Spell = "Spell"
}
export interface AppConfig {
  board: {
    width: number;
    height: number;
    cellDimension: number;
  }
  mode: AppMode;
}