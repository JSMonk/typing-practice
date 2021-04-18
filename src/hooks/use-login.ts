import Services from "../services";
import { navigate } from "@reach/router";
import { useContext, useEffect } from "react";
import { LogedInActionType, LogedInUser } from "../providers/loged-in-user";
import type { LoggedUser, User } from "../entities/user";
import { Credentials } from "../entities/credentials";
import { Password } from "../entities/password";
import { Email } from "../entities/email";

export default function useLogin(credentials: Credentials | null): User | null {
  const { loginService } = useContext(Services);
  const { dispatch, state = { user: null } } = useContext(LogedInUser);

  useEffect(() => {
    if (!credentials || !dispatch) {
      return;
    }
    loginService
      .login(Email.from(credentials.email), Password.from(credentials.password))
      .then((user: LoggedUser) =>
        dispatch!({ type: LogedInActionType.LOG_IN, payload: user })
      )
      .then(() => navigate("/"))
      .catch((e) => alert(e.message));
  }, [credentials, dispatch, loginService]);

  return state.user;
}
