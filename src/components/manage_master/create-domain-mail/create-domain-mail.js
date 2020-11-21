import React, { Component } from "react";
import { connect } from "react-redux";
import { key } from "../../../constants/index";
import * as actions from "./../../../actions/domain_mail.action";
import { getPlantCode } from "./../../../actions/plant_code.action";
import { APP_TITLE } from "./../../../constants/index";

class CreateDomainMail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      domainEmail: "",
      PlantCode: "",
      updateBy: localStorage.getItem(key.USER_EMP),
    };
  }

  componentDidMount() {
    document.title = APP_TITLE + " create alert-mail";
    this.props.getPlantCode();
  }

  plantCodeReander = () => {
    const { result, isFetching } = this.props.plantCodeReducer;
    if (!isFetching) {
      try {
        const myResult = result.result;
        return myResult.map((item) => (
          <option value={item.PlantCode}>{item.PlantCode}</option>
        ));
      } catch (error) {}
    }
  };

  showError = () => {
    if (this.props.plantCodeReducer.isError) {
      this.props.showPlantCodeErrorAlerted(
        this.props.plantCodeReducer.errorMessage
      );
    }
    if (this.props.domainMailReducer.isError) {
      this.props.showDomainMailErrorAlerted(
        this.props.domainMailReducer.errorMessage
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
                <h1>Create domain main Form</h1>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>

        <div className="container-fluid">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Create new domain main master</h3>
            </div>
            {/* /.card-header */}
            {/* form start */}
            <form role="form">
              <div className="card-body">
                <div className="form-group">
                  <label>Domain email :</label>
                  <input
                    type="text"
                    maxLength="50"
                    onChange={(e) => {
                      this.setState({ domainEmail: e.target.value });
                    }}
                    className="form-control"
                    placeholder="Enter domain email"
                  />
                </div>

                <div class="form-group">
                  <label>Plant Code :</label>
                  <select
                    class="form-control"
                    onChange={(e) => {
                      this.setState({ PlantCode: e.target.value });
                    }}
                    type="text"
                    className="form-control"
                  >
                    <option>--Please select plant code--</option>
                    {this.plantCodeReander()}
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
                    this.props.createDomainMail(this.props.history, this.state);
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
  domainMailReducer: state.domainMailReducer,
  plantCodeReducer: state.plantCodeReducer,
});

const mapDispatchToProps = {
  ...actions,
  getPlantCode,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDomainMail);
