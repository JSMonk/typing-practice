import { Client } from "../entities/client";
import { User } from "../entities/user";
import { Credentials } from "../hooks/use-login";
import UserService from "./user-service";

export default class LoginService {
  private users: readonly User[] = [];

  constructor(private readonly userService: UserService) {}

  public async login(email: Credentials['email'], password: Credentials['password']): Promise<any> {

    this.users = await this.userService.getAllUsers();
    // get approvedCredentionals or throw Error
    for (let u of this.users) {
      if (u.email === email) {
        if (u.password === password) {
          const User = this.userService.getConstructorByRole(u.role);

          if (User.name === Client.name) {
            throw new Error("Permission denied");
          }

          return User.from(u);
        }

        break;
      }
    }

    throw new Error("Password or user is incorrect");
  }
}
