import React, { Component } from "react";
import * as XLSX from "xlsx";
import { Card, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faUpload,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import AdminMenu from "../../AdminMenu/AdminMenu";

export default class ImportStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      exchanges: [],
      stocks: [],
      compId: 0,
      exchId: 0,
      compCode: "",
      show: false,
    };
  }

  componentDidMount() {
    this.getAllCompanies();
    this.getAllExchanges();
  }

  getAllCompanies() {
    axios.get("http://localhost:4000/company/name").then((res) => {
      console.log("compp", res.data);
      this.setState({ companies: res.data });
    });
  }

  getAllExchanges() {
    axios.get("http://localhost:4000/exchange/name").then((res) => {
      console.log("exchh", res.data);
      this.setState({ exchanges: res.data });
    });
  }

  readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        //const wb = XLSX.read(bufferArray, {type:'buffer',cellDates:true});
        const wb = XLSX.read(bufferArray, {
          type: "buffer",
          cellDates: true,
          cellNF: false,
          cellText: false,
        });
        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws, {
          raw: false,
          dateNF: "yyyy-mm-dd hh:mm:ss",
        });

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      this.setState({ compCode: d[0]["Company Code"] });
      let array = [];
      let obj = {};
      d.forEach((stock) => {
        obj.compCode = stock["Company Code"];
        obj.exchName = stock["Stock Exchange"];
        obj.sharePrice = stock["Share Price"];
        obj.datee = stock.Date.split(" ")[0];
        obj.timee = stock.Time.split(" ")[1];
        array.push(obj);
        obj = {};
      });
      this.setState({ stocks: [...array] });
      console.log("dat", this.state.stocks);
    });
  };

  submitForm = (e) => {
    e.preventDefault();
    const { compId, exchId, compCode } = this.state;
    if (compId !== "0" && exchId !== "0") {
      console.log("statee", {
        compId: compId,
        exchId: exchId,
        compCode: compCode,
      });
      axios
        .post("http://localhost:4000/compExch", {
          compId: compId,
          exchId: exchId,
          compCode: compCode,
        })
        .then((response) => {
          console.log("compExch", response);
          return axios.post(
            "http://localhost:4000/stocks/" + compId,
            this.state.stocks
          );
        })
        .then((res) => {
          if (res.data !== null && res.data !== undefined) {
            this.setState({ show: true });
            setTimeout(() => this.setState({ show: false }), 4000);
          } else {
            this.setState({ show: false });
          }
          console.log("stockss", res);
          alert("Successfully Saved");
        })
        .catch((err) => {
          console.log("stocks err", err);
        });
    } else {
      alert("please select");
    }
  };

  render() {
    return (
      <div>
        <AdminMenu active="import" />
        <div className="container">
          <div className="row">
            <div style={{ margin: "auto" }}>
              <h2>Import Stock Data</h2>
            </div>
          </div>
          <hr />
          <center>
            <Card
              className="border border-dark text-black    "
              style={{ width: "30rem", marginTop: "2rem" }}
            >
              <Card.Header>
                <FontAwesomeIcon icon={faDownload} /> Import Stocks
              </Card.Header>
              <Form onSubmit={this.submitForm} id="companyNameId">
                <Card.Body>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => this.setState({ compId: e.target.value })}
                  >
                    <option value="0">--Select Company--</option>
                    {this.state.companies.map((company) => (
                      <option key={company.compId} value={company.compId}>
                        {company.compName}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Select
                    className="mt-3"
                    aria-label="Default select example"
                    onChange={(e) => this.setState({ exchId: e.target.value })}
                  >
                    <option value="0">--Select Stock Exchange--</option>
                    {this.state.exchanges.map((exchange) => (
                      <option key={exchange.exchId} value={exchange.exchId}>
                        {exchange.exchName}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Group
                    className="mb-3 mt-3"
                    controlId="formGridTurnover"
                  >
                    <Form.Label>Company Code</Form.Label>
                    <Form.Control
                      autoComplete="off"
                      type="test"
                      name="compCode"
                      value={this.state.compCode}
                      //onChange={}
                      className={"bg-white text-black"}
                      disabled={true}
                    />
                  </Form.Group>
                </Card.Body>
                <Card.Footer>
                  <FontAwesomeIcon icon={faUpload} />{" "}
                  <Form.Label>Upload Excel</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      this.readExcel(file);
                    }}
                  />
                  <div style={{ textAlign: "right" }}>
                    <Button
                      className="mt-3"
                      size="sm"
                      variant="success"
                      type="submit"
                    >
                      <FontAwesomeIcon icon={faSave} /> Save
                    </Button>
                  </div>
                </Card.Footer>
              </Form>
            </Card>
          </center>
        </div>
      </div>
    );
  }
}
