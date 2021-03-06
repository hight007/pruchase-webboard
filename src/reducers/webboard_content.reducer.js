import {
    HTTP_WEBBOARD_CONTENT_FETCHING,
    HTTP_WEBBOARD_CONTENT_SUCCESS,
    HTTP_WEBBOARD_CONTENT_FAILED,
    HTTP_WEBBOARD_CONTENT_ALERTED,
  } from "../constants";
  
  const initialState = {
    result: null,
    isFetching: false,
    isError: false,
    errorMessage: null,
  };
  
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case HTTP_WEBBOARD_CONTENT_FETCHING:
        return {
          ...state,
          result: null,
          isFetching: true,
          isError: false,
          errorMessage: null,
        };
  
      case HTTP_WEBBOARD_CONTENT_SUCCESS:
        return {
          ...state,
          result: payload,
          isFetching: false,
          isError: false,
          errorMessage: null,
        };
  
      case HTTP_WEBBOARD_CONTENT_FAILED:
        return {
          ...state,
          result: null,
          isFetching: false,
          isError: true,
          errorMessage: payload,
        };
  
        case HTTP_WEBBOARD_CONTENT_ALERTED:
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
  