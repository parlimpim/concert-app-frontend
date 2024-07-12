"use client";
import { createContext, useReducer } from "react";
import { FaHome, FaHistory } from "react-icons/fa";

export enum Menus {
  HOME = "Home",
  HISTORY = "History",
}

export const MenuDetails: Record<Menus, { link: string; icon: any }> = {
  [Menus.HOME]: { link: "/home", icon: <FaHome /> },
  [Menus.HISTORY]: { link: "history", icon: <FaHistory /> },
};

type MenusKey = keyof typeof Menus;
export type MenusType = (typeof Menus)[MenusKey];

type SidebarContextType = {
  selectedMenu: MenusType;
  setSelectedMenu: (selectedMenu: MenusType) => void;
};

const actions = {
  SET_SELECTED_MENU: "SET_SELECTED_MENU",
};

interface State {
  selectedMenu: MenusType;
}
type Action = {
  type: "SET_SELECTED_MENU";
  value: State["selectedMenu"];
};

const initialState: State = {
  selectedMenu: Menus.HOME,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actions.SET_SELECTED_MENU:
      return { ...state, selectedMenu: action.value };
    default:
      throw new Error("Unknown action");
  }
};

const SidebarContext = createContext<SidebarContextType | null>(null);

const SidebarContextProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setSelectedMenu = (selectedMenu: MenusType) => {
    dispatch({ type: "SET_SELECTED_MENU", value: selectedMenu });
  };

  const value: SidebarContextType = {
    selectedMenu: state.selectedMenu,
    setSelectedMenu,
  };

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

export { SidebarContext, SidebarContextProvider };
