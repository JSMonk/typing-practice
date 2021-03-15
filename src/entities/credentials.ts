export type Credentials = {
    email: string;
    password: string;
};

export class Email {
    public static from(notValidEmail: Credentials['email']) {
        if (typeof notValidEmail === 'string') {
            return new Email(notValidEmail);
        }

        throw TypeError('Email not a string');
    }

    private readonly _type = Symbol("Email");

    protected constructor(public readonly value: Credentials['email']) {}
}

export class Password {
    public static from(notValidPassword: Credentials['password']) {
        if (typeof notValidPassword === 'string') {
            return new Password(notValidPassword);
        }

        throw TypeError('Password not a string');
    }

    private readonly _type = Symbol("password");

    protected constructor(public readonly value: Credentials['password']) {}
}
