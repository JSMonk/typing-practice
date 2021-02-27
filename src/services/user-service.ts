import { Role } from "../entities/role";
import { Operation } from "../entities/operation";
import type { User } from "../entities/user";
import type { RoleToUser } from "../entities/role-to-user";

export default class UserService {
  private users: User[] = [];

  async getAllUsers(): Promise<User[]> {
    if (this.users.length !== 0) {
      return this.users;
    }
    const response = await this.fetch();
    this.users = response.default;
    return this.users;
  }

  private fetch(): Promise<any> {
    return import("../mocks/users.json");
  }

  getAvailableOperations(user: User): Operation[] {
    switch (user.role) {
      case Role.CLIENT:
      case Role.ADMIN:
        return [Operation.UPDATE_TO_MODERATOR];
      case Role.MODERATOR:
        return [Operation.UPDATE_TO_CLIENT, Operation.UPDATE_TO_ADMIN];
    }
  }

  async updateUserRole<R extends Role>(user: RoleToUser[R], newRole: R) {
    this.users = this.users.map((u) =>
      u.id === user.id ? { ...user, role: newRole } : u
    );
    return this.users;
  }
}
