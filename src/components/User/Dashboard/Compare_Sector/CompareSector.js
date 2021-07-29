import React, { Component, PureComponent } from "react";
import "./CompareSector";
import UserMenu from "../../MenuBar/UserMenu";
import axios from "axios";
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

class CompareSector extends Component {
  state = {
    searchResults: [],
    numOfSectors: 0,
    sectorOne: null,
    sectorTwo: null,
    combinedSector: null,
    sectors: [],
    sectId: 1,
  };

  componentDidMount() {
    this.retrieveSector();
  }

  retrieveSector = () => {
    axios
      .get("http://localhost:4000/sector")
      .then((res) => this.setState({ sectors: res.data }))
      .catch((err) => console.log(err));
  };

  getStockData = () => {};

  onChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => console.log(this.state)
    );
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.setState(
      {
        numOfSectors: (this.state.numOfSectors + 1) % 2,
      },
      () => {
        axios
          .get("http://localhost:4000/stock/sect/" + this.state.sectId)
          .then((res) => {
            let dataObject = [];
            res.data.map((data) => {
              if (this.state.numOfSectors === 0)
                dataObject.push({
                  priceOne: data[0],
                  name: data[1],
                  date: data[2],
                });
              else
                dataObject.push({
                  priceTwo: data[0],
                  name: data[1],
                  date: data[2],
                });
            });
            console.log(dataObject);
            if (this.state.numOfSectors === 1)
              this.setState({ sectorOne: dataObject });
            else if (this.state.numOfSectors === 0)
              this.setState({ sectorTwo: dataObject });

            if (
              this.state.sectorOne !== null &&
              this.state.sectorTwo !== null
            ) {
              let data = [];
              data.push(...this.state.sectorOne, ...this.state.sectorTwo);
              this.setState({
                combinedSector: data,
              });
            }
          })
          .catch((err) => console.log(err));
      }
    );
  };

  render() {
    return (
      <div>
        <UserMenu active="compare_sectors" />
        <div className="container-lg">
          <h2>Compare Sectors</h2>
          <hr />
          <form onSubmit={this.onSubmit}>
            <div className="mb-3 row">
              <label forHtml="sector" className="col-sm-2 col-form-label">
                Sector
              </label>
              <div className="col-sm-4">
                <select
                  className="form-select"
                  onChange={this.onChange}
                  name="sectId"
                  id="sector"
                >
                  {this.state.sectors.map((sector, index) => (
                    <option key={index} value={sector.sectId}>
                      {sector.sectName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-sm-6">
                <center>
                  <button type="submit" className="btn btn-success">
                    Generate Chart
                  </button>
                </center>
              </div>
            </div>
          </form>
          <hr />
          <div className="row">
            <div className="col">
              {this.state.sectorOne !== null ? (
                <div>
                  <h3>{this.state.sectorOne[0].name}</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart
                      width={500}
                      height={200}
                      data={this.state.sectorOne}
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
            <div className="col">
              {this.state.sectorTwo !== null ? (
                <div>
                  <h3>{this.state.sectorTwo[0].name}</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart
                      width={500}
                      height={200}
                      data={this.state.sectorTwo}
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
                        stroke="#00ff00"
                        fill="#00ff00"
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
              {this.state.sectorOne !== null &&
              this.state.sectorTwo !== null ? (
                <div>
                  <h2>
                    {this.state.sectorOne[0].name}-
                    {this.state.sectorTwo[0].name}
                  </h2>

                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart
                      width={500}
                      height={200}
                      data={this.state.combinedSector}
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
                        stroke="#00ff00"
                        fill="#00ff00"
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

export default CompareSector;
