import { Credentials } from "./credentials";

export class Password {
  public static from(notValidPassword: Credentials["password"]) {
    if (typeof notValidPassword === "string") {
      return new Password(notValidPassword);
    }

    throw TypeError("Password not a string");
  }

  private readonly _type = Symbol("password");

  protected constructor(public readonly value: Credentials["password"]) {}
}
