import { v4 as uuidv4 } from 'uuid';
import React, { FC, ReactNode, Reducer, useReducer } from 'react';
import { createContext } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../api/requests';

type initState = {
  auth: boolean;
  login: string;
};

const defaultState: initState = {
  auth: false,
  login: '',
};

type userDataType = {
  login: string;
  email: string;
  password: string;
};

type valueContextType = {
  state: initState;
  signIn: (login: string) => void;
  signUp: ({ login, email, password }: userDataType) => void;
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
      return { ...state, auth: true, login: action.payload };
    default:
      return state;
  }
};

const MainProvider: FC<ContextProps> = ({ children }) => {
  const [state, dispatch] = useReducer(mainReduser, defaultState);

  const signIn = (login: string) => {
    dispatch({ type: 'login', payload: login });
  };

  const signUp = async ({ login, email, password }: userDataType) => {
    const newUser = {
      id: uuidv4(),
      login: login,
      email: email,
      password: password,
    };

    const response = await axios.post(SERVER_URL + '/users', newUser);

    if (response.status == 200) {
      signIn?.(login);
    }
  };

  const valueContext: valueContextType = {
    state,
    signIn,
    signUp,
  };

  return <Context.Provider value={valueContext}>{children}</Context.Provider>;
};

export default MainProvider;
