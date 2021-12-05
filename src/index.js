import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// Context
import { AuthProvider } from "./Context/AuthContext";
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider children={<App />} />
  </React.StrictMode>,
  document.getElementById("root")
);
