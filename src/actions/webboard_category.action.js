import {
  HTTP_WEBBOARD_CATEGORY_FETCHING,
  HTTP_WEBBOARD_CATEGORY_FAILED,
  HTTP_WEBBOARD_CATEGORY_SUCCESS,
  HTTP_WEBBOARD_CATEGORY_ALERTED,
  server,
  OK,
} from "../constants";
import { httpClient } from "./../utils/HttpClient";
import Swal from "sweetalert2";

export const setStateToFetching = () => ({
  type: HTTP_WEBBOARD_CATEGORY_FETCHING,
});

export const setStateToSuccess = (payload) => ({
  type: HTTP_WEBBOARD_CATEGORY_SUCCESS,
  payload,
});

export const setStateToFailed = (payload) => ({
  type: HTTP_WEBBOARD_CATEGORY_FAILED,
  payload: payload,
});

export const setStateToErrorAlerted = (payload) => ({
  type: HTTP_WEBBOARD_CATEGORY_ALERTED,
  payload: payload,
});

const doGetWebboardCategory = (dispatch) => {
  httpClient
    .get(server.WEBBOARD_CATEGORY_URL)
    .then((result) => {
      //alert(JSON.stringify(result.data))
      dispatch(setStateToSuccess(result.data));
    })
    .catch((error) => {
      dispatch(setStateToFailed(error));
    });
};

export const getWebboardCategory = () => {
  return async (dispatch) => {
    dispatch(setStateToFetching());
    doGetWebboardCategory(dispatch);
  };
};

export const deleteWebboardCategory = (category) => {
  return async (dispatch) => {
    try {
      dispatch(setStateToFetching());
      await httpClient.delete(server.WEBBOARD_CATEGORY_URL, {
        data: { category },
      });
      doGetWebboardCategory(dispatch);
    } catch (error) {
      dispatch(setStateToFailed(error));
    }
  };
};

export const createWebboardCategory = (history, WebboardCategoryData) => {
  return async (dispatch) => {
    dispatch(setStateToFetching());

    if (WebboardCategoryData.category.length <= 0) {
      dispatch(setStateToFailed("Please select webboard category"));
      return;
    }

    if (WebboardCategoryData.icon.length <= 0) {
      dispatch(setStateToFailed("Please input icon"));
      return;
    }

    if (WebboardCategoryData.category.length <= 0) {
      dispatch(setStateToFailed("Please select webboard category"));
      return;
    }

    try {
      let resultBackend = await httpClient.post(
        server.WEBBOARD_CATEGORY_URL,
        WebboardCategoryData
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

export const getWebboardCategoryByKeyword = (event) => {
  return (dispatch) => {
    var keyword = event.target.value;
    dispatch(setStateToFetching());
    try {
      if (keyword !== null && keyword !== "") {
        httpClient
          .get(`${server.WEBBOARD_CATEGORY_URL}/keyword/${keyword}`)
          .then((result) => {
            dispatch(setStateToSuccess(result.data));
          });
      } else {
        doGetWebboardCategory(dispatch);
      }
    } catch (error) {
      dispatch(setStateToFailed(error));
    }
  };
};

export const updateWebboardCategory = (history, Data) => {
  return (dispatch) => {
    dispatch(setStateToFetching());
    httpClient
      .put(server.WEBBOARD_CATEGORY_URL, Data)
      .then((result) => {
        dispatch(setStateToSuccess(result));
        history.goBack();
      })
      .catch((error) => {
        dispatch(setStateToFailed(error));
      });
  };
};

export const showWebboardCategoryErrorAlerted = (messageError) => {
  return async (dispatch) => {
    dispatch(setStateToErrorAlerted(messageError));
    Swal.fire({
      icon: "error",
      title: "Webboard Category error...",
      text: messageError,
    });
  };
};
