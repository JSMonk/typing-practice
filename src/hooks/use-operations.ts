import Services from "../services";
import { useContext } from "react";
import type { LoggedUser, User } from "../entities/user";

export default function useOperations<U1 extends User, U2 extends LoggedUser>(user: U1, currentUser: U2) {
  const { userService } = useContext(Services);
  return userService.getAvailableOperations(user, currentUser);
}
