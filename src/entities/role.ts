export enum Role {
  ADMIN = "ADMIN",
  CLIENT = "CLIENT",
  MODERATOR = "MODERATOR"
}

export type LoggedRole = Role.ADMIN | Role.MODERATOR;
