import type { User } from "../entities/user";
import UserService from "./user-service";

export default class LoginService {
  constructor(private readonly userService: UserService) {}

  public async login(email: string, password: string): Promise<User> {
    const users = await this.userService.getAllUsers();

    const user = users.find((user) => user.email === email);

    if (!user) {
      throw new Error(`There is no user with email ${email}`);
    }

    if (user.password !== password) {
      throw new Error("Wrong password");
    }

    return user;
  }
}
