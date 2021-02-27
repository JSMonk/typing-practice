import Services from "../services";
import { Operation } from "../entities/operation";
import { useState, useEffect, useContext } from "react";
import type { User } from "../entities/user";

export default function useUsers() {
  const { userService, operationService } = useContext(Services);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    userService.getAllUsers().then(setUsers);
  }, [userService]);

  const onUserUpdates = async (user: User, operation: Operation) =>
    setUsers(await operationService.runOperationFor(user, operation));

  return [users, onUserUpdates] as [User[], typeof onUserUpdates];
}
