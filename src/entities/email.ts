export class Email {
  public static from(notValidEmail: string) {
    if (typeof notValidEmail === "string") {
      return new Email(notValidEmail);
    }

    throw TypeError("Email not a string");
  }

  private readonly _type = Symbol("Email");

  protected constructor(public readonly value: string) {}
}
