import {
  HTTP_ALERTMAIL_FETCHING,
  HTTP_ALERTMAIL_FAILED,
  HTTP_ALERTMAIL_SUCCESS,
  HTTP_ALERTMAIL_ALERTED,
  server,
  OK,
} from "../constants";
import { httpClient } from "./../utils/HttpClient";
import Swal from "sweetalert2";

export const setStateToFetching = () => ({
  type: HTTP_ALERTMAIL_FETCHING,
});

export const setStateToSuccess = (payload) => ({
  type: HTTP_ALERTMAIL_SUCCESS,
  payload,
});

export const setStateToFailed = (payload) => ({
  type: HTTP_ALERTMAIL_FAILED,
  payload: payload,
});

export const setStateToErrorAlerted = (payload) => ({
  type: HTTP_ALERTMAIL_ALERTED,
  payload: payload,
});

const doGetAlertMail = (dispatch) => {
  httpClient
    .get(server.ALERTMAIL_URL)
    .then((result) => {
      //alert(JSON.stringify(result.data))
      dispatch(setStateToSuccess(result.data));
    })
    .catch((error) => {
      dispatch(setStateToFailed(error));
    });
};

export const getAlertMail = () => {
  return async (dispatch) => {
    dispatch(setStateToFetching());
    doGetAlertMail(dispatch);
  };
};

export const deleteAlertMail = (empNumber, divisionCode) => {
  return async (dispatch) => {
    try {
      dispatch(setStateToFetching());
      await httpClient.delete(server.ALERTMAIL_URL, {
        data: { empNumber, divisionCode },
      });
      doGetAlertMail(dispatch);
    } catch (error) {
      dispatch(setStateToFailed(error));
    }
  };
};

export const createAlertMail = (history, AlertMailData) => {
  return async (dispatch) => {
    dispatch(setStateToFetching());

    if (AlertMailData.empNumber.length < 4) {
      dispatch(setStateToFailed("employee number should be 4-5 digit"));
      return;
    }

    if (AlertMailData.divisionCode.length !== 4) {
      dispatch(setStateToFailed("please select divisionCode"));
      return;
    }

    try {
      let resultBackend = await httpClient.post(
        server.ALERTMAIL_URL,
        AlertMailData
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

export const getAlertMailByKeyword = (event) => {
  return (dispatch) => {
    var keyword = event.target.value;
    dispatch(setStateToFetching());
    try {
      if (keyword !== null && keyword !== "") {
        httpClient
          .get(`${server.ALERTMAIL_URL}/keyword/${keyword}`)
          .then((result) => {
            dispatch(setStateToSuccess(result.data));
          });
      } else {
        doGetAlertMail(dispatch);
      }
    } catch (error) {
      dispatch(setStateToFailed(error));
    }
  };
};

export const showAlertMailErrorAlerted = (messageError) => {
  return async (dispatch) => {
    dispatch(setStateToErrorAlerted(messageError));
    Swal.fire({
      icon: "error",
      title: "Add alert mail error...",
      text: messageError,
    });
  };
};
