import React, { Component } from "react";
import { connect } from "react-redux";
import { key } from "../../../constants/index";
import * as actions from "./../../../actions/alert_mail.action";
import { getPurchaseCode } from "./../../../actions/purchase_code.action";
import { APP_TITLE } from "./../../../constants/index";

class CreateAlertMail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      divisionCode: "",
      empNumber: "",
      updateBy: localStorage.getItem(key.USER_EMP),
    };
  }

  componentDidMount() {
    document.title = APP_TITLE + " create alert-mail";
    this.props.getPurchaseCode();
  }

  purchaseCodeReander = () => {
    const { result, isFetching } = this.props.purchaseCodeReducer;
    if (!isFetching) {
      try {
        const myResult = result.result;
        return myResult.map((item) => (
          <option value={item.divisionCode}>
            {`(${item.divisionCode}) ` + item.divisionName}
          </option>
        ));
      } catch (error) {}
    }
  };

  showError = () => {
    if (this.props.alertMailReducer.isError) {
      this.props.showAlertMailErrorAlerted(
        this.props.alertMailReducer.errorMessage
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
                <h1>Create alert mail Form</h1>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>

        <div className="container-fluid">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Create new alert mail master</h3>
            </div>
            {/* /.card-header */}
            {/* form start */}
            <form role="form">
              <div className="card-body">
                <div className="form-group">
                  <label>Employee number :</label>
                  <input
                    type="text"
                    maxLength="7"
                    onChange={(e) => {
                      this.setState({ empNumber: e.target.value });
                    }}
                    className="form-control"
                    id="empNumber"
                    name="empNumber"
                    placeholder="Enter employee number"
                  />
                </div>

                <div class="form-group">
                  <label>Division Code :</label>
                  <select
                    class="form-control"
                    onChange={(e) => {
                      this.setState({ divisionCode: e.target.value });
                    }}
                    name="divisionCode"
                    type="text"
                    className="form-control"
                  >
                    <option>--Please select division code--</option>
                    {this.purchaseCodeReander()}
                  </select>
                </div>
              </div>
              {/* /.card-body */}
              <div className="card-footer">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    this.props.createAlertMail(this.props.history, this.state);
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
  alertMailReducer: state.alertMailReducer,
  purchaseCodeReducer: state.purchaseCodeReducer,
});

const mapDispatchToProps = {
  ...actions,
  getPurchaseCode,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAlertMail);
