import "./index.css";
import "antd/dist/antd.css";
import React from "react";
import NotFound from "./pages/not-found";
import ReactDOM from "react-dom";
import Dashboard from "./pages/dashboard";
import { Router } from "@reach/router";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Dashboard path="/" />
      <NotFound default />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
