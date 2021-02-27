import Services from "../services";
import { useContext } from "react";
import type { User } from "../entities/user";

export default function useOperations(user: User) {
  const { userService } = useContext(Services);
  return userService.getAvailableOperations(user);
}
