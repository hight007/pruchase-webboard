import React, { Component } from "react";
import { connect } from "react-redux";
import { key } from "../../../constants/index";
import * as actions from "./../../../actions/document_expire.action";
import { APP_TITLE } from "./../../../constants/index";
import InputMask from "react-input-mask";
import * as moment from "moment"; 

class Create_document_expire extends Component {
  constructor(props) {
    super(props);

    this.state = {
      documentType: "",
      documentName: "",
      divisionCode: null,
      DG_type: null,
      expire_date: null,
      updateBy: localStorage.getItem(key.USER_EMP),
      comment:null,
    };
  }

  componentDidMount() {
    document.title = APP_TITLE + " create document expire";
  }

  showError = () => {
    if (this.props.docExpireReducer.isError) {
      this.props.showDocExpireErrorAlerted(
        this.props.docExpireReducer.errorMessage
      );
    }
  };

  showDate() {
    try {
      var showDate = moment(this.state.expire_date).format("dd DD/MMM/YYYY");
      if (showDate === "Invalid date") {
        showDate = "Please input expire date";
      }
    } catch (error) {}
    return showDate;
  }

  render() {
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Document expire notice Form</h1>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>

        <div className="container-fluid">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Create new document expire notice</h3>
            </div>
            {/* /.card-header */}
            {/* form start */}
            <form role="form">
              <div className="card-body">
                <div className="form-group">
                  <label>Document name :</label>
                  <input
                    type="text"
                    maxLength="50"
                    onChange={(e) => {
                      this.setState({ documentName: e.target.value });
                    }}
                    className="form-control"
                    id="empNumber"
                    name="empNumber"
                    placeholder="Enter document name"
                  />
                </div>

                <div class="form-group">
                  <label>Document Type :</label>
                  <select
                    class="form-control"
                    onChange={(e) => {
                      this.setState({ documentType: e.target.value });
                    }}
                    name="divisionCode"
                    type="text"
                    className="form-control"
                  >
                    <option value={null}>
                      --Please select document type--
                    </option>
                    <option value="วอ.|อก.2">
                      (วอ./อก.2) ใบสำคัญการขึ้นทะเบียนวัตถุอันตราย
                    </option>
                    <option value="วอ.3">
                      (วอ.3) คำขออนุญาตนำเข้าวัตถุอันตราย
                    </option>
                    <option value="วอ.4">
                      (วอ.4) คำขอต่ออายุใบสำคัญการขึ้นทะเบียนวัตถุอันตราย
                    </option>
                    <option value="วอ.|อก.5">
                      (วอ.อก.5) ใบแจ้งการดำเนินการเกี่ยวกับวัตถุอันตรายชนิดที่ 2
                    </option>
                    <option value="วอ.|อก.6">
                      (วอ./อก.6) ?????????????????????????
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <label>DG_type :</label>
                  <input
                    type="text"
                    maxLength="1"
                    onChange={(e) => {
                      this.setState({ DG_type: e.target.value });
                    }}
                    className="form-control"
                    id="empNumber"
                    name="empNumber"
                    placeholder="Enter DG_type"
                  />
                </div>

                <div class="form-group">
                  <label>Expire date : ({this.showDate()})</label>
                  <InputMask
                    className="form-control"
                    alwaysShowMask={false}
                    formatChars={{
                      n: "[0-1]",
                      m: "[0-9]",
                      e: "[0-3]",
                      d: "[0-9]",
                      z: "[2-3]",
                      y: "[0-9]",
                    }}
                    mask="nm/ed/zyyy"
                    maskChar={null}
                    placeholder="mm/dd/yyyy"
                    onChange={(e) => {
                      this.setState({ expire_date: e.target.value });
                    }}
                  />
                </div>

                <div class="form-group">
                  <label>Comment : </label>
                  <textarea
                    className="form-control"
                    onChange={(e) => {
                      this.setState({ comment: e.target.value });
                    }}
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
                    this.props.createDocExpire(this.props.history, this.state);
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
  docExpireReducer: state.docExpireReducer,
});

const mapDispatchToProps = {
  ...actions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create_document_expire);
