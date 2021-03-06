import { constant } from "lodash";

// App_Init
export const APP_INIT = "APP_INIT";
export const APP_TITLE = "Purchase webboard";

// Login Page
export const HTTP_LOGIN_FETCHING = "HTTP_LOGIN_FETCHING";
export const HTTP_LOGIN_SUCCESS = "HTTP_LOGIN_SUCCESS";
export const HTTP_LOGIN_FAILED = "HTTP_LOGIN_FAILED";
export const HTTP_LOGIN_ALERTED = "HTTP_LOGIN_ALERTED";

// Register Page
export const HTTP_REGISTER_FETCHING = "HTTP_REGISTER_FETCHING";
export const HTTP_REGISTER_SUCCESS = "HTTP_REGISTER_SUCCESS";
export const HTTP_REGISTER_FAILED = "HTTP_REGISTER_FAILED";
export const HTTP_REGISTER_ALERTED = "HTTP_REGISTER_ALERTED";

// Plant code
export const HTTP_USER_FETCHING = "HTTP_USER_FETCHING";
export const HTTP_USER_SUCCESS = "HTTP_USER_SUCCESS";
export const HTTP_USER_FAILED = "HTTP_USER_FAILED";
export const HTTP_USER_ALERTED = "HTTP_USER_ALERTED";

// Division code
export const HTTP_DIVCODE_FETCHING = "HTTP_DIVCODE_FETCHING";
export const HTTP_DIVCODE_SUCCESS = "HTTP_DIVCODE_SUCCESS";
export const HTTP_DIVCODE_FAILED = "HTTP_DIVCODE_FAILED";
export const HTTP_DIVCODE_ALERTED = "HTTP_DIVCODE_ALERTED";

// Purchase code
export const HTTP_PURCODE_FETCHING = "HTTP_PURCODE_FETCHING";
export const HTTP_PURCODE_SUCCESS = "HTTP_PURCODE_SUCCESS";
export const HTTP_PURCODE_FAILED = "HTTP_PURCODE_FAILED";
export const HTTP_PURCODE_ALERTED = "HTTP_PURCODE_ALERTED";

// Plant code
export const HTTP_PLANTCODE_FETCHING = "HTTP_PLANTCODE_FETCHING";
export const HTTP_PLANTCODE_SUCCESS = "HTTP_PLANTCODE_SUCCESS";
export const HTTP_PLANTCODE_FAILED = "HTTP_PLANTCODE_FAILED";
export const HTTP_PLANTCODE_ALERTED = "HTTP_PLANTCODE_ALERTED";

// Alert mail
export const HTTP_ALERTMAIL_FETCHING = "HTTP_ALERTMAIL_FETCHING";
export const HTTP_ALERTMAIL_SUCCESS = "HTTP_ALERTMAIL_SUCCESS";
export const HTTP_ALERTMAIL_FAILED = "HTTP_ALERTMAIL_FAILED";
export const HTTP_ALERTMAIL_ALERTED = "HTTP_ALERTMAIL_ALERTED";

// Doc Expire div
export const HTTP_DOCEXPIRE_FETCHING = "HTTP_DOCEXPIRE_FETCHING";
export const HTTP_DOCEXPIRE_SUCCESS = "HTTP_DOCEXPIRE_SUCCESS";
export const HTTP_DOCEXPIRE_FAILED = "HTTP_DOCEXPIRE_FAILED";
export const HTTP_DOCEXPIRE_ALERTED = "HTTP_DOCEXPIRE_ALERTED";

// Doc Expire
export const HTTP_DOCEXPIREDIV_FETCHING = "HTTP_DOCEXPIREDIV_FETCHING";
export const HTTP_DOCEXPIREDIV_SUCCESS = "HTTP_DOCEXPIREDIV_SUCCESS";
export const HTTP_DOCEXPIREDIV_FAILED = "HTTP_DOCEXPIREDIV_FAILED";
export const HTTP_DOCEXPIREDIV_ALERTED = "HTTP_DOCEXPIREDIV_ALERTED";

// DOC_EXPIRE_EMAIL
export const HTTP_DOC_EXPIRE_EMAIL_FETCHING = "HTTP_DOC_EXPIRE_EMAIL_FETCHING";
export const HTTP_DOC_EXPIRE_EMAIL_SUCCESS = "HTTP_DOC_EXPIRE_EMAIL_SUCCESS";
export const HTTP_DOC_EXPIRE_EMAIL_FAILED = "HTTP_DOC_EXPIRE_EMAIL_FAILED";
export const HTTP_DOC_EXPIRE_EMAIL_ALERTED = "HTTP_DOC_EXPIRE_EMAIL_ALERTED";

