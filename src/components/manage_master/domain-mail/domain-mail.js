import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
import Moment from "react-moment";
import * as actions from "./../../../actions/domain_mail.action";
import { APP_TITLE } from "./../../../constants/index";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

class DomainMail extends Component {
  componentDidMount() {
    this.props.getDomainMail();
    document.title = APP_TITLE + " manage alert-mail";
    this.debounceSearch = _.debounce(this.props.getDomainMailByKeyword, 500);
  }

  onChange = (e) => {
    e.persist();
    this.debounceSearch(e);
  };

  renderTableRow = () => {
    try {
      const { result, isFetching } = this.props.domainMailReducer;
      //alert(JSON.stringify(result));

      if (result != null && !isFetching) {
        const myResult = result.result;
        //return JSON.stringify(myResult) + JSON.stringify(this.dummyArray)

        return myResult.map((item) => (
          <tr key={item.divisionCode} role="row" className="odd">
            <td>
              <Moment format="DD-MMM-YYYY">{item.createdAt}</Moment>
            </td>

            <td>{item.updateBy}</td>
            <td>{item.domainEmail}</td>
            <td>{item.PlantCode}</td>
            <td>
              <button
                onClick={() => {
                  MySwal.fire({
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
                      this.props.deleteDomainMail(item.PlantCode);
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
                  <small> Domain mail</small>
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
                    <h2 className="card-title">Domain mail table</h2>
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
                          to="/master/create/domainMail"
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
                              Created
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="example2"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Platform(s): activate to sort column ascending"
                            >
                              updateBy
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="example2"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Engine version: activate to sort column ascending"
                            >
                              domainEmail
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="example2"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Engine version: activate to sort column ascending"
                            >
                              PlantCode
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
  domainMailReducer: state.domainMailReducer,
});

const mapDispatchToProps = {
  ...actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(DomainMail);
