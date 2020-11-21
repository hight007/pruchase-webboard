import Swal from "sweetalert2";
import {
  HTTP_PURCODE_FETCHING,
  HTTP_PURCODE_SUCCESS,
  HTTP_PURCODE_FAILED,
  HTTP_PURCODE_ALERTED,
  server,
  OK,
} from "../constants";
import { httpClient } from "./../utils/HttpClient";

export const setStateToFetching = () => ({
  type: HTTP_PURCODE_FETCHING,
});

export const setStateToSuccess = (payload) => ({
  type: HTTP_PURCODE_SUCCESS,
  payload,
});

export const setStateToFailed = (payload) => ({
  type: HTTP_PURCODE_FAILED,
  payload: payload,
});

export const setStateToErrorAlerted = (payload) => ({
  type: HTTP_PURCODE_ALERTED,
  payload: payload,
});

const doGetPurchaseCode = (dispatch) => {
  httpClient
    .get(server.PURCHASECODE_URL)
    .then((result) => {
      //alert(JSON.stringify(result.data))
      dispatch(setStateToSuccess(result.data));
    })
    .catch((error) => {
      dispatch(setStateToFailed(error));
    });
};
 
export const getPurchaseCode = () => {
  return async (dispatch) => {
    dispatch(setStateToFetching());
    doGetPurchaseCode(dispatch);
  };
};

export const deletePurchaseCode = (divisionCode) => {
  return async (dispatch) => {
    dispatch(setStateToFetching());
    await httpClient.delete(server.PURCHASECODE_URL, {
      data: { divisionCode },
    });
    doGetPurchaseCode(dispatch);
  };
};

export const createPurchaseCode = (history, divisionCodeData) => {
  return async (dispatch) => {
    dispatch(setStateToFetching());
    if (divisionCodeData.divisionCode.length < 4) {
      dispatch(setStateToFailed("divisionCode lenght should be 4"));
      return;
    }

    try {
      let resultBackend = await httpClient.post(
        server.PURCHASECODE_URL,
        divisionCodeData
      );
      if (resultBackend.data.api_result === OK) {
        dispatch(setStateToSuccess(resultBackend.data.result));
        history.goBack();
      } else {
        // alert(JSON.stringify(resultBackend.data.error) );
        dispatch(setStateToFailed("backend error"));
      }
    } catch (error) {
      dispatch(setStateToFailed(JSON.stringify(error)));
    }
  };
};

export const getPurchaseCodeByKeyword = (event) => {
  return (dispatch) => {
    var keyword = event.target.value;
    dispatch(setStateToFetching());

    if (keyword !== null && keyword !== "") {
      httpClient
        .get(`${server.PURCHASECODE_URL}/keyword/${keyword}`)
        .then((result) => {
          dispatch(setStateToSuccess(result.data));
        });
    } else {
      doGetPurchaseCode(dispatch);
    }
  };
};


export const showPurchaseCodeErrorAlerted = (messageError) => {
  return async (dispatch) => {
    dispatch(setStateToErrorAlerted(messageError));
    Swal.fire({
      icon: "error",
      title: "purchase code error...",
      text: messageError,
    });
  };
};