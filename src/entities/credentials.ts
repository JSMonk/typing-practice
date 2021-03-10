import userService from "../services/user-service";
import { Admin } from "./admin";
import { Moderator } from "./moderator";
import { LoggedUser, User } from "./user";

// function opaque type
// https://www.reddit.com/r/typescript/comments/f5wny3/implementing_an_opaque_type_in_typescript/

export type Credentials = {
    email: string;
    password: string;
};
  
export class CredentialsInput {
    constructor(
        public readonly email: Credentials['email'],
        public readonly password: Credentials['password'],
    ) {}
}

export class CredentialsCorrect {
    static isCorrect(users: readonly User[], credentionals: CredentialsInput) {
        for (let u of users) {
            if (u.email === credentionals.email && u.password === credentionals.password) {
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
    static isApproved(cred: CredentialsCorrect) {
        const User = userService.getConstructorByRole(cred.user.role);
        const user = User.from(cred.user);
        if (Moderator.is(user) || Admin.is(user)) {
            return new CredentialsApproved(user);
        }
        throw new Error("Permission denied");
    }

    private readonly _type = Symbol("CredentialsApproved");

    protected constructor(
        public readonly user: LoggedUser
    ) {}
}
