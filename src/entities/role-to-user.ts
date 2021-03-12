import * as t from "runtypes";
import { Role } from "./role";
import { Admin } from "./admin";
import { Client } from "./client";
import { Moderator } from "./moderator";

export type RoleToUser = {
  [Role.ADMIN]: Moderator;
  [Role.CLIENT]: Moderator;
  [Role.MODERATOR]: Client | Admin;
};

export const USER_BY_ROLE = {
  [Role.ADMIN]: Admin,
  [Role.CLIENT]: Client,
  [Role.MODERATOR]: Moderator,
};

type USER_BY_ROLE = typeof USER_BY_ROLE;

export type UserByRole = {
  [K in keyof USER_BY_ROLE]: t.Static<typeof USER_BY_ROLE[K]>
}

export function castTo<R extends Role, U extends RoleToUser[R]>(
  newRole: R,
  user: U
) {
  const UserConstructor: USER_BY_ROLE[R] = USER_BY_ROLE[newRole];
  return UserConstructor.check({ ...user, role: newRole }) as UserByRole[R];
}
