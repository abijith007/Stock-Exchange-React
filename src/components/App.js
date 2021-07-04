import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Header from "./Header/Header";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch></Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
