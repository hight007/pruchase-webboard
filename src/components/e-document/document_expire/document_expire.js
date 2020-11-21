import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
import Moment from "react-moment";
import * as actions from "./../../../actions/document_expire.action";
import { APP_TITLE, server } from "./../../../constants/index";
// import Swal from "sweetalert2";
import * as moment from "moment";
// import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import Swal from "sweetalert2";
import { httpClient } from "../../../utils/HttpClient";

class Document_expire extends Component {
  constructor(props) {
    super(props);

    this.state = {
      month: 0,
    };
  }

  async componentDidMount() {
    this.props.getDocExpire();
    document.title = APP_TITLE + " document expire";
    this.debounceSearch = _.debounce(this.props.getDocExpireByKeyword, 500);
    try {
      let result = await httpClient.get(server.DOCUMENT_EXPIRE_MONTH_URL);
      this.setState({ month: result.data.result.month });
    } catch (error) {
      console.log(error);
    }
  }

  onChange = (e) => {
    e.persist();
    this.debounceSearch(e);
  };

  showError = () => {
    if (this.props.docExpireReducer.isError) {
      this.props.showDocExpireErrorAlerted(
        this.props.docExpireReducer.errorMessage
      );
    }
  };

  renderTableRow = () => {
    const dateDiffWarningRender = (diffValue) => {
      if (diffValue > this.state.month) {
        return <td>{diffValue}</td>;
      } else {
        return (
          <td style={{ color: "red", fontWeight: "bold" }}>{diffValue}</td>
        );
      }
    };

    const statusRender = (status) => {
      switch (status) {
        case "active":
          return (
            <td>
              <button type="button" class="btn btn-block btn-success btn-xs">
                {status}
              </button>
            </td>
          );

        case "onProcess":
          return (
            <td>
              <button type="button" class="btn btn-block btn-warning btn-xs">
                {status}
              </button>
            </td>
          );

        case "inActive":
          return (
            <td>
              <button type="button" class="btn btn-block btn-danger btn-xs">
                {status}
              </button>
            </td>
          );

        default:
          break;
      }
    };

    const listDivCode = (arrayDivCode) => {
      var htmlString = `<table style="width:100%">
      <thread>
      <tr>
        <th>
        divisionCode
        </th>
        <th>
        divisionName
        </th>
        <th>
        updateBy
        </th>
      </tr>
      </thread>
      <tbody>`;
      if (arrayDivCode !== null) {
        arrayDivCode.forEach((item) => {
          htmlString =
            htmlString +
            `<tr>
              <td>${item.divisionCode}</td>
              <td>${item.divisionName}</td>
              <td>${item.updateBy}</td>
            </tr>`;
        });
        htmlString += `</tbody></table>`;
        return htmlString;
      } else {
        return "<p>Not found, please setting division</p>";
      }
    };

    try {
      const { result, isFetching } = this.props.docExpireReducer;
      //alert(JSON.stringify(result));

      if (result != null && !isFetching) {
        const myResult = result.result;
        //return JSON.stringify(myResult) + JSON.stringify(this.dummyArray)

        return myResult.map((item) => (
          <tr key={item.id} role="row" className="odd">
            {statusRender(item.status)}

            <td>{item.documentName}</td>
            <td>{item.documentType}</td>

            <td>
              <div className="row" style={{ minWidth: 200 }}>
                <div className="col-sm-4">
                  <button
                    className="btn btn-block btn-dark btn-xs"
                    onClick={async (e) => {
                      e.preventDefault();
                      let divResult = await httpClient.get(
                        `${server.DOCUMENT_EXPIREDIV_URL}/documentName=${item.documentName}&documentType=${item.documentType}`
                      );
                      // alert(JSON.stringify(divResult.data.result[0]));
                      Swal.fire({
                        title: `<strong>List division code 
                    
                    <h3>Document name : <u>${item.documentName}</u></h3><h3>Document type : <u>${item.documentType}</u></h3>
                    </strong>`,
                        icon: "info",
                        html:
                          "<div style='text-align: left;'>" +
                          listDivCode(divResult.data.result[0]) +
                          "</div>",
                        focusConfirm: false,
                        confirmButtonText:
                          '<i class="fa fa-thumbs-up"></i> Great!',
                        confirmButtonAriaLabel: "Thumbs up, great!",
                        width: "75%",
                      });
                    }}
                  >
                    showDiv
                  </button>
                </div>
                <div className="col-sm-4">
                  <button
                    className="btn btn-block btn-primary btn-xs"
                    onClick={(e) => {
                      e.preventDefault();
                      this.props.history.push(
                        `/e-document/create/document_expire_division/documentName=${item.documentName}&documentType=${item.documentType}`
                      );
                    }}
                  >
                    addDiv
                  </button>
                </div>
                <div className="col-sm-4">
                  <button
                    className="btn btn-block btn-warning btn-xs"
                    onClick={(e) => {
                      e.preventDefault();
                      this.props.history.push(
                        `/e-document/edit/document_expire_division/documentName=${item.documentName}&documentType=${item.documentType}`
                      );
                    }}
                  >
                    editDiv
                  </button>
                </div>
              </div>
            </td>
            <td>
              <Moment format="DD-MMM-YYYY">{item.expire_date}</Moment>
            </td>
            {dateDiffWarningRender(
              moment(item.expire_date).diff(moment(), "months")
            )}
            <td>{item.DG_type}</td>
            <td>{item.comment}</td>
            <td>{item.updateBy}</td>
            <td>
              <Moment format="DD-MMM-YYYY">{item.createdAt}</Moment>
            </td>
            <td>
              <div className="row" style={{ minWidth: 120 }}>
                <div className="col-sm-6">
                  <button
                    className="btn btn-block btn-warning btn-xs"
                    onClick={(e) => {
                      e.preventDefault();
                      Swal.fire({
                        title: "Are you sure to Edit?",
                        text: "Please confirm edit!",
                        type: "question",
                        icon: "question",
                        showCancelButton: true,
                        confirmButtonText: "Yes, edit it!",
                        cancelButtonColor: "#d33",
                        cancelButtonText: "No, cancel!",
                      }).then((result) => {
                        if (result.value) {
                          this.props.history.push(
                            `/e-document/edit/document_expire/documentName=${item.documentName}&documentType=${item.documentType}`
                          );
                        }
                      });
                    }}
                  >
                    Edit
                  </button>
                </div>

                <div className="col-sm-6">
                  <button
                    className="btn btn-block btn-danger btn-xs"
                    onClick={(e) => {
                      e.preventDefault();
                      Swal.fire({
                        title: "Are you sure to delete?",
                        text: "Please confirm delete!",
                        type: "question",
                        icon: "question",
                        showCancelButton: true,
                        confirmButtonText: "Yes, edit it!",
                        cancelButtonColor: "#d33",
                        cancelButtonText: "No, cancel!",
                      }).then((result) => {
                        if (result.value) {
                          this.props.deleteDocExpire(
                            item.documentName,
                            item.documentType
                          );
                        }
                      });
                    }}
                  >
                    delete
                  </button>
                </div>
              </div>
            </td>
          </tr>
        ));
      }
    } catch (error) {}
  };

