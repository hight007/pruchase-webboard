import {
  HTTP_WEBBOARD_FILE_FETCHING,
  HTTP_WEBBOARD_FILE_FAILED,
  HTTP_WEBBOARD_FILE_SUCCESS,
  HTTP_WEBBOARD_FILE_ALERTED,
  server,
  OK,
} from "../constants";
import { httpClient } from "./../utils/HttpClient";
import Swal from "sweetalert2";


export const setStateToFetching = () => ({
  type: HTTP_WEBBOARD_FILE_FETCHING,
});

export const setStateToSuccess = (payload) => ({
  type: HTTP_WEBBOARD_FILE_SUCCESS,
  payload,
});

export const setStateToFailed = (payload) => ({
  type: HTTP_WEBBOARD_FILE_FAILED,
  payload: payload,
});

export const setStateToErrorAlerted = (payload) => ({
  type: HTTP_WEBBOARD_FILE_ALERTED,
  payload: payload,
});

const doGetWebboardFile = (dispatch) => {
  httpClient
    .get(server.WEBBOARD_FILE_URL)
    .then((result) => {
      //alert(JSON.stringify(result.data))
      dispatch(setStateToSuccess(result.data));
    })
    .catch((error) => {
      dispatch(setStateToFailed(error));
    });
};

export const getWebboardFile = () => {
  return async (dispatch) => {
    dispatch(setStateToFetching());
    doGetWebboardFile(dispatch);
  };
};

export const deleteWebboardFile = (File) => {
  return async (dispatch) => {
    try {
      dispatch(setStateToFetching());
      await httpClient.delete(server.WEBBOARD_FILE_URL, {
        data: { File },
      });
      doGetWebboardFile(dispatch);
    } catch (error) {
      dispatch(setStateToFailed(error));
    }
  };
};

export const createWebboardFile = (history, WebboardFileData) => {
  return async (dispatch) => {
    dispatch(setStateToFetching());

    try {
      let resultBackend = await httpClient.post(
        server.WEBBOARD_FILE_URL,
        WebboardFileData
      );
      if (resultBackend.data.api_result === OK) {
        // alert(JSON.stringify(resultBackend.data.result));
        dispatch(setStateToSuccess(resultBackend.data.result));
        // var fileURL = await join(apiUrl, server.WEBBOARD_FILE_URL);
        // window.open(`${fileURL}/${resultBackend.data.result.id}`);
        // history.goBack();
      } else {
        dispatch(setStateToFailed(resultBackend.data.error.name));
      }
    } catch (error) {
      dispatch(setStateToFailed(error));
    }
  };
};

export const getWebboardFileByKeyword = (event) => {
  return (dispatch) => {
    var keyword = event.target.value;
    dispatch(setStateToFetching());
    try {
      if (keyword !== null && keyword !== "") {
        httpClient
          .get(`${server.WEBBOARD_FILE_URL}/keyword/${keyword}`)
          .then((result) => {
            dispatch(setStateToSuccess(result.data));
          });
      } else {
        doGetWebboardFile(dispatch);
      }
    } catch (error) {
      dispatch(setStateToFailed(error));
    }
  };
};

export const showWebboardFileErrorAlerted = (messageError) => {
  return async (dispatch) => {
    dispatch(setStateToErrorAlerted(messageError));
    Swal.fire({
      icon: "error",
      title: "Webboard File error...",
      text: messageError,
    });
  };
};
