import React from "react";
import Header from "./components/header/header";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import Center from "./components/center/center";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Header />
      <Center>
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Center>
    </div>
  );
}

export default App;
