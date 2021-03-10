import { CredentialsCorrect, CredentialsInput, CredentialsApproved } from "../entities/credentials";
import { LoggedUser } from "../entities/user";
import UserService from "./user-service";

export default class LoginService {
  constructor(private readonly userService: UserService) {}

  public async login(cred: CredentialsInput): Promise<LoggedUser> {
    const users = await this.userService.getAllUsers();
    const correctCred = CredentialsCorrect.isCorrect(users, cred);
    return this.makeLogin(CredentialsApproved.isApproved(correctCred));
  }

  private makeLogin(credentials: CredentialsApproved): LoggedUser {
    return credentials.user;
  }
}
