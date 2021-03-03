import "./index.css";
import "antd/dist/antd.css";
import React from "react";
import Login from "./pages/login";
import NotFound from "./pages/not-found";
import ReactDOM from "react-dom";
import Dashboard from "./pages/dashboard";
import { Router } from "@reach/router";
import { LogedInProvider } from "./providers/loged-in-user";

ReactDOM.render(
  <React.StrictMode>
    <LogedInProvider>
      <Router>
        <Dashboard path="/" />
        <Login path="/login" />
        <NotFound default />
      </Router>
    </LogedInProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
