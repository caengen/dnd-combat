import { DraggableType, AppConfig, SpellMode } from "./types";

export enum ActionTypes {
  addPiece = "AddPieceAction",
  movePiece = "MovePieceAction",
  dropPiece = "DropPieceAction",
  updateConfig = "UpdateConfigAction",
  updateSpellMode = "UpdateSpellModeAction"
}

export interface AddPieceAction {
  type: ActionTypes.addPiece;
  payload: {
    id: string;
    type: DraggableType;
    name: string;
    icon: string;
    listIndex: number;
  };
}

export function addPiece(id: string, name: string, icon: string, type: DraggableType, listIndex: number): AddPieceAction {
  return {
    type: ActionTypes.addPiece,
    payload: {
      id,
      name,
      icon,
      type,
      listIndex
    }
  };
}

export interface MovePieceAction {
  type: ActionTypes.movePiece,
  payload: {
    id: string;
  };
}

export function movePiece(id: string): MovePieceAction {
  return {
    type: ActionTypes.movePiece,
    payload: {
      id
    }
  };
}

export interface DropPieceAction {
  type: ActionTypes.dropPiece,
  payload: {
    id: string;
    x: number;
    y: number;
  }
}

export function dropPiece(id: string, x: number, y: number): DropPieceAction {
  return {
    type: ActionTypes.dropPiece,
    payload: {
      id,
      x,
      y
    }
  }
}

export interface UpdateConfigAction {
  type: ActionTypes.updateConfig,
  payload: AppConfig
}

export function updateConfig(newConfig: AppConfig): UpdateConfigAction {
  return {
    type: ActionTypes.updateConfig,
    payload: newConfig
  }
}

export interface UpdateSpellModeAction {
  type: ActionTypes.updateSpellMode,
  payload: SpellMode
}
export function updateSpellMode(spellMode: SpellMode): UpdateSpellModeAction {
  return {
    type: ActionTypes.updateSpellMode,
    payload: spellMode
  }
}

export type Action = AddPieceAction | MovePieceAction | DropPieceAction | UpdateConfigAction | UpdateSpellModeAction;