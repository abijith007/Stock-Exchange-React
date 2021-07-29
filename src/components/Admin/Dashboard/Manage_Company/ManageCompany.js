import axios from "axios";
import React, { Component } from "react";
import AdminMenu from "../../AdminMenu/AdminMenu";
import "./ManageCompany.css";
class ManageCompany extends Component {
  state = {
    companyList: [],
    searchResult: [],
  };

  retrieveCompanyDetails = () => {
    axios
      .get("http://localhost:4000/compExch")
      .then((res) => {
        this.setState({
          companyList: res.data,
          searchResult: res.data,
        });
        console.log(this.state.companyList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  updateCompany = (e) => {
    var selected = this.state.companyList.filter(
      (list) => list.company.compId === Number(e.target.value)
    )[0];
    let body = {
      compName: this.state.compName || selected.company.compName,
      turnover: this.state.turnover || selected.company.turnover,
      ceo: this.state.ceo || selected.company.ceo,
      boardOfDirectors:
        this.state.boardOfDirectors || selected.company.boardOfDirectors,
      compBrief: this.state.compBrief || selected.company.compBrief,
      ipo: {
        pricePerShare:
          this.state.pricePerShare || selected.company.ipo.pricePerShare,
        noOfShares: this.state.noOfShares || selected.company.ipo.noOfShares,
      },
      sector: {
        sectName: this.state.sectName || selected.company.sector.sectName,
        sectBrief: this.state.sectBrief || selected.company.sector.sectBrief,
      },
    };

    console.log(body);
    axios
      .put("http://localhost:4000/company/" + Number(e.target.value), body)
      .then((res) => this.retrieveCompanyDetails())
      .catch((err) => console.log(err));
  };

  searchCompany = (event) => {
    if (event.target.value === "") {
      this.retrieveCompanyDetails();
    } else {
      console.log(event.target.value, this.state.companyList);
      let searchResult = this.state.companyList.filter(
        (list) => list.company.compName === event.target.value
      );
      this.setState({
        searchResult: searchResult,
      });
    }
  };

  addCompany = () => {
    let date = new Date();
    let body = {
      company: {
        compName: this.state.compName,
        turnover: this.state.turnover,
        ceo: this.state.ceo,
        boardOfDirectors: this.state.boardOfDirectors,
        compBrief: this.state.compBrief,
        ipo: {
          pricePerShare: this.state.pricePerShare,
          noOfShares: this.state.noOfShares,
          openDateTime: `${date.getFullYear()}-${
            (date.getMonth() < 10 ? "0" : "") + date.getMonth()
          }-${(date.getDate() < 10 ? "0" : "") + date.getDate()}T${
            (date.getHours() < 10 ? "0" : "") + date.getHours()
          }:${(date.getMinutes() < 10 ? "0" : "") + date.getMinutes()}`,
        },
      },
      sector: {
        sectName: this.state.sectName,
        sectBrief: this.state.sectBrief,
      },
    };
    axios
      .post("http://localhost:4000/company", body)
      .then((res) => this.retrieveCompanyDetails())
      .catch((err) => console.log(err));
  };

  toggleStatus = (event) => {
    let selectedCompany = this.state.companyList.filter(
      (list) => list.company.compId === Number(event.target.value)
    )[0];
    if (selectedCompany.company.active === true)
      axios
        .post(
          "http://localhost:4000/company/deactivate/" +
            selectedCompany.company.compId
        )
        .then((res) => this.retrieveCompanyDetails())
        .catch((err) => console.log(err));
    else
      axios
        .post(
          "http://localhost:4000/company/activate/" +
            selectedCompany.company.compId
        )
        .then((res) => this.retrieveCompanyDetails())
        .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.retrieveCompanyDetails();
  }

  render() {
    return (
      <div>
        <AdminMenu active="manage_company" />
        <div className="container-md page-content">
          <div className="row">
            <div className="col-7" style={{ margin: "auto" }}>
              <h2>Manage Companies</h2>
            </div>
            <div className="col-3" style={{ margin: "auto" }}>
              <input
                type="text"
                placeholder="Search"
                onChange={this.searchCompany}
              />
            </div>
            <div className="col-2" style={{ margin: "auto" }}>
              <button
                className="btn btn-success"
                data-bs-toggle="modal"
                data-bs-target="#createCompany"
              >
                Create Company
              </button>
              <div
                className="modal fade"
                id="createCompany"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-xl">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Create Company
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
                        <div className="col-2">Company Name</div>
                        <div className="col-2">
                          <input
                            type="text"
                            name="compName"
                            onChange={this.onChange}
                          />
                        </div>
                        <div className="col-2">Company Brief</div>
                        <div className="col-2">
                          <input
                            name="compBrief"
                            onChange={this.onChange}
                            type="text"
                            style={{ width: "100%" }}
                          />
                        </div>
                        <div className="col-2">CEO</div>
                        <div className="col-2">
                          <input
                            name="ceo"
                            onChange={this.onChange}
                            style={{ width: "100%" }}
                            type="text"
                          />
                        </div>
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-2">Board of Directors</div>
                        <div className="col-2">
                          <input
                            name="boardOfDirectors"
                            onChange={this.onChange}
                            type="text"
                          />
                        </div>
                        <div className="col-2">Turnover</div>
                        <div className="col-2">
                          <input
                            name="turnover"
                            onChange={this.onChange}
                            type="text"
                            style={{ width: "100%" }}
                          />
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-2">Sector Name</div>
                        <div className="col-2">
                          <input
                            onChange={this.onChange}
                            name="sectName"
                            type="text"
                            style={{ width: "100%" }}
                          />
                        </div>
                        <div className="col-2">Sector Brief</div>
                        <div className="col-2">
                          <input
                            onChange={this.onChange}
                            name="sectBrief"
                            type="text"
                            style={{ width: "100%" }}
                          />
                        </div>
                      </div>
                      <hr />

                      <div className="row">
                        <div className="col-2">Price Per Share</div>
                        <div className="col-2">
                          <input
                            type="text"
                            name="pricePerShare"
                            onChange={this.onChange}
                            className="label"
                          />
                        </div>
                        <div className="col-2">Total Shares</div>
                        <div className="col-2">
                          <input
                            type="text"
                            name="noOfShares"
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
                        onClick={this.addCompany}
                        data-bs-dismiss="modal"
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
          <div className="row">
            <div className="col">
              <div className="table-responsive-md mt-2  ">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr className="table-primary">
                      <th>
                        <center>Company Name</center>
                      </th>
                      <th>
                        <center>Exchange</center>
                      </th>
                      <th>
                        <center>Sector</center>
                      </th>
                      <th>
                        <center>Status</center>
                      </th>
                      <th>
                        <center>Manage Status</center>
                      </th>
                      <th>
                        <center>Manage Company</center>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.searchResult.map((item, index) => (
                      <tr key={index}>
                        <td>{item.company.compName}</td>
                        <td>{item.stockExchange.exchName}</td>
                        <td>{item.company.sector.sectName}</td>
                        <td>
                          {item.company.active === true ? (
                            <span
                              className="badge bg-success"
                              style={{ fontSize: "1rem" }}
                            >
                              Active
                            </span>
                          ) : (
                            <span
                              className="badge bg-danger"
                              style={{
                                fontSize: "1rem",
                              }}
                            >
                              Deactivated
                            </span>
                          )}
                        </td>
                        <td>
                          <center>
                            {item.company.active === false ? (
                              <button
                                className="btn btn-success"
                                value={item.company.compId}
                                onClick={this.toggleStatus}
                              >
                                Activate
                              </button>
                            ) : (
                              <button
                                className="btn btn-danger"
                                value={item.company.compId}
                                onClick={this.toggleStatus}
                              >
                                Deactivate
                              </button>
                            )}
                          </center>
                        </td>
                        <td>
                          <center>
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-bs-toggle="modal"
                              data-bs-target="#editCompany"
                            >
                              Edit
                            </button>

                            <div
                              className="modal fade"
                              id="editCompany"
                              tabIndex="-1"
                              aria-labelledby="exampleModalLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog modal-dialog-centered modal-xl">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="exampleModalLabel"
                                    >
                                      Edit Company
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
                                      <div className="col-2">Company Code</div>
                                      <div className="col-2">
                                        <input
                                          type="text"
                                          disabled
                                          defaultValue={item.compCode}
                                        />
                                      </div>
                                      <div className="col-2">Company Name</div>
                                      <div className="col-2">
                                        <input
                                          type="text"
                                          name="compName"
                                          onChange={this.onChange}
                                          defaultValue={item.company.compName}
                                        />
                                      </div>
                                      <div className="col-2">Company Brief</div>
                                      <div className="col-2">
                                        <input
                                          name="compBrief"
                                          onChange={this.onChange}
                                          type="text"
                                          defaultValue={item.company.compBrief}
                                          style={{ width: "100%" }}
                                        />
                                      </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                      <div className="col-2">CEO</div>
                                      <div className="col-2">
                                        <input
                                          name="ceo"
                                          onChange={this.onChange}
                                          type="text"
                                          defaultValue={item.company.ceo}
                                        />
                                      </div>
                                      <div className="col-2">
                                        Board of Directors
                                      </div>
                                      <div className="col-2">
                                        <input
                                          name="boardOfDirectors"
                                          onChange={this.onChange}
                                          type="text"
                                          defaultValue={
                                            item.company.boardOfDirectors
                                          }
                                        />
                                      </div>
                                      <div className="col-2">Turnover</div>
                                      <div className="col-2">
                                        <input
                                          name="turnover"
                                          onChange={this.onChange}
                                          type="text"
                                          defaultValue={item.company.turnover}
                                          style={{ width: "100%" }}
                                        />
                                      </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                      <div className="col-2">Sector Name</div>
                                      <div className="col-2">
                                        <input
                                          onChange={this.onChange}
                                          name="sectName"
                                          type="text"
                                          defaultValue={
                                            item.company.sector.sectName
                                          }
                                        />
                                      </div>
                                      <div className="col-2">Sector Brief</div>
                                      <div className="col-2">
                                        <input
                                          onChange={this.onChange}
                                          name="sectBrief"
                                          type="text"
                                          defaultValue={
                                            item.company.sector.sectBrief
                                          }
                                        />
                                      </div>
                                    </div>
                                    <br />
                                    <hr />
                                    <div className="row">
                                      <div className="col-2">Exchange</div>
                                      <div className="col-2">
                                        <input
                                          type="text"
                                          disabled
                                          defaultValue={
                                            item.stockExchange.exchName
                                          }
                                        />
                                      </div>
                                      <div className="col-2">
                                        Exchange Brief
                                      </div>
                                      <div className="col-2">
                                        <input
                                          type="text"
                                          disabled
                                          defaultValue={
                                            item.stockExchange.exchBrief
                                          }
                                        />
                                      </div>
                                      <div className="col-2">Status</div>
                                      <div className="col-1">
                                        {item.company.active === true ? (
                                          <span
                                            className="badge bg-success"
                                            style={{ fontSize: "1rem" }}
                                          >
                                            Active
                                          </span>
                                        ) : (
                                          <span
                                            className="badge bg-danger"
                                            style={{
                                              fontSize: "1rem",
                                            }}
                                          >
                                            Deactivated
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                      <div className="col-2">
                                        Price Per Share
                                      </div>
                                      <div className="col-2">
                                        <input
                                          type="text"
                                          name="pricePerShare"
                                          onChange={this.onChange}
                                          className="label"
                                          defaultValue={
                                            item.company.ipo.pricePerShare
                                          }
                                        />
                                      </div>
                                      <div className="col-2">Total Shares</div>
                                      <div className="col-2">
                                        <input
                                          type="text"
                                          name="noOfShares"
                                          onChange={this.onChange}
                                          defaultValue={
                                            item.company.ipo.noOfShares
                                          }
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
                                      className="btn btn-primary"
                                      value={item.company.compId}
                                      onClick={this.updateCompany}
                                      data-bs-dismiss="modal"
                                    >
                                      Save changes
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </center>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <hr />
        </div>
      </div>
    );
  }
}

export default ManageCompany;
