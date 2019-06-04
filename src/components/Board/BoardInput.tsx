import React from "react";
import { useContext } from "react";
import { updateConfig, updateBoardSize, UpdateBoardSizeType } from "../../actions";
import { StoreContext } from "../../StoreContext";
import styled from "styled-components";

export function BoardInput() {
  const { state, dispatch } = useContext(StoreContext);
  const { cellDimension } = state.config.board;
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateConfig(
      {
        ...state.config,
        board: {
          ...state.config.board,
          [e.target.name]: e.target.value
        }
      }
    ));
  }
  const handleChangeWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) > state.board[0].length) {
      dispatch(updateBoardSize(UpdateBoardSizeType.increaseWidth));
    } else {
      dispatch(updateBoardSize(UpdateBoardSizeType.decreaseWidth));
    }
  };
  const handleChangeHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) > state.board.length) {
      dispatch(updateBoardSize(UpdateBoardSizeType.increaseHeight));
    } else {
      dispatch(updateBoardSize(UpdateBoardSizeType.decreaseHeight));
    }
  };

  return (
    <StyledBoardInput>
      <InputWrapper>
        Width:
        <input value={state.board[0].length} onChange={handleChangeWidth} name="width" type="number" min="8" max="128" />
      </InputWrapper>
      <InputWrapper>
        Height: 
        <input value={state.board.length} onChange={handleChangeHeight} name="height" type="number" min="8" max="128" />
      </InputWrapper>
      <InputWrapper>
        Cell dimension:
        <input value={cellDimension} onChange={handleInput} name="cellDimension" type="number" min="1" max="8" />
      </InputWrapper>
    </StyledBoardInput>
  );
}

const StyledBoardInput = styled.div`
  display: flex;
`;

const InputWrapper = styled.div`
  margin: 0 .5em;
  font-size: .5em;
    display: flex;
    align-items: center;
    input {
      margin-left: .5em;
    }
`;