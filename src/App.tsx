import React from "react";
import { Route, Switch } from "react-router";

import FileDetails from "./pages/FileDetails";
import FileUpload from "./pages/FileUpload";
import Home from "./pages/Home";
import UserDetails from "./pages/UserDetails";

function App() {
  return (
    <Switch>
      <Route path="/file/:id">
        <FileDetails />
      </Route>
      <Route path="/file-upload">
        <FileUpload />
      </Route>
      <Route path="/user-details/:id">
        <UserDetails />
      </Route>
      <Route path="/" exact>
        <Home />
      </Route>
    </Switch>
  );
}

export default App;
