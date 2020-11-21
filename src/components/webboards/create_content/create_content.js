import React, { Component } from "react";
import { connect } from "react-redux";
// import * as moment from "moment";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import { Link } from "react-router-dom";
import draftToHtml from "draftjs-to-html";
// import htmlToDraft from "html-to-draftjs";
import { getWebboardCategory } from "../../../actions/webboard_category.action";
import {
  createWebboardContent,
  showWebboardContentErrorAlerted,
} from "../../../actions/webboard_content.action";
import Swal from "sweetalert2";
import { key } from "../../../constants";

class CreateThread extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topic: "",
      category: "",
      editorState: EditorState.createEmpty(),
      htmlValue: "",
      createBy: localStorage.getItem(key.USER_EMP),
    };
  }

  componentDidMount() {
    this.props.getWebboardCategory();
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
      htmlValue: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    });
  };

  webboardCategoryReander = () => {
    const { result, isFetching } = this.props.webboardCategoryReducer;
    if (!isFetching) {
      try {
        const myResult = result.result;
        return myResult.map((item) => (
          <option value={item.category}>
            {item.category + ` (${item.type})`}
          </option>
        ));
      } catch (error) {}
    }
  };

  showError = () => {
    if (this.props.webboardContentReducer.isError) {
      this.props.showWebboardContentErrorAlerted(
        this.props.webboardContentReducer.errorMessage
      );
    }
  };

  render() {
    const { editorState } = this.state;
    return (
      <div className="content-wrapper ">
        {this.showError()}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Create new content</h1>
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
            <div className="card card-primary">
              <div class="card-header">
                <h3 class="card-title">New content form</h3>
              </div>
              <div className="card-body">
                <div className="card">
                  <div className="card-body">
                    <div className="form-group">
                      <label>1.Topic category</label>
                      <select
                        class="form-control"
                        onChange={(e) => {
                          this.setState({ category: e.target.value });
                        }}
                        name="divisionCode"
                        type="text"
                        className="form-control"
                      >
                        <option>--Please select category--</option>
                        {this.webboardCategoryReander()}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>2.Topic name</label>
                      <input
                        type="text"
                        autocomplete="off"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter your topic name"
                        autoFocus
                        onChange={(e) => {
                          this.setState({ topic: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <label>3.Topic detail</label>
                    <Editor
                      editorState={editorState}
                      wrapperClassName="demo-wrapper"
                      editorClassName="demo-editor"
                      onEditorStateChange={this.onEditorStateChange}
                    />
                  </div>
                  {/* <textarea disabled value={this.state.htmlValue} /> */}
                </div>
              </div>
              <div class="card-footer">
                <button
                  type="submit"
                  class="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    Swal.fire({
                      title: "Confirm post this topic?",
                      icon: "info",
                      showCancelButton: true,
                      confirmButtonText: `Post`,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        Swal.fire("Posted!", "", "success");
                        this.props.createWebboardContent(this.props.history, {
                          topic: this.state.topic,
                          category: this.state.category,
                          content: this.state.htmlValue,
                          createBy: this.state.createBy,
                        });
                      }
                    });
                  }}
                >
                  Submit
                </button>
                <button
                  type="submit"
                  class="btn btn-default float-right"
                  onClick={(e) => {
                    e.preventDefault();
                    this.props.history.goBack();
                  }}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  webboardCategoryReducer: state.webboardCategoryReducer,
  webboardContentReducer: state.webboardContentReducer,
});

const mapDispatchToProps = {
  getWebboardCategory,
  createWebboardContent,
  showWebboardContentErrorAlerted,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateThread);
