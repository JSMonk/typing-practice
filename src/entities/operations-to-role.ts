import type { Role } from "./role";
import type { Operation } from "./operation";

export type OperationToRole = {
  [Operation.UPDATE_TO_ADMIN]: Role.ADMIN, 
  [Operation.UPDATE_TO_CLIENT]: Role.CLIENT, 
  [Operation.UPDATE_TO_MODERATOR]: Role.MODERATOR, 
}


