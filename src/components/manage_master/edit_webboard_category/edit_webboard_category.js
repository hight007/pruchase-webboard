import React, { Component } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { key, server } from "../../../constants/index";
import { httpClient } from "../../../utils/HttpClient";
import * as actions from "./../../../actions/webboard_category.action";
import { APP_TITLE } from "./../../../constants/index";

class Edit_webboard_category extends Component {
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
  async componentDidMount() {
    document.title = APP_TITLE + " edit webboard category";
    let category = this.props.match.params.category;
    let categoryResult = await httpClient.get(
      `${server.WEBBOARD_CATEGORY_URL}/category/category=${category}`
    );
    try {
      if (categoryResult.data.result == null) {
        this.props.history.goBack();
      } else {
        this.setState({
          category,
          type: categoryResult.data.result.type,
          icon: categoryResult.data.result.icon,
          piority: categoryResult.data.result.piority,
        });
      }
    } catch (error) {
      this.props.history.goBack();
    }
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
                <h1>Edit webboard category Form</h1>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>

        <div className="container-fluid">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Edit webboard category master</h3>
            </div>
            {/* /.card-header */}
            {/* form start */}
            <form role="form">
              <div className="card-body">
                <div className="form-group">
                  <label>Webboard category :</label>
                  <input
                    type="text"
                    value={this.state.category}
                    readOnly
                    // onChange={(e) => {
                    //   this.setState({ category: e.target.value });
                    // }}
                    className="form-control"
                    placeholder="Enter webboard category"
                  />
                </div>

                <div class="form-group">
                  <label>Type :</label>
                  <select
                    class="form-control"
                    value={this.state.type}
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
                    value={this.state.icon}
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
                    placeholder="Piority"
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
                    this.props.updateWebboardCategory(
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
)(Edit_webboard_category);
