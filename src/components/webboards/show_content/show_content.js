import React, { Component } from "react";
import { key, server } from "../../../constants";
import { httpClient } from "../../../utils/HttpClient";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import * as moment from "moment";
import { connect } from "react-redux";
import { deleteWebboardContent } from "./../../../actions/webboard_content.action";
import Swal from "sweetalert2";

class Show_content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      id: null,
      page: 1,
    };
  }
 
  async componentDidMount() {
    let { id, page } = this.props.match.params;
    let contentResult = await httpClient.get(
      server.WEBBOARD_CONTENT_URL + `/id/id=${id}`
    );
    var data = contentResult.data.result;
    this.setState({ data, page, id });
  }

  loadingScreen(data) {
    if (data === null) {
      return (
        <div className="overlay">
          <i className="fas fa-3x fa-sync-alt fa-spin" />
          <div className="text-bold pt-2">Loading...</div>
        </div>
      );
    }
  }

  renderContent = () => {
    if (this.state.data != null) {
      return (
        <section className="content">
          <div className="container-fluid">
            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">{this.state.data.topic}</h3>
              </div>
              <div className="card-body" style={{ overflow: "auto" }}>
                {ReactHtmlParser(this.state.data.content)}
              </div>
              <div className="card-footer">
                <div>{this.renderActionContent()}</div>
                <div className="float-right">
                  <small>
                    <span
                      class="iconify"
                      data-icon="bi:people"
                      data-inline="true"
                    ></span>{" "}
                    {"Create by :" + this.state.data.createBy}
                    {" ,"}
                    <i class="far fa-clock"></i>{" "}
                    {"created at : " +
                      moment(this.state.data.createdAt).format(
                        "DD-MMM-YYYY HH:mm:ss"
                      )}
                    {" ,"}
                    <i class="far fa-clock"></i>{" "}
                    {"updated at : " +
                      moment(this.state.data.updatedAt).format(
                        "DD-MMM-YYYY HH:mm:ss"
                      )}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }
  };

  renderActionContent = () => {
    if (
      this.state.data != null &&
      this.state.data.createBy === localStorage.getItem(key.USER_EMP)
    ) {
      return (
        <div className="float-left">
          <div className="float-left" style={{ paddingRight: 10 }}>
            <button
              onClick={(e) => {
                e.preventDefault();
                this.props.history.push(
                  `/webboards/update/content/content_id=${this.state.id}`
                );
              }}
              className="btn btn-block bg-gradient-warning btn-xs"
            >
              Edit...
            </button>
          </div>

          <div className="float-left">
            <button
              className="btn btn-block bg-gradient-danger btn-xs"
              onClick={(e) => {
                e.preventDefault();
                Swal.fire({
                  title: "Do you want to delete this content?",
                  showDenyButton: true,
                  showCancelButton: true,
                  confirmButtonText: `Delete`,
                  icon: "question",
                }).then(async (result) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (result.isConfirmed) {
                    await this.props.deleteWebboardContent({
                      id: this.state.id,
                    });
                    Swal.fire("deleted!", "", "success");
                    this.props.history.push("/home");
                  }
                });
              }}
            >
              Delete...
            </button>
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-9">
                <h1>Webboards content</h1>
              </div>
              <div className="col-sm-3">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                  </li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        <div className="overlay-wrapper">
          {this.loadingScreen(this.state.data)}
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  webboardContentReducer: state.webboardContentReducer,
});

const mapDispatchToProps = {
  deleteWebboardContent,
};

export default connect(mapStateToProps, mapDispatchToProps)(Show_content);
