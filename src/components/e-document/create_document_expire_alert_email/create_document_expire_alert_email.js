import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
import Moment from "react-moment";
import * as actions from "./../../../actions/alart_mail_doc_expire.action";
import { APP_TITLE, key } from "./../../../constants/index";
import Swal from "sweetalert2";

class Create_document_expire_alert_email extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      updateBy: localStorage.getItem(key.USER_EMP),
    };
  }

  componentDidMount() {
    document.title = APP_TITLE + " create document epire alert email";
  }

  showError = () => {
    if (this.props.docExpireMailReducer.isError) {
      this.props.showdocExpireEmailErrorAlerted(
        this.props.docExpireMailReducer.errorMessage
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
                <h1>Create document expire alert email Form</h1>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>

        <div className="container-fluid">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">
                Create document expire alert email master
              </h3>
            </div>
            {/* /.card-header */}
            {/* form start */}
            <form role="form">
              <div className="card-body">
                <div className="form-group">
                  <label>Alert email :</label>
                  <input
                    type="email"
                    onChange={(e) => {
                      this.setState({ email: e.target.value });
                    }}
                    className="form-control"
                    placeholder="Enter document expire alert email"
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
                    this.props.createdocExpireEmail(
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
  docExpireMailReducer: state.docExpireMailReducer,
});

const mapDispatchToProps = {
  ...actions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create_document_expire_alert_email);
 