import React, { createContext, useContext, useReducer } from "react";
import { MinimalPatient, Patient } from "../types";

import { Action } from "./reducer";

export type State = {
  patientList: { [id: string]: MinimalPatient };
  patientDetails: { [id: string]: Patient };
};

const initialState: State = {
  patientList: {},
  patientDetails: {}
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
