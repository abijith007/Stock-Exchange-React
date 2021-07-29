import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header/Header";
import SignupPage from "./User/Signup/SignupPage";
import Homepage from "./Homepage/Homepage";
import UserDashboard from "./User/Dashboard/UserDashboard";
import DisplayIPO from "./User/Dashboard/IPO/DisplayIPO";
import CompareCompany from "./User/Dashboard/Compare_Company/CompareCompany";
import CompareSector from "./User/Dashboard/Compare_Sector/CompareSector";
import ManageCompany from "./Admin/Dashboard/Manage_Company/ManageCompany";
import ManageExchange from "./Admin/Dashboard/Manage_Exchange/ManageExchange";
import ImportStock from "./Admin/Dashboard/ImportPage/SheetJSApp";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/signup" exact component={SignupPage} />
          <Route path="/dashboard" exact component={UserDashboard} />
          <Route path="/ipo" exact component={DisplayIPO} />
          <Route path="/compare_company" exact component={CompareCompany} />
          <Route path="/compare_sector" exact component={CompareSector} />
          <Route path="/admin/import" exact component={ImportStock} />
          <Route path="/admin/manage_company" exact component={ManageCompany} />
          <Route
            path="/admin/manage_exchange"
            exact
            component={ManageExchange}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
