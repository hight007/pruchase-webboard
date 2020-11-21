import React, { Component } from "react";
import { Link } from "react-router-dom";
import { server } from "../../../constants";
import { httpClient } from "../../../utils/HttpClient";

class Main_menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };
  }
  async componentDidMount() {
    let result = await httpClient.get(
      server.WEBBOARD_CATEGORY_URL + "/countContent"
    );
    this.setState({ data: result.data.result });
  }

  renderWebboardCategory() {
    if (this.state.data != null) {
      return this.state.data.map((item) => (
        <li className="nav-item">
          <Link
            to={`/webboards/list_content/category=${item.category}`}
            className="nav-link"
          >
            <span
              class="iconify"
              data-icon={item.icon}
              data-inline="true"
            ></span>{" "}
            {item.category}
            <span className="float-right badge bg-primary">
              {item.countContent}
            </span>
            <span
              className={
                item.type !== "Primary"
                  ? "float-right badge bg-warning"
                  : "float-right badge bg-success"
              }
              style={{ marginRight: 5 }}
            >
              {item.type}
            </span>
          </Link>
        </li>
      ));
    }
  }

  render() {
    return (
      <div className="content-wrapper ">
        {" "}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Webboard main menu</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/Home">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">General Form</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="card card-widget widget-user-2">
              {/* Add the bg color to the header using any of the bg-* classes */}
              <div className="widget-user-header bg-primary">
                {/* /.widget-user-image */}
              </div>
              <div className="card-footer p-0">
                <ul className="nav flex-column">
                  {this.renderWebboardCategory()}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Main_menu;
