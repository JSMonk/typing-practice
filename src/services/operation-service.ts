import UserService from "./user-service";
import { Role } from "../entities/role";
import { Operation } from "../entities/operation";
import type { User } from "../entities/user";
import type { RoleToUser } from "../entities/role-to-user";
import type { OperationToRole } from "../entities/operations-to-role";

export default class OperationService {
  private readonly operationToRole: OperationToRole = {
    [Operation.UPDATE_TO_ADMIN]: Role.ADMIN,
    [Operation.UPDATE_TO_CLIENT]: Role.CLIENT,
    [Operation.UPDATE_TO_MODERATOR]: Role.MODERATOR,
  } as const;

  constructor(private readonly userService: UserService) {}

  runOperationFor(user: User, operation: Operation) {
    const newRole = this.getNewRoleByOperation(operation);
    if (!this.isAvailableOperationForUser(user, operation)) {
      throw new Error(`${operation} is not available for the user`);
    }
    return this.userService.updateUserRole(user, newRole);
  }

  private getNewRoleByOperation<O extends Operation>(
    operation: O
  ): OperationToRole[O] {
    return this.operationToRole[operation];
  }

  private isAvailableOperationForUser<O extends Operation>(
    user: User,
    operation: O
  ): user is RoleToUser[OperationToRole[O]] {
    const availableOperations = this.userService.getAvailableOperations(user);
    return availableOperations.includes(operation);
  }
}
