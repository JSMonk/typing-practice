import type { Role } from "./role";
import type { AccountInfo } from "./account-info";

export type Moderator = AccountInfo & {
  role: Role.MODERATOR;
};
