import { Admin } from "./admin";
import type { Client } from "./client";
import { Moderator } from "./moderator";

export type User = Admin | Client | Moderator;
export type LoggedUser = Admin | Client |  Moderator;
export type PrivilegedUser = Admin | Moderator;

export function isPrivilegedUser(user: LoggedUser): user is PrivilegedUser {
    return Admin.is(user) || Moderator.is(user);
}
