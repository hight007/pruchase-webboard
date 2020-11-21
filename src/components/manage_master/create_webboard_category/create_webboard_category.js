import React, { Component } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { key } from "../../../constants/index";
import * as actions from "./../../../actions/webboard_category.action";
import { APP_TITLE } from "./../../../constants/index";

class Create_webboard_category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "",
      type: "",
      createBy: localStorage.getItem(key.USER_EMP),
      icon: "",
      piority: 0,
    };
  }

  componentDidMount() {
    document.title = APP_TITLE + " create webboard category";
  }

  showError = () => {
    if (this.props.webboardCategoryReducer.isError) {
      this.props.showWebboardCategoryErrorAlerted(
        this.props.webboardCategoryReducer.errorMessage
      );
    }
  };

  render() {
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Create webboard category Form</h1>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>

        <div className="container-fluid">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">
                Create new webboard category master
              </h3>
            </div>
            {/* /.card-header */}
            {/* form start */}
            <form role="form">
              <div className="card-body">
                <div className="form-group">
                  <label>Webboard category :</label>
                  <input
                    type="text"
                    onChange={(e) => {
                      this.setState({ category: e.target.value });
                    }}
                    className="form-control"
                    placeholder="Enter webboard category"
                  />
                </div>

                <div class="form-group">
                  <label>Type :</label>
                  <select
                    class="form-control"
                    onChange={(e) => {
                      this.setState({ type: e.target.value });
                    }}
                    type="text"
                    className="form-control"
                  >
                    <option>--Please select type--</option>
                    <option value="Primary">Primary (Show on home page)</option>
                    <option value="Secondary">Secondary</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    icon :{" "}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        Swal.fire({
                          title: "How to find icon name",
                          imageUrl: "/images/iconfy_wi.png",
                          imageAlt: "How to find icon name",
                        });
                      }}
                    >
                      How to find icon name
                    </a>{" "}
                    /{" "}
                    <a href="https://iconify.design/" target="blank">
                      Find icon
                    </a>
                  </label>
                  <input
                    type="text"
                    onChange={(e) => {
                      this.setState({ icon: e.target.value });
                    }}
                    className="form-control"
                    placeholder="icon on home page"
                  />
                </div>
                <div className="form-group">
                  <label>piority :</label>
                  <input
                    type="number"
                    min="0"
                    value={this.state.piority}
                    onChange={(e) => {
                      this.setState({ piority: e.target.value });
                    }}
                    className="form-control"
                    placeholder="Piority (only primary)"
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
                    this.props.createWebboardCategory(
                      this.props.history,
                      this.state
                    );
                  }}
                >
                  Submit
                </button>
                <div>{this.showError()}</div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  webboardCategoryReducer: state.webboardCategoryReducer,
});

const mapDispatchToProps = {
  ...actions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create_webboard_category);
