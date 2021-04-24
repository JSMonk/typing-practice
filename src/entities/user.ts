import { Admin } from "./admin";
import type { Client } from "./client";
import { Moderator } from "./moderator";

export type User = Admin | Client | Moderator;
