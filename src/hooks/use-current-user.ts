import { useContext } from "react";
import { LogedInUser } from "../providers/loged-in-user";
import {navigate, useLocation, WindowLocation} from "@reach/router";
import { LoggedUser } from "../entities/user";
import { Client } from "../entities/client";

function isDashboard(location: WindowLocation) {
  return location.pathname.includes('/')
}

export default function useCurrentUser(): LoggedUser {
  const { state: { user } = { user: null } } = useContext(LogedInUser);
  const location = useLocation();

  if (user === null) {
    navigate("/login");
  } else {
    if (Client.is(user) && isDashboard(location)) {
      navigate("/asdasd");
    }
  }

  return user as LoggedUser;
}

