import React from "react";
import { Route, Switch } from "react-router";

import FileDetails from "./pages/FileDetails";
import FileUpload from "./pages/FileUpload";
import Home from "./pages/Home";
import UserDetails from "./pages/UserDetails";
import Search from "./pages/Search";

function App() {
  return (
    <Switch>
      <Route path="/file/:id">
        <FileDetails />
      </Route>
      <Route path="/file-upload">
        <FileUpload />
      </Route>
      <Route path="/user-details">
        <UserDetails />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
      <Route path="/" exact>
        <Home />
      </Route>
    </Switch>
  );
}

export default App;
