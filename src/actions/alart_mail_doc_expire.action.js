import {
  HTTP_DOC_EXPIRE_EMAIL_FETCHING,
  HTTP_DOC_EXPIRE_EMAIL_FAILED,
  HTTP_DOC_EXPIRE_EMAIL_SUCCESS,
  HTTP_DOC_EXPIRE_EMAIL_ALERTED,
  server,
  OK,
} from "../constants";
import { httpClient } from "./../utils/HttpClient";
import Swal from "sweetalert2";

export const setStateToFetching = () => ({
  type: HTTP_DOC_EXPIRE_EMAIL_FETCHING,
});

export const setStateToSuccess = (payload) => ({
  type: HTTP_DOC_EXPIRE_EMAIL_SUCCESS,
  payload,
});

export const setStateToFailed = (payload) => ({
  type: HTTP_DOC_EXPIRE_EMAIL_FAILED,
  payload: payload,
});

export const setStateToErrorAlerted = (payload) => ({
  type: HTTP_DOC_EXPIRE_EMAIL_ALERTED,
  payload: payload,
});

const doGetdocExpireEmail = (dispatch) => {
  httpClient
    .get(server.DOCUMENT_EXPIRE_EMAIL_URL)
    .then((result) => {
      //alert(JSON.stringify(result.data))
      dispatch(setStateToSuccess(result.data));
    })
    .catch((error) => {
      dispatch(setStateToFailed(error));
    });
};

export const getdocExpireEmail = () => {
  return async (dispatch) => {
    dispatch(setStateToFetching());
    doGetdocExpireEmail(dispatch);
  };
};

export const deletedocExpireEmail = (email) => {
  return async (dispatch) => {
    try {
      dispatch(setStateToFetching());
      await httpClient.delete(server.DOCUMENT_EXPIRE_EMAIL_URL, {
        data: { email },
      });
      doGetdocExpireEmail(dispatch);
    } catch (error) {
      dispatch(setStateToFailed(error));
    }
  };
};

export const createdocExpireEmail = (history, docExpireEmailData) => {
  return async (dispatch) => {
    dispatch(setStateToFetching());

    try {
      let resultBackend = await httpClient.post(
        server.DOCUMENT_EXPIRE_EMAIL_URL,
        docExpireEmailData
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

export const getdocExpireEmailByKeyword = (event) => {
  return (dispatch) => {
    var keyword = event.target.value;
    dispatch(setStateToFetching());
    try {
      if (keyword !== null && keyword !== "") {
        httpClient
          .get(`${server.DOCUMENT_EXPIRE_EMAIL_URL}/keyword/${keyword}`)
          .then((result) => {
            dispatch(setStateToSuccess(result.data));
          });
      } else {
        doGetdocExpireEmail(dispatch);
      }
    } catch (error) {
      dispatch(setStateToFailed(error));
    }
  };
};

export const showdocExpireEmailErrorAlerted = (messageError) => {
  return async (dispatch) => {
    dispatch(setStateToErrorAlerted(messageError));
    Swal.fire({
      icon: "error",
      title: "document expire alert mail error...",
      text: messageError,
    });
  };
};
