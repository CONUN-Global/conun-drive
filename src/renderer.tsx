import React from "react";
import ReactDOM from "react-dom";
import { QueryClientProvider } from "react-query";
import { HashRouter as Router } from "react-router-dom";

import App from "./App";

import { queryClient } from "./react-query/config";

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <App />
    </Router>
  </QueryClientProvider>,
  document.getElementById("app")
);
