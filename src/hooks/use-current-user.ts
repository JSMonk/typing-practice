import { useContext } from "react";
import { LogedInUser } from "../providers/loged-in-user";
import type { User } from "../entities/user";
import {navigate} from "@reach/router";

export default function useCurrentUser(): User {
  const { state: { user } = { user: null } } = useContext(LogedInUser);
  if (user === null) {
    navigate("/login");
  }
  return user as User;
}

