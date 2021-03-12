import { Operation } from "./operation";
import { Role } from "./role";

export const AVAILABLE_OPERATIONS = {
    [Role.CLIENT]: {
        [Role.ADMIN]: [],
        [Role.MODERATOR]: [],
        [Role.CLIENT]: []
    },
    [Role.MODERATOR]: {
        [Role.ADMIN]: [],
        [Role.MODERATOR]: [Operation.UPDATE_TO_CLIENT],
        [Role.CLIENT]: [Operation.UPDATE_TO_MODERATOR]
    },
    [Role.ADMIN]: {
        [Role.ADMIN]: [Operation.UPDATE_TO_MODERATOR],
        [Role.MODERATOR]: [Operation.UPDATE_TO_CLIENT, Operation.UPDATE_TO_ADMIN],
        [Role.CLIENT]: [Operation.UPDATE_TO_MODERATOR]
    }
} as const;

export type AVAILABLE_OPERATIONS = typeof AVAILABLE_OPERATIONS;