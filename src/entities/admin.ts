import * as t from "runtypes";
import { Role } from "./role";
import { AccountInfo } from "./account-info";

export const Admin = t
  .Record({
    ...AccountInfo.fields,
    role: t.Literal(Role.ADMIN),
  })
  .asReadonly()
  .withBrand("Admin");

export type Admin = t.Static<typeof Admin>;
