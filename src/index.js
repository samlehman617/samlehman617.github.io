import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// const show_env = false;
// process.env.PUBLIC_URL = "localhost"
// if (show_env) {
//   console.log("PUBLIC_URL:", process.env.PUBLIC_URL);
//   console.log("NODE_ENV:", process.env.NODE_ENV);
// }

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
