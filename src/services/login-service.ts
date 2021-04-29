import { User } from "../entities/user";
import UserService from "./user-service";
import { Email } from "../entities/email";
import { Password } from "../entities/password";

export default class LoginService {
  constructor(private readonly userService: UserService) {}

  public async login(email: Email, password: Password): Promise<User> {
    const users = await this.userService.getAllUsers();
    return this.userService.getUserByPassAndEmail(users, email, password);
  }
}
