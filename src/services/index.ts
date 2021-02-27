import UserService from "./user-service";
import OperationService from "./operation-service";
import { createContext } from "react";

const userService = new UserService();
const operationService = new OperationService(userService);

const Services = createContext({
  userService,
  operationService
});

export default Services;
