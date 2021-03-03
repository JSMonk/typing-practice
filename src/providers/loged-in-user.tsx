import { createContext, useReducer } from "react";
import type { User } from "../entities/user";
import type { ReactChild } from "react";

export enum LogedInActionType {
  LOG_IN = "log in",
}

type LogedInAction = {
  type: LogedInActionType.LOG_IN;
  payload: User;
};

type LogedInProviderProps = {
  children: ReactChild | ReactChild[];
};

type LogedInUserState = {
  user: User | null;
};

type LogedInProviderContext = {
  state?: LogedInUserState;
  dispatch?: (action: LogedInAction) => void;
};

const initialState = {
  user: null,
};

export const LogedInUser = createContext<LogedInProviderContext>({});

function logedInReducer(state: LogedInUserState, action: LogedInAction) {
  switch (action.type) {
    case LogedInActionType.LOG_IN:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

export function LogedInProvider({ children }: LogedInProviderProps) {
  const [state, dispatch] = useReducer(logedInReducer, initialState);
  return (
    <LogedInUser.Provider value={{ dispatch, state }}>
      {children}
    </LogedInUser.Provider>
  );
}
