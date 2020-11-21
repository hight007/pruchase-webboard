import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import home from "./components/home/home";
import verifyEmail from "./components/verifyEmail/verifyEmail";
import forgetPassword from "./components/forgetPassword/forgetPassword";
import changePassword from "./components/changePassword/changePassword";
import "overlayscrollbars/css/OverlayScrollbars.css";

// master
import manage_divisionCode from "./components/manage_master/divisionCode/divisionCode";
import create_divisionCode from "./components/manage_master/create-divisionCode/create-divisionCode";

import manage_purchaseCode from "./components/manage_master/purchase_code/purchase_code";
import create_purchaseCode from "./components/manage_master/create_purchase_code/create_purchase_code";

import manage_alert_mail from "./components/manage_master/alert-mail/alert-mail";
import create_alert_mail from "./components/manage_master/create-alert-mail/create-alert-mail";

import manage_domain_mail from "./components/manage_master/domain-mail/domain-mail";
import create_domain_mail from "./components/manage_master/create-domain-mail/create-domain-mail";

import manage_webboard_category from "./components/manage_master/webboard_category/webboard_category";
import create_webboard_category from "./components/manage_master/create_webboard_category/create_webboard_category";
import edit_webboard_category from "./components/manage_master/edit_webboard_category/edit_webboard_category";

// e-document
import eDocument_order_arrived from "./components/e-document/order_arrived/order_arrived";
import eDocument_search_delivery_order from "./components/e-document/search_delivery_order/search_delivery_order";
import eDocument_share_delivery_order from "./components/e-document/share_delivery_order/share_delivery_order";
import eDocument_document_expire from "./components/e-document/document_expire/document_expire";
import eDocument_create_document_expire from "./components/e-document/create_document_expire/create_document_expire";
import eDocument_edit_document_expire from "./components/e-document/edit_document_expire/edit_document_expire";
import eDocument_create_document_expire_division from "./components/e-document/create_document_expire_division/create_document_expire_division";
import eDocument_eidt_document_expire_division from "./components/e-document/edit_document_expore_division/edit_document_expore_division";
import eDocument_create_document_expire_email from "./components/e-document/create_document_expire_alert_email/create_document_expire_alert_email";
import eDocument_document_expire_email from "./components/e-document/document_expire_alert_email/document_expire_alert_email";
import eDocument_alert_condition from "./components/e-document/document_expire_month/document_expire_month";

//Webboards
import webboard_create_content from "./components/webboards/create_content/create_content";
import webboard_upload_file from "./components/webboards/upload_file/upload_file";
import webboard_show_content from "./components/webboards/show_content/show_content";
import webboard_update_content from "./components/webboards/update_content/update_content";
import webboard_main_menu from "./components/webboards/main_menu/main_menu";
import webboard_list_content from "./components/webboards/list_content/list_content";

//Admin tools
import userManage from "./components/adminTools/userManage/userManage";
import editUser from "./components/adminTools/edit_user/edit_user";

import { APP_TITLE } from "./constants/index";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import React, { Component } from "react";
import { key, YES } from "./constants";
import { setApp } from "./actions/app.action";
import { connect } from "react-redux";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import * as moment from "moment";

const MySwal = withReactContent(Swal);

const isLoggedIn = () => {
  return localStorage.getItem(key.LOGIN_PASSED) === YES;
};

const isPowerUser = () => {
  if (
    localStorage.getItem(key.USER_LV) === "power" ||
    localStorage.getItem(key.USER_LV) === "admin"
  ) {
    return true;
  } else {
    return false;
  }
};

const isLoginTimeOut = (value, unit) => {
  const loginTime = moment(localStorage.getItem(key.TIME_LOGIN))
    .add(value, unit)
    .toDate();
  if (loginTime < moment()) {
    localStorage.removeItem(key.LOGIN_PASSED);
    localStorage.removeItem(key.API_KEY);
    localStorage.removeItem(key.USER_NAME);
    localStorage.removeItem(key.USER_LV);
    localStorage.removeItem(key.USER_EMP);
    localStorage.removeItem(key.TIME_LOGIN);

    MySwal.fire({
      icon: "info",
      title: "Login timeout",
      text: "Please re login again...",
      showCancelButton: false,
    }).then(() => {
      window.location.replace("../login");
    });
    return true;
  } else {
    return false;
  }
};

// Protected Route
const SecuredRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn() === true && isLoginTimeOut(4, "h") === false ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const SecuredLVRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn() === true && isLoginTimeOut(1, "h") === false ? (
        isPowerUser() === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/home" />
        )
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

