import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./AdminMenu.css";

class AdminMenu extends Component {
  state = {};
  render() {
    return (
      <div className="menu-bg">
        <div className="container-md">
          <div className="row">
            <div
              className={
                this.props.active === "import" ? "col-sm active" : "col-sm"
              }
            >
              <Link className="item" to="import" replace>
                Import Data
              </Link>
            </div>
            <div
              className={
                this.props.active === "manage_company"
                  ? "col-sm active"
                  : "col-sm"
              }
            >
              <Link className="item" to="manage_company" replace>
                Manage Company
              </Link>
            </div>
            <div
              className={
                this.props.active === "manage_exchange"
                  ? "col-sm active"
                  : "col-sm"
              }
            >
              <Link className="item" to="manage_exchange" replace>
                Manage Exchange{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminMenu;
