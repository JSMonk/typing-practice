import userService from "../services/user-service";
import { Brand } from "../utils/brand";
import { LoggedUser, User } from "./user";

// function opaque type
// https://www.reddit.com/r/typescript/comments/f5wny3/implementing_an_opaque_type_in_typescript/

type Email = Brand<string, 'Email'>;
type Password = Brand<string, 'Password'>;

export type Credentials = {
    email: string;
    password: string;
};
  
export class CredentialsValid {
    public readonly email: Email;
    public readonly password: Password;

    private getCorectEmail(email: Credentials['email']): Email {
        // or some other validates
        for (let u of this.users) {
            if (u.email === email) {
                return email as Email;
            }
        }

        throw new Error("Email not valid");
    }
    private getCorectPassword(password: Credentials['password']): Password {
        // or some other validates
        for (let u of this.users) {
            if (u.password === password) {
                return password as Password;
            }
        }

        throw new Error("Password not valid");
    }

    constructor(
        email: Credentials['email'],
        password: Credentials['password'],
        public readonly users: readonly User[]
    ) {
        this.email = this.getCorectEmail(email);
        this.password = this.getCorectPassword(password);
    }
}

export class CredentialsCorrect {
    static from(users: readonly User[], email: Email, pass: Password) {
        for (let u of users) {
            if (u.email === email && u.password === pass) {
                return new CredentialsCorrect(u);
            }
        }

        throw new Error("Password or user is incorrect");
    }

    private readonly _type = Symbol("CredentialsCorrect");

    protected constructor(
        public readonly user: User
    ) {}
}

export class CredentialsApproved {
    static from(cred: CredentialsCorrect) {
        const User = userService.getConstructorByRole(cred.user.role);
        const user = User.from(cred.user);
        return new CredentialsApproved(user as LoggedUser);
    }

    private readonly _type = Symbol("CredentialsApproved");

    protected constructor(
        public readonly user: LoggedUser
    ) {}
}
