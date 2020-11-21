import React, { Component } from "react";
import { connect } from "react-redux";
import { key } from "../../../constants/index";
import * as actions from "./../../../actions/doc_expire_div.action";
import { APP_TITLE } from "./../../../constants/index";
import { getPurchaseCode } from "./../../../actions/purchase_code.action";

class Create_document_expire_division extends Component {
  constructor(props) {
    super(props);

    this.state = {
      documentType: "",
      documentName: "",
      divisionCode: null,
      updateBy: localStorage.getItem(key.USER_EMP),
    };
  }

  componentDidMount() {
    var { documentName, documentType } = this.props.match.params;
    this.setState({ documentName, documentType });
    document.title = APP_TITLE + " create document expire division code";
    if (this.props.purchaseCodeReducer.result === null) {
      this.props.getPurchaseCode();
    }
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
    if (this.props.docExpireDivReducer.isError) {
      this.props.showDocExpireDivErrorAlerted(
        this.props.docExpireDivReducer.errorMessage
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
                <h1>Document expire division Form</h1>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>

        <div className="container-fluid">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">
                Create new document expire division
              </h3>
            </div>
            {/* /.card-header */}
            {/* form start */}
            <form role="form">
              <div className="card-body">
                <div className="form-group">
                  <label>Document name :</label>
                  <input
                    readOnly
                    type="text"
                    maxLength="50"
                    value={this.state.documentName}
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
                    readOnly
                    disabled
                    class="form-control"
                    value={this.state.documentType}
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

                <div class="form-group">
                  <label>Division Code :</label>
                  <select
                    class="form-control"
                    value={this.state.divisionCode}
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
                    this.props.createDocExpireDiv(
                      this.props.history,
                      this.state
                    );
                  }}
                >
                  Add
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
  docExpireDivReducer: state.docExpireDivReducer,
  purchaseCodeReducer: state.purchaseCodeReducer,
});

const mapDispatchToProps = {
  ...actions,
  getPurchaseCode,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create_document_expire_division);
