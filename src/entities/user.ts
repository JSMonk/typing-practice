import { Brand } from "../utils/brand";
import { Admin } from "./admin";
import type { Client } from "./client";
import { Moderator } from "./moderator";

export type User = Admin | Client | Moderator;
export type LoggedUser = Brand<Admin | Client |  Moderator, 'LoggedUser'>;
export type PrivilegedUser = Brand<Admin | Moderator, 'PrivilegedUser'>;

export function isPrivilegedUser(user: User): user is PrivilegedUser {
    if (Admin.is(user) || Moderator.is(user)) {
        return true;
    }

    return false;
}