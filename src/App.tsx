import React from "react";
import { Route, Switch } from "react-router";

import FileDetails from "./pages/FileDetails";
import FileUpload from "./pages/FileUpload";
import Home from "./pages/Home";
import UserDetails from "./pages/UserDetails";

import styles from "./App.module.scss";

function App() {
  return (
    <Switch>
      <Route path="/file/:hash">
        <FileDetails />
      </Route>
      <Route path="/file-upload">
        <FileUpload />
      </Route>
      <Route path="/user-details">
        <UserDetails />
      </Route>
      <Route path="/" exact>
        <Home />
      </Route>
    </Switch>
  );
}

export default App;
