import axios from "axios";
import React, { Component } from "react";
import UserMenu from "../../MenuBar/UserMenu";

class DisplayIPO extends Component {
  state = { ipoList: [] };

  getIpo = () => {
    axios
      .get("http://localhost:4000/company")
      .then((res) =>
        this.setState({
          ipoList: res.data,
        })
      )
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getIpo();
  }

  render() {
    return (
      <div>
        <UserMenu active="ipo" />
        <div className="container-lg">
          <h2>IPO Details</h2>
          <hr />
          <div className="table-responsive-md">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">
                    <center>Sl.No</center>
                  </th>
                  <th scope="col">
                    <center>Company</center>
                  </th>
                  <th scope="col">
                    <center>Price Per Share</center>
                  </th>
                  <th scope="col">
                    <center>Number of Shares</center>
                  </th>
                  <th scope="col">
                    <center>Opening Date</center>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.ipoList.map((list, index) => (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{list.compName}</td>
                    <td>{list.ipo.pricePerShare}</td>
                    <td>{list.ipo.noOfShares}</td>
                    <td>{list.ipo.openDateTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default DisplayIPO;
