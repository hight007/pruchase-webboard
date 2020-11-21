import join from "url-join";
import React, { Component } from "react";
import Moment from "react-moment";
import Swal from "sweetalert2";
import { apiUrl, key, OK, server } from "../../../constants";
import { httpClient } from "./../../../utils/HttpClient";

class Search_delivery_order extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchKeyword: "",
      searchResult: null,
    };
  }

  componentDidMount() {}

  getSearchResult = async () => {
    if (this.state.searchKeyword !== "") {
      let searchResult = await httpClient.get(
        server.DO_URL + `/searchFile/fileName=${this.state.searchKeyword}`
      );
      if (searchResult.data.api_result === OK) {
        this.setState({ searchResult: searchResult.data.result });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Backend error please contact web admin",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter keyword ",
      });
    }
  };

  renderSearchResult = () => {
    if (this.state.searchResult !== null) {
      return (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Result</h3>
          </div>
          <div className="card-body">
            <div
              className="card-body table-responsive p-0"
              style={{ maxHeight: 400 }}
            >
              <table
                id="DivTable"
                className="table table-head-fixed table-hover text-nowrap"
                role="grid"
                aria-describedby="example2_info"
              >
                <thead>
                  <tr role="row">
                    <th
                      className="sorting_asc"
                      tabIndex={0}
                      aria-controls="example2"
                      rowSpan={1}
                      colSpan={1}
                      aria-sort="ascending"
                      aria-label="Rendering engine: activate to sort column descending"
                    >
                      Delivery order number
                    </th>
                    <th
                      className="sorting"
                      tabIndex={0}
                      aria-controls="example2"
                      rowSpan={1}
                      colSpan={1}
                      aria-label="CSS grade: activate to sort column ascending"
                    >
                      division
                    </th>
                    <th
                      className="sorting"
                      tabIndex={0}
                      aria-controls="example2"
                      rowSpan={1}
                      colSpan={1}
                      aria-label="CSS grade: activate to sort column ascending"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>{this.renderTableRow()}</tbody>
              </table>
            </div>
          </div>
          <div className="card-footer"></div>
        </div>
      );
    }
  };

  renderTableRow = () => {
    try {
      if (this.state.searchResult != null) {
        return this.state.searchResult.map((item) => (
          <tr key={item.fileName} role="row" className="odd">
            <td>{item.fileName}</td>
            <td>{item.division}</td>
            <td>
              <button
                type="button"
                onClick={async (e) => {
                  e.preventDefault();

                  let usernameResult = await httpClient.get(
                    server.USER_URL + "/" + localStorage.getItem(key.USER_NAME)
                  );
                  let api_token = usernameResult.data.result.randomKey;

                  window.open(
                    join(
                      apiUrl,
                      `${server.DO_URL}/showFile/fileName=${
                        item.fileName
                      }`
                    )
                  );
                }}
                target="blank"
                className="btn btn-primary"
              >
                Open
              </button>
            </td>
          </tr>
        ));
      }
    } catch (error) {}
  };

  render() {
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>
                  Search delivery order&nbsp;
                  <span
                    class="iconify"
                    data-icon="ant-design:file-search-outlined"
                    data-inline="true"
                  ></span>
                </h1>
              </div>
              <div className="col-sm-6"></div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>

        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                {/* general form elements */}
                <form>
                  <div className="card card-primary">
                    <div className="card-header">
                      <h3 className="card-title">
                        Search e-document delivery order
                      </h3>
                    </div>
                    {/* /.card-header */}
                    {/* form start */}
                    <div className="card-body">
                      <div style={{ textAlign: "center" }}>
                        <img
                          src="/images/SearchDocAnimation.gif"
                          alt="MIC Logo"
                          className="img-fluid mb-3"
                          style={{ maxHeight: 200 }}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                          Delivery Order(DO) number :
                        </label>
                        <input
                          autoFocus
                          type="text"
                          autocomplete="off"
                          className="form-control"
                          placeholder="Scan delivery order number"
                          onChange={(e) => {
                            this.setState({ searchKeyword: e.target.value });
                          }}
                        />
                      </div>
                    </div>
                    {/* /.card-body */}
                    <div className="card-footer">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={(e) => {
                          e.preventDefault();
                          this.getSearchResult();
                        }}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </form>

                {this.renderSearchResult()}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Search_delivery_order;
