import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { stateFromHTML } from "draft-js-import-html";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import React, { Component } from "react";
import { key, server } from "../../../constants";
import { httpClient } from "../../../utils/HttpClient";
import { Link } from "react-router-dom";
import * as moment from "moment";
import { connect } from "react-redux";
import * as actions from "./../../../actions/webboard_content.action";
import { getWebboardCategory } from "../../../actions/webboard_category.action";
import Swal from "sweetalert2";

class Update_content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      id: null,
      topic: "",
      category: "",
      editorState: EditorState.createEmpty(),
      htmlValue: "",
      createBy: localStorage.getItem(key.USER_EMP),
    };
  }

  async componentDidMount() {
    this.props.getWebboardCategory();
    let { id, page } = this.props.match.params;
    let contentResult = await httpClient.get(
      server.WEBBOARD_CONTENT_URL + `/id/id=${id}`
    );
    var data = await contentResult.data.result;
    this.setState({
      data,
      page,
      id,
      topic: data.topic,
      category: data.category,
      editorState: EditorState.createWithContent(stateFromHTML(data.content)),
      htmlValue: data.content,
    });

    //check permission
    if (this.state.data.createBy !== localStorage.getItem(key.USER_EMP)) {
      this.props.history.push(`/webboards/content/content_id=${id}&page=${1}`);
    }
  }

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
                <h1>Edit content</h1>
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
                <h3 class="card-title">Update content form</h3>
              </div>
              <div className="card-body">
                <div className="card">
                  <div className="card-body">
                    <div className="form-group">
                      <label>1.Topic category</label>
                      <select
                        class="form-control"
                        value={this.state.category}
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
                        value={this.state.topic}
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
                      title: "Confirm edit this content?",
                      icon: "info",
                      showCancelButton: true,
                      confirmButtonText: `Edit`,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        Swal.fire("Edited!", "", "success");
                        this.props.updateWebboardContent(this.props.history, {
                          id: this.state.id,
                          topic: this.state.topic,
                          category: this.state.category,
                          content: this.state.htmlValue,
                          createBy: this.state.createBy,
                        });
                      }
                    });
                  }}
                >
                  Edit
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
  webboardContentReducer: state.webboardContentReducer,
  webboardCategoryReducer: state.webboardCategoryReducer,
});

const mapDispatchToProps = {
  ...actions,
  getWebboardCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Update_content);
