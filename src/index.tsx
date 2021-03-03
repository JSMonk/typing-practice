import "./index.css";
import "antd/dist/antd.css";
import React from "react";
import Login from "./pages/login";
import NotFound from "./pages/not-found";
import ReactDOM from "react-dom";
import Dashboard from "./pages/dashboard";
import { Router } from "@reach/router";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Dashboard path="/" />
      <Login path="/login" />
      <NotFound default />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
