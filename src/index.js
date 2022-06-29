import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import FontStyles from "./fonts/fontstyles";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
  <BrowserRouter>
    <FontStyles />
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
