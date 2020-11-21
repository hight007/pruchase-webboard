import {
  HTTP_DOCEXPIREDIV_FETCHING,
  HTTP_DOCEXPIREDIV_FAILED,
  HTTP_DOCEXPIREDIV_SUCCESS,
  HTTP_DOCEXPIREDIV_ALERTED,
  server,
  OK,
} from "../constants";
import { httpClient } from "../utils/HttpClient";
import Swal from "sweetalert2";
import * as moment from "moment";

export const setStateToFetching = () => ({
  type: HTTP_DOCEXPIREDIV_FETCHING,
});

export const setStateToSuccess = (payload) => ({
  type: HTTP_DOCEXPIREDIV_SUCCESS,
  payload,
});

export const setStateToFailed = (payload) => ({
  type: HTTP_DOCEXPIREDIV_FAILED,
  payload: payload,
});

export const setStateToErrorAlerted = (payload) => ({
  type: HTTP_DOCEXPIREDIV_ALERTED,
  payload: payload,
});

const doGetDocExpireDiv = (dispatch, documentName, documentType) => {
  httpClient
    .get(
      `${server.DOCUMENT_EXPIREDIV_URL}/documentName=${documentName}&documentType=${documentType}`
    )
    .then((result) => {
      //alert(JSON.stringify(result.data))
      dispatch(setStateToSuccess(result.data));
    })
    .catch((error) => {
      dispatch(setStateToFailed(error));
    });
};

export const getDocExpireDiv = (documentName, documentType) => {
  return async (dispatch) => {
    dispatch(setStateToFetching());
    doGetDocExpireDiv(dispatch, documentName, documentType);
  };
};

export const deleteDocExpireDiv = (
  documentName,
  documentType,
  divisionCode
) => {
  return async (dispatch) => {
    try {
      dispatch(setStateToFetching());
      await httpClient.delete(server.DOCUMENT_EXPIREDIV_URL, {
        data: { documentName, documentType, divisionCode },
      });
      doGetDocExpireDiv(dispatch, documentName, documentType);
    } catch (error) {
      dispatch(setStateToFailed(error));
    }
  };
};

export const createDocExpireDiv = (history, DocExpireData) => {
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
        server.DOCUMENT_EXPIREDIV_URL,
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

export const showDocExpireDivErrorAlerted = (messageError) => {
  return async (dispatch) => {
    dispatch(setStateToErrorAlerted(messageError));
    Swal.fire({
      icon: "error",
      title: "doc expire error...",
      text: messageError,
    });
  };
};
