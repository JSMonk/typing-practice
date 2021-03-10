import Services from "../services";
import { useContext } from "react";
import type { LoggedUser, User } from "../entities/user";

export default function useOperations(user: User, currentUser: LoggedUser) {
  const { userService } = useContext(Services);
  return userService.getAvailableOperations(user, currentUser);
}
