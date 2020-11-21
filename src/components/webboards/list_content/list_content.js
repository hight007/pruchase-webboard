import React, { Component } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import _ from "lodash";
import { APP_TITLE } from "../../../constants";
import * as actions from "./../../../actions/webboard_content.action";
import { connect } from "react-redux";

class List_content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: null,
    };
  }

  async componentDidMount() {
    let { category } = await this.props.match.params;
    document.title = APP_TITLE + " list content " + category;
    this.props.getWebboardContentByCategory(category);
    this.setState({ category });
    this.debounceSearch = _.debounce(
      this.props.getWebboardContentByKeywordAndCategory,
      500
    );
  }

  onChange = (e) => {
    e.persist();
    this.debounceSearch(e, this.state.category);
  };

  renderTableRow = () => {
    try {
      const { result, isFetching } = this.props.webboardContentReducer;

      if (result != null && !isFetching) {
        const myResult = result.result;

        return myResult.map((item) => (
          <tr
            key={item.divisionCode}
            role="row"
            // onClick={(e) => {
            //   e.preventDefault();
            //   this.props.history.push(
            //     `/webboards/content/content_id=${item.id}&page=1`
            //   );
            // }}
            className="odd"
          >
            <td>{item.topic}</td>
            <td>{item.createBy}</td>
            <td>
              <Moment format="DD-MMM-YYYY hh:mm:ss">{item.createdAt}</Moment>
            </td>
            <td>
              <Moment format="DD-MMM-YYYY hh:mm:ss">{item.updatedAt}</Moment>
            </td>
            <td>
              <Link to={`/webboards/content/content_id=${item.id}&page=1`}>
                <button className="btn btn-block bg-gradient-primary">
                  Open
                </button>
              </Link>
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
              <div className="col-sm-12">
                <h1>
                  Category :<small>{" " + this.state.category}</small>
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
                    <h2 className="card-title">{this.state.category}</h2>
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
                              Topic
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="example2"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Platform(s): activate to sort column ascending"
                            >
                              create_by
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="example2"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Engine version: activate to sort column ascending"
                            >
                              create_at
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="example2"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="CSS grade: activate to sort column ascending"
                            >
                              update_at
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
  webboardContentReducer: state.webboardContentReducer,
});

const mapDispatchToProps = {
  ...actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(List_content);
