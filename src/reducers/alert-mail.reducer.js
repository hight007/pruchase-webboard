import {
  HTTP_ALERTMAIL_FETCHING,
  HTTP_ALERTMAIL_SUCCESS,
  HTTP_ALERTMAIL_FAILED,
  HTTP_ALERTMAIL_ALERTED,
} from "../constants";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
  errorMessage: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_ALERTMAIL_FETCHING:
      return {
        ...state,
        result: null,
        isFetching: true,
        isError: false,
        errorMessage: null,
      };

    case HTTP_ALERTMAIL_SUCCESS:
      return {
        ...state,
        result: payload,
        isFetching: false,
        isError: false,
        errorMessage: null,
      };

    case HTTP_ALERTMAIL_FAILED:
      return {
        ...state,
        result: null,
        isFetching: false,
        isError: true,
        errorMessage: payload,
      };

    case HTTP_ALERTMAIL_ALERTED:
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
