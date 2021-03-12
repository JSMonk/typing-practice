import * as t from "runtypes";

export const AccountInfo = t.Record({
  id: t.String,
  name: t.String,
  email: t.String,
  password: t.String
});
