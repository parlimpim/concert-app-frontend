"use client";
import { createContext, useEffect, useReducer } from "react";

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

type UserRoleKey = keyof typeof UserRole;
export type UserRoleType = (typeof UserRole)[UserRoleKey];

export type UserType = {
  id: string;
  email: string;
  name: string;
  role: UserRoleType | "";
  loginRole: UserRoleType | "";
};

type UserContextType = {
  setUser: (user: any) => void;
} & UserType;

const actions = {
  SET_USER: "SET_USER",
};

interface State {
  id: string;
  email: string;
  name: string;
  role: UserRole | "";
  loginRole: UserRole | "";
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
  loginRole: "",
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
  const [state, dispatch] = useReducer(reducer, initialState);

  const setUser = (user: State) => dispatch({ type: "SET_USER", value: user });

  const value: UserContextType = {
    id: state.id,
    email: state.email,
    name: state.name,
    role: state.role,
    loginRole: state.loginRole,
    setUser,
  };

  useEffect(() => {
    const storedState = localStorage.getItem("userContextValue");
    if (storedState) {
      setUser(JSON.parse(storedState));
    }
  }, []);

  useEffect(() => {
    if (state !== initialState) {
      localStorage.setItem("userContextValue", JSON.stringify(state));
    }
  }, [state]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserContextProvider };
