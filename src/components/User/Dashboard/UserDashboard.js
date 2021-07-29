import React, { Component } from "react";
import UserMenu from "../MenuBar/UserMenu";
class UserDashboard extends Component {
  state = {};
  render() {
    return (
      <div>
        <UserMenu active="dashboard"></UserMenu>
        <h1>Dashboard</h1>
      </div>
    );
  }
}

export default UserDashboard;
