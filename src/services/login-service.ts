import { Email, Password } from "../entities/credentials";
import { LoggedUser } from "../entities/user";
import UserService from "./user-service";

export default class LoginService {
  constructor(private readonly userService: UserService) {}

  public async login(
    email: Email,
    password: Password
  ): Promise<LoggedUser> {
    const users = await this.userService.getAllUsers();

    for (let u of users) {
      if (u.email === email.value && u.password === password.value) {
        const User = this.userService.getConstructorByRole(u.role);
        return User.from(u);
      }
    }

    throw new Error("Password or email is incorrect");
  }
}
