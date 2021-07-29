import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./UserMenu.css";

class UserMenu extends Component {
  state = {};
  render() {
    return (
      <div className="menu-bg">
        <div className="container-md">
          <div className="row">
            <div
              className={
                this.props.active === "ipo" ? "col-sm active" : "col-sm"
              }
            >
              <Link className="item" to="ipo" replace>
                IPO
              </Link>
            </div>
            <div
              className={
                this.props.active === "compare_company"
                  ? "col-sm active"
                  : "col-sm"
              }
            >
              <Link className="item" to="compare_company" replace>
                Compare Company
              </Link>
            </div>
            <div
              className={
                this.props.active === "compare_sector"
                  ? "col-sm active"
                  : "col-sm"
              }
            >
              <Link className="item" to="compare_sector" replace>
                Compare Sectors
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserMenu;
