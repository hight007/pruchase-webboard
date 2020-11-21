import React, { Component } from "react";
import Swal from "sweetalert2";
import { OK, server } from "../../../constants";
import { httpClient } from "./../../../utils/HttpClient";

class Share_delivery_order extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileName: "",
    };
  }

  async shareDocument() {
    try {
      let shareResult = await httpClient.get(
        `${server.DO_URL}/shareFile/fileName=${this.state.fileName}`
      );
      if (shareResult.data.api_result === OK) {
        Swal.fire({
          icon: "success",
          title: `Share Delivery order number : ${this.state.fileName} success...`,
          showConfirmButton: false,
          timer: 1200,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Share Delivery order number : ${this.state.fileName} failed...!`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "failed...",
        text: `${error} failed...!`,
      });
    }
  }

  render() {
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>
                  Share delivery order&nbsp;
                  <span
                    class="iconify"
                    data-icon="carbon:document-export"
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
                        Share e-document delivery order
                      </h3>
                    </div>
                    {/* /.card-header */}
                    {/* form start */}
                    <div className="card-body">
                      <div style={{ textAlign: "center" }}>
                        <img
                          src="/images/attach_t.gif"
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
                          value={this.state.fileName}
                          onChange={(e) => {
                            this.setState({ fileName: e.target.value });
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
                          if (this.state.fileName !== "") {
                            this.shareDocument();
                            this.setState({ fileName: "" });
                          } else {
                            Swal.fire({
                              icon: "warning",
                              title: "Oops...",
                              text: "Please input document number!",
                            });
                          }
                        }}
                      >
                        Share
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Share_delivery_order;
