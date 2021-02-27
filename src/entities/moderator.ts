import { Role } from "./role";
import { AccountInfo } from "./account-info";
import type { User } from "./user";

export class Moderator extends AccountInfo {
  static of(user: User): Moderator {
    if (user instanceof Moderator) {
      return user;
    }
    throw new TypeError("User is not moderator!");
  }

  static from(obj: object): Moderator {
    if (AccountInfo.is(obj)) {
      return new Moderator(obj.id, obj.name, obj.email, obj.password);
    }
    throw new TypeError("Object is not Admin");
  }

  private readonly _type = Symbol("Moderator");
  public readonly role = Role.MODERATOR;

  protected constructor(
    id: string,
    name: string,
    email: string,
    password: string
  ) {
    super(id, name, email, password);
  }
}
