import React, { FC, ReactNode, useReducer } from 'react';
import { createContext } from 'react';


const defaultState = {
  auth: false,
}

export const Context = createContext(defaultState);

interface ContextProps {
  children: ReactNode | null;
}

const MainProvider:FC<ContextProps> = ({children}) => {

  const {} = useReducer(reducer, defaultState)

  return (
    <Context.Provider value={}>
      {children}
    </Context.Provider>
  );
};

export default MainProvider;
