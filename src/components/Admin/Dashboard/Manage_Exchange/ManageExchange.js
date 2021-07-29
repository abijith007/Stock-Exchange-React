import axios from "axios";
import React, { Component } from "react";
import AdminMenu from "../../AdminMenu/AdminMenu";

class ManageExchange extends Component {
  state = {
    exchangeList: [],
  };

  retrieveExchangeList = () => {
    axios.get("http://localhost:4000/exchange").then((res) => {
      this.setState({
        exchangeList: res.data,
        exchName: "",
        exchBrief: "",
      });
      console.log(this.state.exchangeList);
    });
  };

  componentDidMount() {
    this.retrieveExchangeList();
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(this.state);
  };

  handleSubmit = () => {
    let postData = {
      exchName: this.state.exchName,
      exchBrief: this.state.exchBrief,
    };
    axios
      .post("http://localhost:4000/exchange", postData)
      .then((res) => {
        console.log(res.status);
        this.retrieveExchangeList();
      })
      .catch((e) => console.log(e));
  };

  render() {
    return (
      <div>
        <AdminMenu active="manage_exchange" />
        <div className="container-md">
          <br />
          <div className="row">
            <div className="col-10" style={{ margin: "auto" }}>
              <h2>Manage Exchanges</h2>
            </div>
            <div className="col-2" style={{ margin: "auto" }}>
              <button
                className="btn btn-success"
                data-bs-toggle="modal"
                data-bs-target="#createExchange"
              >
                Create Exchange
              </button>
              <div
                className="modal fade"
                id="createExchange"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered ">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Create Exchange
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="row">
                        <div className="col-4">
                          <label>Exchange Name</label>
                        </div>
                        <div className="col-3">
                          <input
                            type="text"
                            name="exchName"
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-4">
                          <label>Exchange Brief</label>
                        </div>
                        <div className="col-3">
                          <input
                            type="text"
                            name="exchBrief"
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="btn btn-success"
                        data-bs-dismiss="modal"
                        onClick={this.handleSubmit}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <table className="table table-striped table-hover">
            <thead>
              <tr className="table-info">
                <td>
                  <center>ID</center>
                </td>
                <td>
                  <center>Exchange Name</center>
                </td>
                <td>
                  <center>Description</center>
                </td>
              </tr>
            </thead>
            <tbody>
              {this.state.exchangeList.map((data, index) => (
                <tr key={index}>
                  <td>{data.exchId}</td>
                  <td>{data.exchName}</td>
                  <td>{data.exchBrief}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ManageExchange;
