import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header/Header";
import SignupPage from "./User/Signup/SignupPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/signup" exact component={SignupPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
