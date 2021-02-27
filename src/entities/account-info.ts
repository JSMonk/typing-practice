export class AccountInfo {
  static is(obj: any): obj is AccountInfo {
    return typeof obj === "object" &&
           obj !== null &&
           typeof obj.id === "string" &&
           typeof obj.name === "string" &&
           typeof obj.email === "string" &&
           typeof obj.password === "string";
  }

  protected constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string
  ) {}
}
