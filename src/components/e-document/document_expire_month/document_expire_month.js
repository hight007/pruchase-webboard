import React, { Component } from "react";
import Swal from "sweetalert2";
import { server, OK } from "../../../constants";
import { httpClient } from "../../../utils/HttpClient";

class Document_expire_month extends Component {
  constructor(props) {
    super(props);

    this.state = {
      month: 3,
    };
  }

  async componentDidMount() {
    try {
      let result = await httpClient.get(server.DOCUMENT_EXPIRE_MONTH_URL);
      this.setState({ month: result.data.result.month });
    } catch (error) {}
  }

  render() {
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Document expire alert condition</h1>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>

        <div className="container-fluid">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Document expire alert condition</h3>
            </div>
            {/* /.card-header */}
            {/* form start */}
            <form role="form">
              <div className="card-body">
                <div className="form-group">
                  <label>Alert expire document before (months) :</label>
                  <input
                    type="number"
                    value={this.state.month}
                    min={3}
                    max={24}
                    onChange={(e) => {
                      this.setState({ month: e.target.value });
                    }}
                    className="form-control"
                    placeholder="Enter document expire alert email"
                  />
                </div>
              </div>
              {/* /.card-body */}
              <div className="card-footer">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={async (e) => {
                    e.preventDefault();
                    let result = await httpClient.patch(
                      server.DOCUMENT_EXPIRE_MONTH_URL,
                      this.state
                    );
                    if (result.data.api_result === OK) {
                      Swal.fire({
                        icon: "success",
                        title: "Success :D",
                        text: "Set document expire alert condition success",
                      });
                      this.props.history.goBack();
                    } else {
                      Swal.fire({
                        icon: "error",
                        title: "Error...!",
                        text: "Set document expire alert condition error",
                      });
                    }
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Document_expire_month;
