import {
    HTTP_DOCEXPIREDIV_FETCHING,
    HTTP_DOCEXPIREDIV_SUCCESS,
    HTTP_DOCEXPIREDIV_FAILED,
    HTTP_DOCEXPIREDIV_ALERTED,
  } from "../constants";
  
  const initialState = {
    result: null,
    isFetching: false,
    isError: false,
    errorMessage: null,
  };
  
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case HTTP_DOCEXPIREDIV_FETCHING:
        return {
          ...state,
          result: null,
          isFetching: true,
          isError: false,
          errorMessage: null,
        };
  
      case HTTP_DOCEXPIREDIV_SUCCESS:
        return {
          ...state,
          result: payload,
          isFetching: false,
          isError: false,
          errorMessage: null,
        };
  
      case HTTP_DOCEXPIREDIV_FAILED:
        return {
          ...state,
          result: null,
          isFetching: false,
          isError: true,
          errorMessage: payload,
        };
  
      case HTTP_DOCEXPIREDIV_ALERTED:
        return {
          ...state,
          result: null,
          isFetching: false,
          isError: false,
          errorMessage: payload,
        };
  
      default:
        return state;
    }
  };
  