// domain mail
export const HTTP_DOMAINMAIL_FETCHING = "HTTP_DOMAINMAIL_FETCHING";
export const HTTP_DOMAINMAIL_SUCCESS = "HTTP_DOMAINMAIL_SUCCESS";
export const HTTP_DOMAINMAIL_FAILED = "HTTP_DOMAINMAIL_FAILED";
export const HTTP_DOMAINMAIL_ALERTED = "HTTP_DOMAINMAIL_ALERTED";

// WEBBOARD_CATEGORY
export const HTTP_WEBBOARD_CATEGORY_FETCHING =
  "HTTP_WEBBOARD_CATEGORY_FETCHING";
export const HTTP_WEBBOARD_CATEGORY_SUCCESS = "HTTP_WEBBOARD_CATEGORY_SUCCESS";
export const HTTP_WEBBOARD_CATEGORY_FAILED = "HTTP_WEBBOARD_CATEGORY_FAILED";
export const HTTP_WEBBOARD_CATEGORY_ALERTED = "HTTP_WEBBOARD_CATEGORY_ALERTED";

// WEBBOARD_CONTENT
export const HTTP_WEBBOARD_CONTENT_FETCHING = "HTTP_WEBBOARD_CONTENT_FETCHING";
export const HTTP_WEBBOARD_CONTENT_SUCCESS = "HTTP_WEBBOARD_CONTENT_SUCCESS";
export const HTTP_WEBBOARD_CONTENT_FAILED = "HTTP_WEBBOARD_CONTENT_FAILED";
export const HTTP_WEBBOARD_CONTENT_ALERTED = "HTTP_WEBBOARD_CONTENT_ALERTED";

// WEBBOARD_CONTENT
export const HTTP_WEBBOARD_FILE_FETCHING = "HTTP_WEBBOARD_FILE_FETCHING";
export const HTTP_WEBBOARD_FILE_SUCCESS = "HTTP_WEBBOARD_FILE_SUCCESS";
export const HTTP_WEBBOARD_FILE_FAILED = "HTTP_WEBBOARD_FILE_FAILED";
export const HTTP_WEBBOARD_FILE_ALERTED = "HTTP_WEBBOARD_FILE_ALERTED";

// Error Code
export const E_PICKER_CANCELLED = "E_PICKER_CANCELLED";
export const E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR =
  "E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR";
export const E_PERMISSION_MISSING = "E_PERMISSION_MISSING";
export const E_PICKER_NO_CAMERA_PERMISSION = "E_PICKER_NO_CAMERA_PERMISSION";
export const E_USER_CANCELLED = "E_USER_CANCELLED";
export const E_UNKNOWN = "E_UNKNOWN";
export const E_DEVELOPER_ERROR = "E_DEVELOPER_ERROR";
export const TIMEOUT_NETWORK = "ECONNABORTED"; // request service timeout
export const NOT_CONNECT_NETWORK = "NOT_CONNECT_NETWORK";

//////////////// Localization Begin ////////////////
export const NETWORK_CONNECTION_MESSAGE =
  "Cannot connect to server, Please try again.";
export const NETWORK_TIMEOUT_MESSAGE =
  "A network timeout has occurred, Please try again.";
export const UPLOAD_PHOTO_FAIL_MESSAGE =
  "An error has occurred. The photo was unable to upload.";

export const apiUrl = "http://10.120.10.140:5000/api/purchase/";
export const imageUrl = "http://10.120.10.140:5000/";

// export const apiUrl = "http://127.0.0.1:5000/api/purchase/";
// export const imageUrl = "http://127.0.0.1:5000/";

export const YES = "YES";
export const NO = "NO";
export const OK = "ok";
export const NOK = "nok";

export const server = {
  LOGIN_URL: `authen/login`,
  USER_URL: `manage_user/user`,
  VERIFY_EMAIL_URL: `manage_user/verifyEmail`,
  DIVISIONCODE_URL: `manage_master/division`,
  PURCHASECODE_URL: `manage_master/purchaseCode`,
  PLANTCODE_URL: `manage_master/plantCode`,
  ALERTMAIL_URL: "manage_master/alertMail",
  DOMAINMAIL_URL: "manage_master/domainMail",
  WEBBOARD_CATEGORY_URL: "webboard/webboard_category",
  WEBBOARD_CONTENT_URL: "webboard/webboard_content",
  WEBBOARD_FILE_URL: "webboard/file",
  DO_URL: "fileDo",
  DOCUMENT_EXPIRE_URL: "document/documentExpire",
  DOCUMENT_EXPIREDIV_URL: "document/documentExpireDivision",
  DOCUMENT_EXPIRE_EMAIL_URL: "document/documentExpireEmail",
  DOCUMENT_EXPIRE_MONTH_URL: "document/documentExpireMonth",
};

export const key = {
  LOGIN_PASSED: `LOGIN_PASSED`,
  API_KEY: `API_KEY`,
  USER_LV: `USER_LV`,
  USER_NAME: "USER_NAME",
  USER_EMP: "USER_EMP",
  TIME_LOGIN: "TIME_LOGIN",
};
