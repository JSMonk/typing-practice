import Services from "../services";
import { Operation } from "../entities/operation";
import { useState, useEffect, useContext } from "react";
import type { User } from "../entities/user";
import useCurrentUser from "./use-current-user";
import { LogedInActionType, LogedInUser } from "../providers/loged-in-user";

export default function useUsers() {
  const { userService, operationService } = useContext(Services);
  const [users, setUsers] = useState<readonly User[]>([]);

  const currentUser = useCurrentUser();
  const { dispatch } = useContext(LogedInUser);

  useEffect(() => {
    userService.getAllUsers().then(setUsers);
  }, [userService]);

  const onUserUpdates = async (user: User, operation: Operation) => {
    const newUsers = await operationService.runOperationFor(user, operation);
    setUsers(newUsers);

    // Right now we have three sources of truth. The current user is stored in `useUsers` state,
    // in `userService`, and in `LogedInUser`. This is a dirty and hacky way to keep it sync.
    if (currentUser.email === user.email) {
      const updatedUser = newUsers.find(
        (user) => user.email === currentUser.email
      )!;
      dispatch!({ type: LogedInActionType.LOG_IN, payload: updatedUser });
    }
  };

  return [users, onUserUpdates] as [User[], typeof onUserUpdates];
}
