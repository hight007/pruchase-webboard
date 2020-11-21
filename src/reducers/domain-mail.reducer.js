import {
  HTTP_DOMAINMAIL_FETCHING,
  HTTP_DOMAINMAIL_SUCCESS,
  HTTP_DOMAINMAIL_FAILED,
  HTTP_DOMAINMAIL_ALERTED,
} from "../constants";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
  errorMessage: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_DOMAINMAIL_FETCHING:
      return {
        ...state,
        result: null,
        isFetching: true,
        isError: false,
        errorMessage: null,
      };

    case HTTP_DOMAINMAIL_SUCCESS:
      return {
        ...state,
        result: payload,
        isFetching: false,
        isError: false,
        errorMessage: null,
      };

    case HTTP_DOMAINMAIL_FAILED:
      return {
        ...state,
        result: null,
        isFetching: false,
        isError: true,
        errorMessage: payload,
      };

      case HTTP_DOMAINMAIL_ALERTED:
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
