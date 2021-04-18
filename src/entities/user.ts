import { Admin } from "./admin";
import type { Client } from "./client";
import { Moderator } from "./moderator";
import or from "../utils/or";

export type User = Admin | Client | Moderator;
export type LoggedUser = Admin | Client | Moderator;
export type PrivilegedUser = Admin | Moderator;

export function isPrivilegedUser(user: LoggedUser): user is PrivilegedUser {
  try {
    or(Moderator, Admin);
    return true;
  } catch (e) {
    return false;
  }
}
