import { v4 } from 'uuid';
import React, { FC, ReactNode, Reducer, useReducer } from 'react';
import { createContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  signIn: (login: string, password: string) => void;
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

  const navigate = useNavigate();

  const signIn = (login: string, password: string) => {
    axios
      .get(`http://localhost:3000/users?login=${login}`)
      .then((res) => {
        console.log(res);
        if (res.data.length == 1) {
          if (res.data[0].password == password) {
            dispatch({ type: 'login', payload: login });
            navigate('/tickets');
          } else {
            alert('Неверный логин или пароль!');
          }
        } else {
          alert('Неверный логин или пароль!');
        }
      })
      .catch((err) => alert(err));
  };

  const signUp = async ({ login, email, password }: userDataType) => {
    const response = await axios.get(
      `http://localhost:3000/users?login=${login}`
    );

    if (response?.data.length < 1) {
      alert('Такой пользователь уже существует!');
    } else {
      const newUser = {
        id: v4(),
        login: login,
        email: email,
        password: password,
        role: 'user',
      };

      axios.post('http://localhost:3000/users', newUser).then((res) => {
        if (res.status == 200) signIn?.(login, password);
      });
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
