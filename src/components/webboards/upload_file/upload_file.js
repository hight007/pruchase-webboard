import React, { Component } from "react";
import { apiUrl, key, server } from "../../../constants";
import { Formik } from "formik";
import * as actions from "./../../../actions/webboard_manage_file.action";
import { connect } from "react-redux";
import join from "url-join";

class Upload_file extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadFileType: "",
      createBy: localStorage.getItem(key.USER_EMP),
    };
  }

  showPreviewImage = (values) => {
    if (
      values.file_obj != null &&
      this.state.uploadFileType.includes("image/")
    ) {
      // alert(JSON.stringify(values.file_obj));
      if (values.file_obj) {
        return <img src={values.file_obj} style={{ height: 100 }} />;
      }
    }
  };

  showForm = ({
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  }) => {
    return (
      <form className="form-primary" onSubmit={handleSubmit}>
        <div className="card-body" style={{ marginTop: 5 }}>
          <div className="input-group" style={{ marginTop: 5 }}>
            <div className="input-group-prepend">
              <span className="input-group-text">
                <span
                  class="iconify"
                  data-icon="entypo:upload"
                  data-inline="true"
                ></span>
                <span style={{ color: "#000000", marginLeft: 5 }}>
                  {" "}
                  Upload file{" "}
                </span>
              </span>
            </div>
            {/* <label for="customFile">Custom File</label> */}
            <div className="custom-file">
              <input
                onChange={(e) => {
                  e.preventDefault();
                  if (e.target.files[0].type != null) {
                    this.setState({ uploadFileType: e.target.files[0].type });
                  } else {
                    this.setState({ uploadFileType: "" });
                  }
                  setFieldValue("file", e.target.files[0]); // for upload
                  setFieldValue(
                    "file_obj",
                    URL.createObjectURL(e.target.files[0])
                  ); // for preview image
                  document.getElementById("chooseFile").innerHTML =
                    e.target.files[0].name;
                }}
                type="file"
                name="image"
                multiple
                accept="application/pdf,application/vnd.ms-excel,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/plain,image/*"
                style={{ padding: "20px 0" }}
                className="custom-file-input"
              />
              <label
                className="custom-file-label"
                id="chooseFile"
                htmlFor="customFile"
              >
                Choose file
              </label>
            </div>
          </div>

          {/* preview Image */}
          <div
            className="card-body"
            style={{ marginTop: 5, textAlign: "center" }}
          >
            {this.showPreviewImage(values)}
          </div>
        </div>
        <div className="card-footer" style={{ marginTop: 5 }}>
          <button
            type="submit"
            disabled={
              !isSubmitting && this.state.uploadFileType !== "" ? false : true
            }
            className="btn btn-primary pull-right"
          >
            Upload
          </button>{" "}
          <a
            onClick={() => {
              this.props.history.goBack();
            }}
            type="Button"
            className="btn btn-default float-right"
            style={{ marginRight: 10 }}
          >
            Cancel
          </a>
        </div>
      </form>
    );
  };

  showUploadLink() {
    let { result } = this.props.webboardfileReducer;
    if (result != null) {
      return (
        <div className="card card-success">
          <div class="card-header">
            <h3 class="card-title">Upload file result</h3>
          </div>
          <div className="card-body">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <h4 className="input-group-text">Please copy this link : </h4>
              </div>
              <input
                className="form-control"
                id="uploadLink"
                type="text"
                value={`${join(apiUrl, server.WEBBOARD_FILE_URL)}/${result.id}`}
              ></input>
              <span class="input-group-append">
                <button
                  className="btn btn-block bg-gradient-success"
                  onClick={(e) => {
                    e.preventDefault();
                    var copyText = document.getElementById("uploadLink");
                    copyText.select();
                    copyText.setSelectionRange(0, 99999);
                    document.execCommand("copy");
                  }}
                >
                  copy
                </button>
              </span>
            </div>
          </div>
          <div className="card-footer">
            <button
              type="submit"
              className="btn btn-success pull-right"
              onClick={(e) => {
                e.preventDefault();
                window.location.reload();
              }}
            >
              re-upload
            </button>
          </div>
        </div>
      );
    }
  }

  loadingScreen(data) {
    if (data === true) {
      return (
        <div className="overlay">
          <i className="fas fa-3x fa-sync-alt fa-spin" />
          <div className="text-bold pt-2">Uploading...</div>
        </div>
      );
    }
  }

  renderUploadForm() {
    let { result } = this.props.webboardfileReducer;
    if (result == null) {
      return (
        <div className="card card-primary">
          <div class="card-header">
            <h3 class="card-title">Upload file from</h3>
          </div>

          <div className="overlay-wrapper">
            {this.loadingScreen(this.props.webboardfileReducer.isFetching)}
            <Formik
              initialValues={{ createBy: this.state.createBy }}
              onSubmit={(values, { setSubmitting }) => {
                let formData = new FormData();

                formData.append("file", values.file);
                formData.append("createBy", values.createBy);
                this.props.createWebboardFile(this.props.history, formData);
                setSubmitting(true);
                // if (this.props.webboardfileReducer.result != null) {
                //   setSubmitting(false);
                // }
                setTimeout(() => {
                  setSubmitting(false);
                }, 300);
              }}
            >
              {(props) => this.showForm(props)}
            </Formik>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Upload file</h1>
              </div>
              <div className="col-sm-6"></div>
            </div>
          </div>
          {this.renderUploadForm()}
          {/* /.container-fluid */}
        </section>
        <section className="content">{this.showUploadLink()}</section>
        <section className="content">
          <div className="card card-warning">
            <div class="card-header">
              <h3 class="card-title">Work instruction</h3>
            </div>

            <div className="card-body" style={{ textAlign: "center" }}>
              <div>
                <p>copy url after upload file to create new thread form</p>
              </div>
              <img src="/images/WI.png" />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  webboardfileReducer: state.webboardfileReducer,
});

const mapDispatchToProps = {
  ...actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Upload_file);
