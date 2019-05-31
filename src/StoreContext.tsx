import React, {createContext, useReducer, useEffect} from "react";
import { initialState, reducer, State } from "./reducer";
import { PieceAction } from "./actions";

export const StoreContext = createContext<{state: State, dispatch: React.Dispatch<PieceAction>}>({state: initialState, dispatch: (...v: any) => ({type: ""})});

export function StoreProvider(props: { children?: any }) {
  let initState = initialState;
  useEffect(() => {
    const storedState = localStorage.getItem("dndCombatState");
    if (storedState) {
      initState = JSON.parse(storedState);
    }
  }, []);
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    localStorage.setItem("dndCombatState", JSON.stringify(state));
  }, [state])

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
}