'use client';

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { getLocalStorage, setLocalStorage } from '@/utils';

const GLOBAL_CONTEXT = createContext();
const GLOBAL_DISPATCH_CONTEXT = createContext();

const initialState = {
  auth: {
    token: false,
  },
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        auth: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        auth: {},
      };
    default:
      return state;
  }
};

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    if (typeof window === 'undefined') {
      return initialState;
    }
    const localData = localStorage.getItem('appGlobalState');
    return localData ? JSON.parse(localData) : initialState;
  });
  const [loggedIn, setLoginStatus] = useState(false);
  const [auth, setAuth] = useState(getLocalStorage('auth') || {});

  const update = (auth) => {
    if (auth) {
      setAuth(auth);
      setLocalStorage('auth', auth);
    }

    setLoginStatus(true);
  };

  const logout = () => {
    setAuth({});
    setLocalStorage('auth', undefined);
    setLoginStatus(false);
  };

  useEffect(() => {
    localStorage.setItem('appGlobalState', JSON.stringify(state));
  }, [state]);

  return (
    <GLOBAL_CONTEXT.Provider value={state}>
      <GLOBAL_DISPATCH_CONTEXT.Provider value={dispatch}>
        {children}
      </GLOBAL_DISPATCH_CONTEXT.Provider>
    </GLOBAL_CONTEXT.Provider>
  );
};

const useGlobalContext = () => {
  const context = useContext(GLOBAL_CONTEXT);
  if (context === undefined) {
    throw new Error(
      'useGlobalContext must be used within a GlobalContextProvider'
    );
  }
  return context;
};

const useGlobalDispatch = () => {
  const context = useContext(GLOBAL_DISPATCH_CONTEXT);
  if (context === undefined) {
    throw new Error(
      'useGlobalDispatch must be used within a GlobalContextProvider'
    );
  }
  return context;
};

export { useGlobalDispatch, GlobalContextProvider, useGlobalContext };
