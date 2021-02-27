import type { Role } from "./role";
import type { AccountInfo } from "./account-info";

export type Client = AccountInfo & {
  role: Role.CLIENT;
};
