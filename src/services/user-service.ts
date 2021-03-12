import { Role } from "../entities/role";
import { Admin } from "../entities/admin";
import { Client } from "../entities/client";
import { Moderator } from "../entities/moderator";
import { isPrivilegedUser, LoggedUser, PrivilegedUser, User } from "../entities/user";
import type { RoleToUser } from "../entities/role-to-user";
import { ConfigOperation } from "../entities/config-operation";
import { AVAILABLE_OPERATIONS } from "../entities/available-operations";

export default class UserService {

  static getConstructorByRole(role: Role) {
    switch (role) {
      case Role.ADMIN:
        return Admin;
      case Role.CLIENT:
        return Client;
      case Role.MODERATOR:
        return Moderator;
    }
  }

  private users: readonly User[] = [];

  async getAllUsers(): Promise<readonly User[]> {
    if (this.users.length !== 0) {
      return this.users;
    }
    const response = await this.fetch();
    this.users = response.default.map((u: any) => {
      const User = UserService.getConstructorByRole(u.role);
      return User.from(u);
    });
    return this.users;
  }

  private fetch(): Promise<any> {
    return import("../mocks/users.json");
  }

  async updateUserRole<R extends Role>(
    user: Readonly<RoleToUser[R]>,
    newRole: R
  ) {
    const User = UserService.getConstructorByRole(newRole);
    this.users = this.users.map((u) => (u.id === user.id ? User.from(u) : u));
    return this.users;
  }

  getAvailableOperations<U1 extends User, U2 extends LoggedUser>(
    user: U1,
    currentUser: U2
  ) {
    return AVAILABLE_OPERATIONS[currentUser.role][user.role] as AVAILABLE_OPERATIONS[U2["role"]][U1["role"]];

    // const configOperation = ConfigOperation.from(user, currentUser);
    // const s =  configOperation.getAvailableOperations();

    // if (Admin.is(currenUser)) {
    //   const Config = ConfigOperationAdmin.from(user, currenUser);
    //   return Config.getAvailableOperations();
    // } else {
    //   const Config = ConfigOperationModerator.from(user, currenUser);
    //   return Config.getAvailableOperations();
    // }
  }
}
