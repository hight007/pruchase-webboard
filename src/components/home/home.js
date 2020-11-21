import React, { Component } from "react";
import { Animated } from "react-animated-css";
import { key, server, YES } from "../../constants/index";
import "react-slideshow-image/dist/styles.css";
// import { Zoom } from "react-slideshow-image";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import * as moment from "moment";
import { httpClient } from "../../utils/HttpClient";
import Axios from "axios";

function isOdd(num) {
  return num % 2;
}

class home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      primaryLeftCategory: null,
      primaryRightCategory: null,
      topicData: null,
    };
  }

  async componentDidMount() {
    this.isMember();

    let primaryCategory = await Axios.get(
      server.WEBBOARD_CATEGORY_URL + "/primary"
    );

    if (primaryCategory.data.result.length > 0) {
      let primaryLeftCategory = [];
      let primaryRightCategory = [];
      let topicData = {};

      for (let index = 0; index < primaryCategory.data.result.length; index++) {
        if (isOdd(index)) {
          await primaryRightCategory.push(primaryCategory.data.result[index]);
        } else {
          await primaryLeftCategory.push(primaryCategory.data.result[index]);
        }
        let contentCategory = await httpClient.get(
          server.WEBBOARD_CONTENT_URL +
            `/category/category=${primaryCategory.data.result[index].category}`
        );
        await Object.assign(topicData, {
          [primaryCategory.data.result[index].category]:
            contentCategory.data.result,
        });
      }

      await this.setState({
        primaryLeftCategory,
        primaryRightCategory,
        topicData,
      });
      // alert(JSON.stringify(this.state.topicData));
      window.scrollTo(0, 0);
    }
  }

  isMember = () => {
    if (localStorage.getItem(key.LOGIN_PASSED) === YES) {
      document.getElementById("wrapper").className = "content-wrapper";
    } else {
      document.getElementById("wrapper").className = "";
    }
  };
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

  renderTopic = (category) => {
    try {
      // alert(category);
      if (this.state.topicData[category].length > 0) {
        return this.state.topicData[category].map((item) => (
          <div>
            <Link
              to={`/webboards/content/content_id=${item.id}&page=1`}
              className="list-group-item list-group-item-action"
              style={{ textAlign: "left" }}
            >
              {item.topic}
            </Link>
          </div>
        ));
      }
    } catch (error) {}
  };
  renderLeftCategory = () => {
    if (this.state.primaryLeftCategory != null) {
      return this.state.primaryLeftCategory.map((item) => (
        <div class="card card collapsed-card">
          <div class="card-header">
            <h3 className="card-title">
              <span
                class="iconify"
                data-icon={item.icon}
                data-inline="true"
              ></span>{" "}
              {item.category}
            </h3>
            <div className="card-tools">
              <span
                data-toggle="tooltip"
                title="3 New Messages"
                className="badge bg-warning"
              >
                {this.state.topicData[item.category].length}
              </span>

              <button
                type="button"
                className="btn btn-tool"
                data-card-widget="collapse"
              >
                <i className="fas fa-plus" />
              </button>
            </div>
          </div>
          <div class="card-body bg-primary">
            <div className="list-group">{this.renderTopic(item.category)}</div>
          </div>
        </div>
      ));
    }
  };
  renderRightCategory = () => {
    if (this.state.primaryRightCategory != null) {
      return this.state.primaryRightCategory.map((item) => (
        <div class="card card collapsed-card">
          <div class="card-header">
            <h3 className="card-title">
              <span
                class="iconify"
                data-icon={item.icon}
                data-inline="true"
              ></span>{" "}
              {item.category}
            </h3>
            <div className="card-tools">
              <span
                data-toggle="tooltip"
                title="3 New Messages"
                className="badge bg-warning"
              >
                {this.state.topicData[item.category].length}
              </span>
              <button
                type="button"
                className="btn btn-tool"
                data-card-widget="collapse"
              >
                <i className="fas fa-plus" />
              </button>
            </div>
          </div>
          <div class="card-body bg-primary">
            <div className="list-group">{this.renderTopic(item.category)}</div>
          </div>
        </div>
      ));
    }
  };

  render() {
    return (
      <div className="content-wrapper " id="wrapper">
        <div
          className="col-sm-12"
          style={{ textAlign: "center", minHeight: 500 }}
        >
          <Animated animationIn="bounceIn">
            <div style={{ fontSize: 40 }}>
              <img
                src="/images/po-financing-1-300x300.png"
                alt="MIC Logo"
                className="img-fluid mb-3"
                style={{ maxHeight: 50 }}
              />
              <b>Purchase</b>
              <small> Webboard</small>
            </div>
          </Animated>

          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6" style={{ textAlign: "left" }}></div>
                {/* /.col */}
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                  </ol>
                </div>
                {/* /.col */}
              </div>
              {/* /.row */}
            </div>
            {/* /.container-fluid */}
          </div>
          <div className="content">
            <div className="row">
              <div className="col-md-3 col-sm-6 col-12">
                <Link to="/webboards/main_menu">
                  <div className="info-box">
                    <span className="info-box-icon bg-primary">
                      <i
                        className="nav-icon iconify"
                        data-icon="vs:whiteboard"
                      />
                    </span>
                    <div className="info-box-content">
                      <span
                        style={{ color: "black" }}
                        className="info-box-text"
                      >
                        Webboard menu
                      </span>
                    </div>
                    {/* /.info-box-content */}
                  </div>
                </Link>
                {/* /.info-box */}
              </div>
              <div className="col-md-3 col-sm-6 col-12">
                <Link to="/webboards/create/content">
                  <div className="info-box">
                    <span className="info-box-icon bg-primary">
                      <i
                        className="nav-icon iconify"
                        data-icon="clarity:new-solid"
                      />
                    </span>
                    <div className="info-box-content">
                      <span
                        style={{ color: "black" }}
                        className="info-box-text"
                      >
                        Create content
                      </span>
                    </div>
                    {/* /.info-box-content */}
                  </div>
                </Link>
                {/* /.info-box */}
              </div>

              <div className="col-md-3 col-sm-6 col-12">
                <Link to="/e-document/delivery_order/share/">
                  <div className="info-box">
                    <span className="info-box-icon bg-primary">
                      <i
                        className="nav-icon iconify"
                        data-icon="carbon:document-export"
                      />
                    </span>
                    <div className="info-box-content">
                      <span
                        style={{ color: "black" }}
                        className="info-box-text"
                      >
                        Share e-document
                      </span>
                    </div>
                    {/* /.info-box-content */}
                  </div>
                </Link>
                {/* /.info-box */}
              </div>
              <div className="col-md-3 col-sm-6 col-12">
                <Link to="/e-document/delivery_order/search/">
                  <div className="info-box">
                    <span className="info-box-icon bg-primary">
                      <i
                        className="nav-icon iconify"
                        data-icon="ant-design:file-search-outlined"
                      />
                    </span>
                    <div className="info-box-content">
                      <span
                        style={{ color: "black" }}
                        className="info-box-text"
                      >
                        Search e-document
                      </span>
                    </div>
                    {/* /.info-box-content */}
                  </div>
                </Link>
                {/* /.info-box */}
              </div>
            </div>
            <div>
              <div className="overlay-wrapper">
                {this.loadingScreen(this.state.topicData)}
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-6">{this.renderLeftCategory()}</div>

                    <div className="col-lg-6">{this.renderRightCategory()}</div>
                    {/* row */}
                  </div>
                  <div className="row">
                    <div className="col-lg-6"></div>
                    {/* /.col */}
                    <div className="col-lg-6">
                      <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item">
                          <Link href="/Help">
                            <span
                              class="iconify"
                              data-icon="zmdi:pin-help"
                              data-inline="true"
                            ></span>{" "}
                            Help
                          </Link>
                        </li>
                        <li className="breadcrumb-item active">
                          <Link href="/ContactAdmin">
                            <span
                              class="iconify"
                              data-icon="clarity:help-info-solid"
                              data-inline="true"
                            ></span>{" "}
                            Contact Admin
                          </Link>
                        </li>
                      </ol>
                      {/* /.col */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Info */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(home);
