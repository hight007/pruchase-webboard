import registerReducer from "./register.reducer";
import loginReducer from "./login.reducer";
import appReducer from "./app.reducer";
import divcodeReducer from "./division_code.reducer";
import purchaseCodeReducer from "./purchase_code.reducer";
import alertMailReducer from "./alert-mail.reducer";
import domainMailReducer from "./domain-mail.reducer";
import plantCodeReducer from "./plant_code.reducer";
import webboardCategoryReducer from "./webboard_category.reducer";
import webboardContentReducer from "./webboard_content.reducer";
import webboardfileReducer from "./webboard_manage_file.reducer";
import manageUserReducer from "./manage_user.reducer";
import docExpireReducer from "./document_expire.reducer";
import docExpireDivReducer from "./doc_expire_div.reducer";
import docExpireMailReducer from "./alart_mail_doc_expire.reducer";

import { combineReducers } from "redux";

export default combineReducers({
  registerReducer,
  loginReducer,
  appReducer,
  divcodeReducer,
  alertMailReducer,
  domainMailReducer,
  plantCodeReducer,
  webboardCategoryReducer,
  webboardContentReducer,
  webboardfileReducer,
  purchaseCodeReducer,
  manageUserReducer,
  docExpireReducer,
  docExpireDivReducer,
  docExpireMailReducer,
});