class App extends Component {
  componentDidMount() {
    this.props.setApp(this);
  }

  redirectToLogin = () => {
    return <Redirect to="/login" />;
  };

  render() {
    document.title = APP_TITLE;
    return (
      <Router>
        <div>
          {isLoggedIn() && <Header />}
          {isLoggedIn() && <Menu />}

          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <SecuredRoute path="/home" component={home} />
            <Route path="/user/forgetPassword" component={forgetPassword} />
            <Route
              path="/verifyEmail/:username/:randomKey"
              component={verifyEmail}
            />
            <SecuredRoute
              path="/user/changePassword"
              component={changePassword}
            />
            {/* AdminTools */}
            <SecuredLVRoute
              path="/adminTools/userManage"
              component={userManage}
            />
            <SecuredLVRoute
              path="/adminTools/editUser/username=:username&levelUser=:levelUser"
              component={editUser}
            />
            {/* master */}
            <SecuredLVRoute
              path="/master/divisionCode"
              component={manage_divisionCode}
            />
            <SecuredLVRoute
              path="/master/create/divisionCode"
              component={create_divisionCode}
            />
            <SecuredLVRoute
              path="/master/purchaseCode"
              component={manage_purchaseCode}
            />
            <SecuredLVRoute
              path="/master/create/purchaseCode"
              component={create_purchaseCode}
            />
            <SecuredLVRoute
              path="/master/alertMail"
              component={manage_alert_mail}
            />
            <SecuredLVRoute
              path="/master/create/alertMail"
              component={create_alert_mail}
            />
            <SecuredLVRoute
              path="/master/domainMail"
              component={manage_domain_mail}
            />
            <SecuredLVRoute
              path="/master/create/domainMail"
              component={create_domain_mail}
            />
            <SecuredLVRoute
              path="/master/webboard_category"
              component={manage_webboard_category}
            />
            <SecuredLVRoute
              path="/master/create/webboard_category"
              component={create_webboard_category}
            />
            <SecuredLVRoute
              path="/master/edit/webboard_category/category=:category"
              component={edit_webboard_category}
            />
            {/* e-document */}
            <SecuredRoute
              path="/e-document/delivery_order/order_arrived"
              component={eDocument_order_arrived}
            />
            <SecuredRoute
              path="/e-document/delivery_order/search"
              component={eDocument_search_delivery_order}
            />
            <SecuredRoute
              path="/e-document/delivery_order/share"
              component={eDocument_share_delivery_order}
            />
            <SecuredRoute
              path="/e-document/document_expire"
              component={eDocument_document_expire}
            />
            <SecuredRoute
              path="/e-document/create/document_expire"
              component={eDocument_create_document_expire}
            />
            <SecuredRoute
              path="/e-document/edit/document_expire/documentName=:documentName&documentType=:documentType"
              component={eDocument_edit_document_expire}
            />
            <SecuredRoute
              path="/e-document/create/document_expire_division/documentName=:documentName&documentType=:documentType"
              component={eDocument_create_document_expire_division}
            />
            <SecuredRoute
              path="/e-document/edit/document_expire_division/documentName=:documentName&documentType=:documentType"
              component={eDocument_eidt_document_expire_division}
            />
            <SecuredRoute
              path="/e-document/document_expire_email"
              component={eDocument_document_expire_email}
            />
            <SecuredRoute
              path="/e-document/create/document_expire_email"
              component={eDocument_create_document_expire_email}
            />
            <SecuredRoute
              path="/e-document/document_expire_alert_condition"
              component={eDocument_alert_condition}
            />

            {/* webboard */}
            <SecuredRoute
              path="/webboards/create/content"
              component={webboard_create_content}
            />
            <SecuredRoute
              path="/webboards/upload_file"
              component={webboard_upload_file}
            />
            <SecuredRoute
              path="/webboards/content/content_id=:id&page=:page"
              component={webboard_show_content}
            />
            <SecuredRoute
              path="/webboards/update/content/content_id=:id"
              component={webboard_update_content}
            />
            <SecuredRoute
              path="/webboards/main_menu"
              component={webboard_main_menu}
            />
            <SecuredRoute
              path="/webboards/list_content/category=:category"
              component={webboard_list_content}
            />
            <Route exact={true} path="/" component={this.redirectToLogin} />
            <Route exact={true} path="*" component={this.redirectToLogin} />
          </Switch>
          {isLoggedIn() && <Footer />}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  appReducer: state.appReducer,
});
const mapDispatchToProps = {
  setApp,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
