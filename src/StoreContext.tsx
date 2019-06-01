import React, {createContext, useReducer, useEffect} from "react";
import { initialState, reducer, State } from "./reducer";
import { Action } from "./actions";

export const StoreContext = createContext<{state: State, dispatch: React.Dispatch<Action>}>({state: initialState, dispatch: (...v: any) => ({type: ""})});

export function StoreProvider(props: { children?: any }) {
  const reducerState = () => {
    const stored = window.localStorage.getItem("dndCombatState");
    return stored ? JSON.parse(stored) : initialState;
  };
  const [state, dispatch] = useReducer(reducer, reducerState());

  useEffect(() => {
    localStorage.setItem("dndCombatState", JSON.stringify(state));
  }, [state])

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
}