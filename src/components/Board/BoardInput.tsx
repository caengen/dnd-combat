import React from "react";
import { useContext } from "react";
import { updateConfig } from "../../actions";
import { StoreContext } from "../../StoreContext";
import styled from "styled-components";

export function BoardInput() {
  const { state, dispatch } = useContext(StoreContext);
  const { width, height, cellDimension } = state.config.board;
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

  return (
    <StyledBoardInput>
      <InputWrapper>
        Width:
        <input value={width} onChange={handleInput} name="width" type="number" min="8" max="128" />
      </InputWrapper>
      <InputWrapper>
        Height: 
        <input value={height} onChange={handleInput} name="height" type="number" min="8" max="128" />
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