import UserService from "./user-service";
import { Role } from "../entities/role";
import { Admin } from "../entities/admin";
import { Client } from "../entities/client";
import { Moderator } from "../entities/moderator";
import { Operation } from "../entities/operation";
import type { User } from "../entities/user";
import type { OperationToRole } from "../entities/operations-to-role";
import type { UserForOperation } from "../utils/user-for-operation";

export default class OperationService {
  private readonly operationToRole: OperationToRole = {
    [Operation.UPDATE_TO_ADMIN]: Role.ADMIN,
    [Operation.UPDATE_TO_CLIENT]: Role.CLIENT,
    [Operation.UPDATE_TO_MODERATOR]: Role.MODERATOR,
  } as const;

  constructor(private readonly userService: UserService) {}

  runOperationFor(user: User, operation: Operation) {
    if (this.isUpdateToModeratorOperation(operation)) {
      return this.runUpdateToModeratorOperation(Admin.Or(Client).check(user));
    }

    if (this.isUpdateToClientOperation(operation)) {
      return this.runUpdateToClientOperation(Moderator.check(user)); }

    return this.runUpdateToAdminOperation(Moderator.check(user));
  }

  isUpdateToAdminOperation(
    operation: Operation
  ): operation is Operation.UPDATE_TO_ADMIN {
    return operation === Operation.UPDATE_TO_ADMIN;
  }

  isUpdateToClientOperation(
    operation: Operation
  ): operation is Operation.UPDATE_TO_CLIENT {
    return operation === Operation.UPDATE_TO_CLIENT;
  }

  isUpdateToModeratorOperation(
    operation: Operation
  ): operation is Operation.UPDATE_TO_MODERATOR {
    return operation === Operation.UPDATE_TO_MODERATOR;
  }

  private runUpdateToAdminOperation(
    user: UserForOperation<Operation.UPDATE_TO_ADMIN>
  ) {
    const newRole = this.getNewRoleByOperation(Operation.UPDATE_TO_ADMIN);
    return this.userService.updateUserRole(user, newRole);
  }

  private runUpdateToClientOperation(
    user: UserForOperation<Operation.UPDATE_TO_CLIENT>
  ) {
    const newRole = this.getNewRoleByOperation(Operation.UPDATE_TO_CLIENT);
    return this.userService.updateUserRole(user, newRole);
  }

  private runUpdateToModeratorOperation(
    user: UserForOperation<Operation.UPDATE_TO_MODERATOR>
  ) {
    const newRole = this.getNewRoleByOperation(Operation.UPDATE_TO_MODERATOR);
    return this.userService.updateUserRole(user, newRole);
  }

  private getNewRoleByOperation<O extends Operation>(operation: O) {
    return this.operationToRole[operation];
  }
}
