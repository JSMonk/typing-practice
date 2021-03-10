export enum Role {
  ADMIN = "admin",
  CLIENT = "client",
  MODERATOR = "moderator"
}

export type LoggedRole = Role.ADMIN | Role.MODERATOR;
