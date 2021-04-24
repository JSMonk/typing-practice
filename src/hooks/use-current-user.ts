import { useContext } from "react";
import { LogedInUser } from "../providers/loged-in-user";
import { navigate } from "@reach/router";
import { User } from "../entities/user";

export default function useCurrentUser(): User {
  const { state: { user } = { user: null } } = useContext(LogedInUser);

  if (user === null) {
    navigate("/login");
  }

  return user!;
}
