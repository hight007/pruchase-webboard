import {
    HTTP_DOC_EXPIRE_EMAIL_FETCHING,
    HTTP_DOC_EXPIRE_EMAIL_SUCCESS,
    HTTP_DOC_EXPIRE_EMAIL_FAILED,
    HTTP_DOC_EXPIRE_EMAIL_ALERTED,
  } from "../constants";
  
  const initialState = {
    result: null,
    isFetching: false,
    isError: false,
    errorMessage: null,
  };
  
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case HTTP_DOC_EXPIRE_EMAIL_FETCHING:
        return {
          ...state,
          result: null,
          isFetching: true,
          isError: false,
          errorMessage: null,
        };
  
      case HTTP_DOC_EXPIRE_EMAIL_SUCCESS:
        return {
          ...state,
          result: payload,
          isFetching: false,
          isError: false,
          errorMessage: null,
        };
  
      case HTTP_DOC_EXPIRE_EMAIL_FAILED:
        return {
          ...state,
          result: null,
          isFetching: false,
          isError: true,
          errorMessage: payload,
        };
  
      case HTTP_DOC_EXPIRE_EMAIL_ALERTED:
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
  