import { Brand } from "../utils/brand";
import { Admin } from "./admin";
import { AVAILABLE_OPERATIONS } from "./available-operations";
import { Moderator } from "./moderator";
import { Operation } from "./operation";
import { Role } from "./role";
import { isPrivilegedUser, LoggedUser, PrivilegedUser, User } from "./user";

const AVAILABLE_CONFIGURATION_MODERATOR = {
    [Role.ADMIN]: [],
    [Role.MODERATOR]: [Operation.UPDATE_TO_CLIENT],
    [Role.CLIENT]: [Operation.UPDATE_TO_MODERATOR],
} as const;

const AVAILABLE_CONFIGURATION_ADMIN = {
    [Role.ADMIN]: [Operation.UPDATE_TO_MODERATOR],
    [Role.MODERATOR]: [Operation.UPDATE_TO_CLIENT, Operation.UPDATE_TO_ADMIN],
    [Role.CLIENT]: [Operation.UPDATE_TO_MODERATOR],
} as const;

type AVAILABLE_CONFIGURATION_M = Brand<
    readonly Operation[],
    (typeof AVAILABLE_CONFIGURATION_MODERATOR)[Role]
>;
type AVAILABLE_CONFIGURATION_A = Brand<
    readonly Operation[],
    (typeof AVAILABLE_CONFIGURATION_ADMIN)[Role]
>;

export class ConfigOperation {
  
    static from(user: User, loggedUser: LoggedUser): ConfigOperation {
      if (isPrivilegedUser(loggedUser)) {
          return new ConfigOperation(user, loggedUser);
      }
  
      throw new TypeError("Not permisison!");
    }
  
    public getAvailableOperations() {
        return this.useOperation(this.user, this.privilegedUser);
    }

    private useOperation<U1 extends User, U2 extends PrivilegedUser>(user: U1, currentUser: U2) {
        return AVAILABLE_OPERATIONS[currentUser.role][user.role] as AVAILABLE_OPERATIONS[U2["role"]][U1["role"]];
    }
    private readonly _type = Symbol("ConfigOperationAdmin");

    protected constructor(
      private readonly user: User,
      private readonly privilegedUser: PrivilegedUser
    ) {}
}

export class ConfigOperationAdmin {
  
    static from(user: User, loggedUser: Admin): ConfigOperationAdmin {
      if (Admin.is(loggedUser)) {
          return new ConfigOperationAdmin(user);
      }
  
      throw new TypeError("loggedUser is not admin!");
    }
  
    public getAvailableOperations() {
        return this.availableOperations[this.user.role] as unknown as AVAILABLE_CONFIGURATION_M;
    }

    private readonly availableOperations = AVAILABLE_CONFIGURATION_ADMIN
    private readonly _type = Symbol("ConfigOperationAdmin");

    protected constructor(
      private readonly user: User
    ) {}
}

export class ConfigOperationModerator {
    
    static from(user: User, loggedUser: Moderator): ConfigOperationModerator {
      if (Moderator.is(loggedUser)) {
        return new ConfigOperationModerator(user);
      }
  
      throw new TypeError("loggedUser is not moderator!");
    }
  
    public getAvailableOperations() {
        return this.availableOperations[this.user.role] as unknown as AVAILABLE_CONFIGURATION_A;
    }

    private readonly availableOperations = AVAILABLE_CONFIGURATION_MODERATOR;
    private readonly _type = Symbol("ConfigOperationModerator");
  
    protected constructor(
        private readonly user: User
    ) {}
}

export type AVAILABLE_CONFIGURATION = AVAILABLE_CONFIGURATION_M | AVAILABLE_CONFIGURATION_A;
// export type ConfigOperation = ConfigOperationAdmin | ConfigOperationModerator;
