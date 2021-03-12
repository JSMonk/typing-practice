import * as t from "runtypes";
import { Admin } from "./admin";
import { Client } from "./client";
import { Moderator } from "./moderator";

export const User = t.Union(Admin, Client, Moderator);

export type User = t.Static<typeof User>
