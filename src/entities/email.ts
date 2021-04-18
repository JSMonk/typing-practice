import { Credentials } from "./credentials";

export class Email {
  public static from(notValidEmail: Credentials["email"]) {
    if (typeof notValidEmail === "string") {
      return new Email(notValidEmail);
    }

    throw TypeError("Email not a string");
  }

  private readonly _type = Symbol("Email");

  protected constructor(public readonly value: Credentials["email"]) {}
}
