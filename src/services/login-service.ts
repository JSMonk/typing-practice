import { CredentialsCorrect, CredentialsValid, CredentialsApproved, Credentials } from "../entities/credentials";
import { LoggedUser } from "../entities/user";
import UserService from "./user-service";

export default class LoginService {
  constructor(private readonly userService: UserService) {}

  public async login(
    email: Credentials['email'],
    password: Credentials['password']
  ): Promise<LoggedUser> {
    const users = await this.userService.getAllUsers();
    const validCred = new CredentialsValid(email, password, users);
    const correctCred = CredentialsCorrect.from(
      validCred.users,
      validCred.email,
      validCred.password
    );
    return this.makeLogin(CredentialsApproved.from(correctCred));
  }

  private makeLogin(credentials: CredentialsApproved): LoggedUser {
    return credentials.user;
  }
}
