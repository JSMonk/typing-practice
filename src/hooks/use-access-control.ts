import { useContext } from "react";
import type { Role } from "../entities/role";
import Services from "../services";
import useCurrentUser from "./use-current-user";

export default function useAccessControl(allowedRoles: Role[] = []): boolean {
  const { loginService } = useContext(Services);
  const currentUser = useCurrentUser();

  return loginService.hasAccess(currentUser, allowedRoles);
}
