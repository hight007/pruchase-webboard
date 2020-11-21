import {
  HTTP_DOMAINMAIL_FETCHING,
  HTTP_DOMAINMAIL_FAILED,
  HTTP_DOMAINMAIL_SUCCESS,
  HTTP_DOMAINMAIL_ALERTED,
  server,
  OK,
} from "../constants";
import { httpClient } from "./../utils/HttpClient";
import Swal from "sweetalert2";

export const setStateToFetching = () => ({
  type: HTTP_DOMAINMAIL_FETCHING,
});

export const setStateToSuccess = (payload) => ({
  type: HTTP_DOMAINMAIL_SUCCESS,
  payload,
});

export const setStateToFailed = (payload) => ({
  type: HTTP_DOMAINMAIL_FAILED,
  payload: payload,
});

export const setStateToErrorAlerted = (payload) => ({
  type: HTTP_DOMAINMAIL_ALERTED,
  payload: payload,
});

const doGetDomainMail = (dispatch) => {
  httpClient
    .get(server.DOMAINMAIL_URL)
    .then((result) => {
      //alert(JSON.stringify(result.data))
      dispatch(setStateToSuccess(result.data));
    })
    .catch((error) => {
      dispatch(setStateToFailed(error));
    });
};

export const getDomainMail = () => {
  return async (dispatch) => {
    dispatch(setStateToFetching());
    doGetDomainMail(dispatch);
  };
};

export const deleteDomainMail = (PlantCode) => {
  return async (dispatch) => {
    try {
      dispatch(setStateToFetching());
      await httpClient.delete(server.DOMAINMAIL_URL, {
        data: { PlantCode },
      });
      doGetDomainMail(dispatch);
    } catch (error) {
      dispatch(setStateToFailed(error));
    }
  };
};

export const createDomainMail = (history, DomainMailData) => {
  return async (dispatch) => {
    dispatch(setStateToFetching());
    try {
      let resultBackend = await httpClient.post(
        server.DOMAINMAIL_URL,
        DomainMailData
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

export const getDomainMailByKeyword = (event) => {
  return (dispatch) => {
    var keyword = event.target.value;
    dispatch(setStateToFetching());
    try {
      if (keyword !== null && keyword !== "") {
        httpClient
          .get(`${server.DOMAINMAIL_URL}/keyword/${keyword}`)
          .then((result) => {
            dispatch(setStateToSuccess(result.data));
          });
      } else {
        doGetDomainMail(dispatch);
      }
    } catch (error) {
      dispatch(setStateToFailed(error));
    }
  };
};

export const showDomainMailErrorAlerted = (messageError) => {
  return async (dispatch) => {
    dispatch(setStateToErrorAlerted(messageError));
    Swal.fire({
      icon: "error",
      title: "Alert mail error...",
      text: messageError,
    });
  };
};
