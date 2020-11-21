import {
  HTTP_DOCEXPIRE_FETCHING,
  HTTP_DOCEXPIRE_FAILED,
  HTTP_DOCEXPIRE_SUCCESS,
  HTTP_DOCEXPIRE_ALERTED,
  server,
  OK,
} from "../constants";
import { httpClient } from "./../utils/HttpClient";
import Swal from "sweetalert2";
import * as moment from "moment";

export const setStateToFetching = () => ({
  type: HTTP_DOCEXPIRE_FETCHING,
});

export const setStateToSuccess = (payload) => ({
  type: HTTP_DOCEXPIRE_SUCCESS,
  payload,
});

export const setStateToFailed = (payload) => ({
  type: HTTP_DOCEXPIRE_FAILED,
  payload: payload,
});

export const setStateToErrorAlerted = (payload) => ({
  type: HTTP_DOCEXPIRE_ALERTED,
  payload: payload,
});

const doGetDocExpire = (dispatch) => {
  httpClient
    .get(server.DOCUMENT_EXPIRE_URL)
    .then((result) => {
      //alert(JSON.stringify(result.data))
      dispatch(setStateToSuccess(result.data));
    })
    .catch((error) => {
      dispatch(setStateToFailed(error));
    });
};

export const getDocExpire = () => {
  return async (dispatch) => {
    dispatch(setStateToFetching());
    doGetDocExpire(dispatch);
  };
};

export const deleteDocExpire = (documentName, documentType) => {
  return async (dispatch) => {
    try {
      dispatch(setStateToFetching());
      await httpClient.delete(server.DOCUMENT_EXPIRE_URL, {
        data: { documentName, documentType },
      });
      doGetDocExpire(dispatch);
    } catch (error) {
      dispatch(setStateToFailed(error));
    }
  };
};

export const createDocExpire = (history, DocExpireData) => {
  return async (dispatch) => {
    dispatch(setStateToFetching());
    if (
      DocExpireData.documentName === null ||
      DocExpireData.documentName === ""
    ) {
      dispatch(setStateToFailed("Please enter document name"));
      return;
    }

    if (
      DocExpireData.documentType === null ||
      DocExpireData.documentType === ""
    ) {
      dispatch(setStateToFailed("Please select document type"));
      return;
    }

    if (
      moment(DocExpireData.expire_date).format("dd DD/MMM/YYYY") ===
      "Invalid date"
    ) {
      dispatch(setStateToFailed("Expire date error"));
      return;
    }

    try {
      let resultBackend = await httpClient.post(
        server.DOCUMENT_EXPIRE_URL,
        DocExpireData
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

export const editDocExpire = (history, DocExpireData) => {
  return async (dispatch) => {
    dispatch(setStateToFetching());
    if (
      DocExpireData.documentName === null ||
      DocExpireData.documentName === ""
    ) {
      dispatch(setStateToFailed("Please enter document name"));
      return;
    }

    if (
      DocExpireData.documentType === null ||
      DocExpireData.documentType === ""
    ) {
      dispatch(setStateToFailed("Please select document type"));
      return;
    }

    if (
      moment(DocExpireData.expire_date).format("dd DD/MMM/YYYY") ===
      "Invalid date"
    ) {
      dispatch(setStateToFailed("Expire date error"));
      return;
    }

    try {
      let resultBackend = await httpClient.put(
        server.DOCUMENT_EXPIRE_URL,
        DocExpireData
      );
      if (resultBackend.data.api_result === OK) {
        dispatch(setStateToSuccess(resultBackend.data.result));
        history.push("/e-document/document_expire");
      } else {
        dispatch(setStateToFailed(resultBackend.data.error.name));
      }
    } catch (error) {
      dispatch(setStateToFailed(error));
    }
  };
};

export const getDocExpireByKeyword = (event) => {
  return (dispatch) => {
    var keyword = event.target.value;
    dispatch(setStateToFetching());
    try {
      if (keyword !== null && keyword !== "") {
        httpClient
          .get(`${server.DOCUMENT_EXPIRE_URL}/keyword/${keyword}`)
          .then((result) => {
            dispatch(setStateToSuccess(result.data));
          });
      } else {
        doGetDocExpire(dispatch);
      }
    } catch (error) {
      dispatch(setStateToFailed(error));
    }
  };
};

export const showDocExpireErrorAlerted = (messageError) => {
  return async (dispatch) => {
    dispatch(setStateToErrorAlerted(messageError));
    Swal.fire({
      icon: "error",
      title: "doc expire error...",
      text: messageError,
    });
  };
};
