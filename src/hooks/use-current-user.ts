import { useContext } from "react";
import { LogedInUser } from "../providers/loged-in-user";
import { navigate } from "@reach/router";
import { LoggedUser } from "../entities/user";

export default function useCurrentUser(): LoggedUser {
  const { state: { user } = { user: null } } = useContext(LogedInUser);

  if (user === null) {
    navigate("/login");
  }

  return user!;
}
