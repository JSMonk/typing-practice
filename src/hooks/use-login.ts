import Services from "../services";
import { navigate } from "@reach/router";
import { useContext, useEffect } from "react";
import { LogedInActionType, LogedInUser } from "../providers/loged-in-user";
import type { LoggedUser } from "../entities/user";
import { Credentials, CredentialsInput } from "../entities/credentials";

export default function useLogin(credentials: Credentials | null): LoggedUser | null {
  const { loginService } = useContext(Services);
  const { dispatch, state = { user: null } } = useContext(LogedInUser);

  useEffect(() => {
    if (!credentials || !dispatch) {
      return;
    }
    loginService.login(new CredentialsInput(credentials.email, credentials.password))
      .then((user: LoggedUser) => dispatch!({ type: LogedInActionType.LOG_IN, payload: user }))
      .then(() => navigate("/"))
      .catch(e => alert(e.message));
  }, [credentials, dispatch, loginService]);

  return state.user;
}
