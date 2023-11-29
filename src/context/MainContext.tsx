import { v4 } from 'uuid';
import React, { FC, ReactNode, Reducer, useReducer } from 'react';
import { createContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type initState = {
  auth: boolean;
  user: userDataType | [] | string;
};

const defaultState: initState = {
  auth: false,
  user: [],
};

type userDataType = {
  full_name: string;
  login: string;
  email: string;
  password: string;
};

type valueContextType = {
  state: initState;
  signIn: (userData: userDataType) => void;
  signUp: ({ login, email, password, full_name }: userDataType) => void;
};

export const Context = createContext<Partial<valueContextType>>({});

interface ContextProps {
  children: ReactNode | null;
}

type actionType = {
  type: string;
  payload: string | userDataType;
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
      return { ...state, auth: true, user: action.payload };
    default:
      return state;
  }
};

const MainProvider: FC<ContextProps> = ({ children }) => {
  const [state, dispatch] = useReducer(mainReduser, defaultState);

  const navigate = useNavigate();

  const signIn = (userData: userDataType) => {
    axios
      .get(`http://localhost:3000/users?login=${userData.login}`)
      .then((res) => {
        console.log(res);
        if (res.data) {
          if (res.data[0].password == userData.password) {
            dispatch({ type: 'login', payload: res.data[0] });
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

  const signUp = async ({
    login,
    email,
    password,
    full_name,
  }: userDataType) => {
    const response = await axios.get(
      `http://localhost:3000/users?login=${login}`
    );

    if (response.data.length == 1) {
      alert('Такой пользователь уже существует!');
    } else {
      const newUser = {
        id: v4(),
        full_name: full_name,
        login: login,
        email: email,
        password: password,
        role: 'user',
      };

      axios.post('http://localhost:3000/users', newUser).then((res) => {
        if (res.status == 201)
          signIn?.({
            login,
            email,
            password,
            full_name,
          });
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
