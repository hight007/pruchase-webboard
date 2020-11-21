import {
  HTTP_WEBBOARD_CONTENT_FETCHING,
  HTTP_WEBBOARD_CONTENT_FAILED,
  HTTP_WEBBOARD_CONTENT_SUCCESS,
  HTTP_WEBBOARD_CONTENT_ALERTED,
  server,
  OK,
} from "../constants";
import { httpClient } from "./../utils/HttpClient";
import Swal from "sweetalert2";

export const setStateToFetching = () => ({
  type: HTTP_WEBBOARD_CONTENT_FETCHING,
});

export const setStateToSuccess = (payload) => ({
  type: HTTP_WEBBOARD_CONTENT_SUCCESS,
  payload,
});

export const setStateToFailed = (payload) => ({
  type: HTTP_WEBBOARD_CONTENT_FAILED,
  payload: payload,
});

export const setStateToErrorAlerted = (payload) => ({
  type: HTTP_WEBBOARD_CONTENT_ALERTED,
  payload: payload,
});

const doGetWebboardContent = (dispatch) => {
  httpClient
    .get(server.WEBBOARD_CONTENT_URL)
    .then((result) => {
      //alert(JSON.stringify(result.data))
      dispatch(setStateToSuccess(result.data));
    })
    .catch((error) => {
      dispatch(setStateToFailed(error));
    });
};

export const getWebboardContent = () => {
  return async (dispatch) => {
    dispatch(setStateToFetching());
    doGetWebboardContent(dispatch);
  };
};

export const getWebboardContentByCategory = (category) => {
  return async (dispatch) => {
    dispatch(setStateToFetching());
    httpClient
      .get(server.WEBBOARD_CONTENT_URL + "/category=" + category)
      .then((result) => {
        dispatch(setStateToSuccess(result.data));
      })
      .catch((error) => {
        dispatch(setStateToFailed(error));
      });
  };
};

export const deleteWebboardContent = (Content) => {
  return async (dispatch) => {
    try {
      dispatch(setStateToFetching());
      await httpClient.delete(server.WEBBOARD_CONTENT_URL, {
        data: { id: Content.id },
      });
      // doGetWebboardContent(dispatch);
    } catch (error) {
      dispatch(setStateToFailed(error));
    }
  };
};

export const createWebboardContent = (history, WebboardContentData) => {
  return async (dispatch) => {
    dispatch(setStateToFetching());
    if (WebboardContentData.topic.length <= 0) {
      dispatch(setStateToFailed("Please input topic"));
      return;
    }

    if (WebboardContentData.category.length <= 0) {
      dispatch(setStateToFailed("Please select category"));
      return;
    }

    try {
      let resultBackend = await httpClient.post(
        server.WEBBOARD_CONTENT_URL,
        WebboardContentData
      );
      if (resultBackend.data.api_result === OK) {
        dispatch(setStateToSuccess(resultBackend.data.result));
        history.goBack();
      } else {
        dispatch(setStateToFailed(resultBackend.data.error.name));
      }
    } catch (error) {
      dispatch(setStateToFailed(error));
    }
  };
};

export const updateWebboardContent = (history, WebboardContentData) => {
  return async (dispatch) => {
    dispatch(setStateToFetching());
    if (WebboardContentData.topic.length <= 0) {
      dispatch(setStateToFailed("Please input topic"));
      return;
    }

    if (WebboardContentData.category.length <= 0) {
      dispatch(setStateToFailed("Please select category"));
      return;
    }

    try {
      let resultBackend = await httpClient.put(
        server.WEBBOARD_CONTENT_URL,
        WebboardContentData
      );
      if (resultBackend.data.api_result === OK) {
        dispatch(setStateToSuccess(resultBackend.data.result));
        history.goBack();
      } else {
        dispatch(setStateToFailed(resultBackend.data.error.name));
      }
    } catch (error) {
      dispatch(setStateToFailed(error));
    }
  };
};

export const getWebboardContentByKeyword = (event) => {
  return (dispatch) => {
    var keyword = event.target.value;
    dispatch(setStateToFetching());
    try {
      if (keyword !== null && keyword !== "") {
        httpClient
          .get(`${server.WEBBOARD_CONTENT_URL}/keyword/${keyword}`)
          .then((result) => {
            dispatch(setStateToSuccess(result.data));
          });
      } else {
        // doGetWebboardContent(dispatch);
      }
    } catch (error) {
      dispatch(setStateToFailed(error));
    }
  };
};

export const getWebboardContentByKeywordAndCategory = (e, category) => {
  return (dispatch) => {
    // alert(e.target.value + category);
    let keyword = e.target.value;
    dispatch(setStateToFetching());
    try {
      if (keyword !== null && keyword !== "") {
        httpClient
          .get(
            `${server.WEBBOARD_CONTENT_URL}/keyword/keyword=${keyword}&category=${category}`
          )
          .then((result) => {
            dispatch(setStateToSuccess(result.data));
          });
      } else {
        httpClient
          .get(server.WEBBOARD_CONTENT_URL + "/category=" + category)
          .then((result) => {
            dispatch(setStateToSuccess(result.data));
          })
          .catch((error) => {
            dispatch(setStateToFailed(error));
          });
      }
    } catch (error) {
      dispatch(setStateToFailed(error));
    }
  };
};

export const showWebboardContentErrorAlerted = (messageError) => {
  return async (dispatch) => {
    dispatch(setStateToErrorAlerted(messageError));
    Swal.fire({
      icon: "error",
      title: "Webboard Content error...",
      text: messageError,
    });
  };
};
