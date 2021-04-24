import Services from "../services";
import { useContext } from "react";
import type { User } from "../entities/user";

export default function useOperations<U1 extends User>(user: U1, currentUser: U1) {
  const { userService } = useContext(Services);
  return userService.getAvailableOperations(user, currentUser);
}