  render() {
    return (
      <div className="content-wrapper" style={{ minHeight: 500 }}>
        {/* Content Header (Page header) */}
        {this.showError()}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-12" style={{ textAlign: "center" }}>
                <h1>
                  Manage
                  <small> Document expire notice</small>
                </h1>
                <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item">
                    <Link
                      to="/e-document/document_expire_alert_condition"
                      className=""
                    >
                      Set alert condition
                    </Link>
                  </li>
                  <li class="breadcrumb-item">
                    <Link to="/e-document/document_expire_email" className="">
                      Set alert email
                    </Link>
                  </li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h2 className="card-title">Document expire notice table</h2>
                  </div>
                  {/* /.card-header */}

                  <div className="card-body">
                    <div className="input-group input-group-sm">
                      <input
                        onChange={(e) => this.onChange(e)}
                        type="search"
                        className="form-control input-lg"
                        placeholder="Enter search keyword"
                        style={{ borderRadius: 10 }}
                      />

                      <span className="input-group-append">
                        <Link
                          to="/e-document/create/document_expire"
                          style={{
                            float: "right",
                            marginLeft: 5,
                            borderRadius: 10,
                            width: 120,
                          }}
                          className="btn btn-success float-right"
                        >
                          Add
                        </Link>
                      </span>
                    </div>
                  </div>

                  <div className="card" style={{ margin: 10 }}>
                    <div
                      className="card-body table-responsive p-0"
                      style={{ maxHeight: 400 }}
                    >
                      <OverlayScrollbarsComponent>
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
                                Status
                              </th>
                              <th
                                className="sorting_asc"
                                tabIndex={0}
                                aria-controls="example2"
                                rowSpan={1}
                                colSpan={1}
                                aria-sort="ascending"
                                aria-label="Rendering engine: activate to sort column descending"
                              >
                                documentName
                              </th>
                              <th
                                className="sorting"
                                tabIndex={0}
                                aria-controls="example2"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="Platform(s): activate to sort column ascending"
                              >
                                documentType
                              </th>

                              <th
                                className="sorting"
                                tabIndex={0}
                                aria-controls="example2"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="CSS grade: activate to sort column ascending"
                              >
                                Divisions
                              </th>
                              <th
                                className="sorting"
                                tabIndex={0}
                                aria-controls="example2"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="CSS grade: activate to sort column ascending"
                              >
                                expire_date
                              </th>
                              <th
                                className="sorting"
                                tabIndex={0}
                                aria-controls="example2"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="CSS grade: activate to sort column ascending"
                              >
                                expire in (months)
                              </th>
                              <th
                                className="sorting"
                                tabIndex={0}
                                aria-controls="example2"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="CSS grade: activate to sort column ascending"
                              >
                                DG_type
                              </th>
                              <th
                                className="sorting"
                                tabIndex={0}
                                aria-controls="example2"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="CSS grade: activate to sort column ascending"
                              >
                                Comment
                              </th>
                              <th
                                className="sorting"
                                tabIndex={0}
                                aria-controls="example2"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="CSS grade: activate to sort column ascending"
                              >
                                updateBy
                              </th>
                              <th
                                className="sorting"
                                tabIndex={0}
                                aria-controls="example2"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="CSS grade: activate to sort column ascending"
                              >
                                CreateAt
                              </th>

                              <th aria-label="CSS grade: activate to sort column ascending">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>{this.renderTableRow()}</tbody>
                        </table>
                      </OverlayScrollbarsComponent>
                    </div>
                  </div>
                </div>
                {/* /.card-body */}
              </div>

              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  docExpireReducer: state.docExpireReducer,
});

const mapDispatchToProps = {
  ...actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Document_expire);
