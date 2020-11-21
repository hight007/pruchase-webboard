import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
import Moment from "react-moment";
import * as actions from "./../../../actions/doc_expire_div.action";
import { APP_TITLE, key } from "./../../../constants/index";
import Swal from "sweetalert2";

class Edit_document_expore_division extends Component {
  constructor(props) {
    super(props);

    this.state = {
      documentName: null,
      documentType: null,
    };
  }

  componentDidMount() {
    document.title = APP_TITLE + " edit document epire division";
    var { documentName, documentType } = this.props.match.params;
    this.setState({ documentName, documentType });
    this.props.getDocExpireDiv(documentName, documentType);
  }

  showError = () => {
    if (this.props.docExpireDivReducer.isError) {
      this.props.showDocExpireDivErrorAlerted(
        this.props.docExpireDivReducer.errorMessage
      );
    }
  };

  renderTableRow = () => {
    try {
      const { result, isFetching } = this.props.docExpireDivReducer;
      //alert(JSON.stringify(result));

      if (result != null && !isFetching) {
        const myResult = result.result[0];
        //return JSON.stringify(myResult) + JSON.stringify(this.dummyArray)

        return myResult.map((item) => (
          <tr key={item.divisionCode} role="row" className="odd">
            <td>{item.divisionCode}</td>
            <td>{item.divisionName}</td>
            <td>{item.updateBy}</td>
            <td>
              <button
                onClick={() => {
                  Swal.fire({
                    title: "Are you sure to delete?",
                    text: "You won't be able to revert this!",
                    type: "warning",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonColor: "#d33",
                    cancelButtonText: "No, cancel!",
                  }).then((result) => {
                    if (result.value) {
                      this.props.deleteDocExpireDiv(
                        this.state.documentName,
                        this.state.documentType,
                        item.divisionCode
                      );
                    }
                  });
                }}
                type="button"
                className="btn btn-danger"
              >
                Delete
              </button>
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
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-12" style={{ textAlign: "center" }}>
                <h1>
                  Manage
                  <small> Alert mail</small>
                </h1>
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
                    <h2 className="card-title">Alert mail table</h2>
                  </div>
                  {/* /.card-header */}

                  <div className="card-body">
                    <div className="row">
                        <div className="col-sm-7">
                          <label>
                            documentName : {this.state.documentName}
                          </label>
                        </div>
                        <div className="col-sm-3">
                          <label>
                            documentType : {this.state.documentType}
                          </label>
                        </div>
                        <div className="col-sm-2">
                          <span className="input-group-append">
                            <Link
                              to={`/e-document/create/document_expire_division/documentName=${this.state.documentName}&documentType=${this.state.documentType}`}
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
                    </div>

                  <div className="card" style={{ margin: 10 }}>
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
                              divisionCode
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="example2"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Platform(s): activate to sort column ascending"
                            >
                              divisionName
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="example2"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Engine version: activate to sort column ascending"
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
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>{this.renderTableRow()}</tbody>
                      </table>
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
  docExpireDivReducer: state.docExpireDivReducer,
});

const mapDispatchToProps = {
  ...actions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit_document_expore_division);
