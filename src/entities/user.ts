import type { Admin } from "./admin";
import type { Client } from "./client";
import type { Moderator } from "./moderator";

export type User = Admin | Client | Moderator;
