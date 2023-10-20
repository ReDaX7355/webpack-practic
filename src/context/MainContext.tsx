import React, { FC, ReactNode, Reducer, useReducer } from 'react';
import { createContext } from 'react';

type initState = {
  auth: boolean;
};

const defaultState: initState = {
  auth: false,
};

type valueContextType = {
  state: initState;
  signIn: (login: string) => void;
};

export const Context = createContext<Partial<valueContextType>>({});

interface ContextProps {
  children: ReactNode | null;
}

type actionType = {
  type: string;
  payload: string;
};

// type reduserTypes = {
//   state: typeof defaultState,
//   action: actionType
// }

const mainReduser: Reducer<initState, actionType> = (
  state,
  action
): initState => {
  switch (action.type) {
    case 'login':
      return { ...state, auth: true };
    default:
      return state;
  }
};

const MainProvider: FC<ContextProps> = ({ children }) => {
  const [state, dispatch] = useReducer(mainReduser, defaultState);

  const signIn = (login: string) => {
    dispatch({ type: 'login', payload: login });
  };

  const valueContext: valueContextType = {
    state,
    signIn,
  };

  return <Context.Provider value={valueContext}>{children}</Context.Provider>;
};

export default MainProvider;
