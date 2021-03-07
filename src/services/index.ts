import UserService from "./user-service";
import OperationService from "./operation-service";
import { createContext } from "react";
import LoginService from "./login-service";

const userService = new UserService();
const loginService = new LoginService(userService);
const operationService = new OperationService(userService);

const Services = createContext({
  userService,
  loginService,
  operationService
});

export default Services;
