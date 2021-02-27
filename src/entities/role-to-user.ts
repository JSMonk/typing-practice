import type { Role } from "./role";
import type { Admin } from "./admin";
import type { Client } from "./client";
import type { Moderator } from "./moderator";

export type RoleToUser = {
  [Role.ADMIN]: Moderator, 
  [Role.CLIENT]: Moderator, 
  [Role.MODERATOR]: Client | Admin, 
}
