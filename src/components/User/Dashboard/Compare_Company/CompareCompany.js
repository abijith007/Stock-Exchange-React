import axios from "axios";
import React, { Component } from "react";
import UserMenu from "../../MenuBar/UserMenu";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
class CompareCompany extends Component {
  state = {
    selectedCompany: "",
    numOfCompanies: 0,
    companyOne: null,
    companyTwo: null,
    combinedCompany: null,
    companyId: null,
    exchName: [],
    companyList: [],
    companyOneName: "",
    companyTwoName: "",
  };

  retrieveCompany = () => {
    axios
      .get("http://localhost:4000/sector")
      .then((res) => this.setState({ sectors: res.data }))
      .catch((err) => console.log(err));
  };

  retrieveExchangeName = () => {
    axios
      .get("http://localhost:4000/exchange/name")
      .then((res) => this.setState({ exchName: res.data }))
      .catch((err) => console.log(err));
  };

  onChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => {
        console.log(this.state);
        if (e.target.name === "selectedExchName") {
          axios.get("http://localhost:4000/compExch").then((res) => {
            this.setState(
              {
                companyList: res.data.filter(
                  (list) =>
                    list.stockExchange.exchName === this.state.selectedExchName
                ),
              },
              () => console.log(this.state)
            );
          });
        }
      }
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState(
      { numOfCompanies: (this.state.numOfCompanies + 1) % 2 },
      () => {
        axios
          .get("http://localhost:4000/stock/" + this.state.companyId)
          .then((res) => {
            let dataObject = [];
            res.data.map((data) => {
              if (this.state.numOfCompanies === 0)
                dataObject.push({
                  priceOne: data.sharePrice,
                  date: data.datee,
                });
              else
                dataObject.push({
                  priceTwo: data.sharePrice,
                  date: data.datee,
                });
            });
            console.log(dataObject);
            if (this.state.numOfCompanies === 1)
              this.setState(
                {
                  companyOne: dataObject,
                  companyOneName: this.state.companyList.filter(
                    (list) =>
                      list.company.compId === Number(this.state.companyId)
                  )[0].company.compName,
                },
                () => console.log(this.state)
              );
            else if (this.state.numOfCompanies === 0)
              this.setState(
                {
                  companyTwo: dataObject,
                  companyTwoName: this.state.companyList.filter(
                    (list) =>
                      list.company.compId === Number(this.state.companyId)
                  )[0].company.compName,
                },
                () => console.log(this.state)
              );

            if (
              this.state.companyOne !== null &&
              this.state.companyTwo !== null
            ) {
              let data = [];
              data.push(...this.state.companyOne, ...this.state.companyTwo);
              this.setState(
                {
                  combinedCompany: data,
                },
                () => console.log(this.state)
              );
            }
          })
          .catch((err) => console.log(err));
      }
    );
  };

  componentDidMount() {
    this.retrieveExchangeName();
  }

  render() {
    return (
      <div>
        <UserMenu active="compare_company" />
        <div className="container-lg">
          <h2>Compare Company</h2>
          <hr />
          <form onSubmit={this.handleSubmit}>
            <div className="mb-3 row">
              <label
                forHtml="stockExchange"
                className="col-sm-2 col-form-label"
              >
                Stock Exchange
              </label>
              <div className="col-sm-4">
                <select
                  className="form-select"
                  onChange={this.onChange}
                  name="selectedExchName"
                  id="stockExchange"
                >
                  <option>Choose</option>
                  {this.state.exchName.map((list, index) => (
                    <option key={index} defaultValue={list.exchName}>
                      {list.exchName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-sm-2">
                <label forHtml="Company-name" className="col-form-label">
                  Company Name
                </label>
              </div>
              <div className="col-sm-4">
                <select
                  className="form-select"
                  onChange={this.onChange}
                  name="companyId"
                  id="searchCompany"
                >
                  <option>Choose</option>
                  {this.state.companyList.map((list, index) => (
                    <option key={index} value={list.company.compId}>
                      {list.company.compName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-6">
                <center>
                  <button type="submit" className="btn btn-success">
                    Generate
                  </button>
                </center>
              </div>
            </div>
          </form>
          <hr />
          <div className="row">
            <div className="col">
              {this.state.companyOne !== null ? (
                <div>
                  <h3>{this.state.companyOneName}</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart
                      width={500}
                      height={200}
                      data={this.state.companyOne}
                      syncId="anyId"
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="priceTwo"
                        stroke="#8884d8"
                        fill="#8884d8"
                      />
                      <Brush />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                false
              )}
            </div>
            <div className="col">
              {this.state.companyTwo !== null ? (
                <div>
                  <h3>{this.state.companyTwoName}</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart
                      width={500}
                      height={200}
                      data={this.state.companyTwo}
                      syncId="anyId"
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="priceOne"
                        stroke="#FF0000"
                        fill="#FF0000"
                      />
                      <Brush />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                false
              )}
            </div>
          </div>
          <div className="row">
            <div className="col">
              {this.state.companyOne !== null &&
              this.state.companyTwo !== null ? (
                <div>
                  <h2>
                    {this.state.companyOneName}-{this.state.companyTwoName}
                  </h2>

                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart
                      width={500}
                      height={200}
                      data={this.state.combinedCompany}
                      syncId="anyId"
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        type="category"
                        allowDuplicatedCategory={false}
                      />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="priceOne"
                        stroke="#FF0000"
                        fill="#FF0000"
                      />
                      <Line
                        type="monotone"
                        dataKey="priceTwo"
                        stroke="#8984d8"
                        fill="#8984d8"
                      />
                      <Brush />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                false
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CompareCompany;
