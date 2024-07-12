"use client";
import { createContext, useEffect, useReducer } from "react";

type UserContextType = {
  id: string;
  email: string;
  name: string;
  role: string;
  loginRole: string;
  setUser: (user: any) => void;
};

const actions = {
  SET_USER: "SET_USER",
};

interface State {
  id: string;
  email: string;
  name: string;
  role: string;
  logintRole: string;
}

type Action = {
  type: "SET_USER";
  value: State;
};

const initialState: State = {
  id: "",
  email: "",
  name: "",
  role: "",
  logintRole: "",
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case actions.SET_USER:
      return { ...state, ...action.value };
    default:
      throw new Error("Unknown action");
  }
};

const UserContext = createContext<UserContextType | null>(null);

const UserContextProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    // get state from local storage
    if (typeof window !== "undefined") {
      const storedState = localStorage.getItem("userContextValue");
      return storedState ? JSON.parse(storedState) : initial;
    }
    return initial;
  });

  const setUser = (user: State) => dispatch({ type: "SET_USER", value: user });

  const value: UserContextType = {
    id: state.id,
    email: state.email,
    name: state.name,
    role: state.role,
    loginRole: state.role,
    setUser,
  };

  useEffect(() => {
    // Save to local storage
    localStorage.setItem("userContextValue", JSON.stringify(value));
  }, [value]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserContextProvider };
