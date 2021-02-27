import type { Role } from "./role";
import type { AccountInfo } from "./account-info";

export type Admin = AccountInfo & {
  role: Role.ADMIN;
};
