import type { Operation } from "../entities/operation";
import type { RoleToUser } from "../entities/role-to-user";
import type { OperationToRole } from "../entities/operations-to-role";

export type UserForOperation<O extends Operation> = 
  RoleToUser[OperationToRole[O]]
