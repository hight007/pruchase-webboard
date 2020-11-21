import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

class Menu extends Component {
  render() {
    const { pathname } = this.props.location;

    return (
      <aside className="main-sidebar sidebar-light-primary elevation-4">
        {/* Brand Logo */}

        <Link className="brand-link bg-primary" to="/home">
          <img
            src="/images/po-financing-1-300x300.png"
            alt="MIC Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">
            Purchase division
          </span>
        </Link>

        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar Menu */}
          <nav className="mt-2" style={{ overflow: "auto" }}>
            <OverlayScrollbarsComponent>
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                {/* Report */}
                {/* <li className="nav-item has-treeview">
                  <div
                    className={
                      pathname === "/x" ? "nav-link active" : "nav-link"
                    }
                  >
                    <i
                      className="nav-icon iconify"
                      data-icon="bi:bar-chart-line-fill"
                    />
                    <p>
                      Reports
                      <i className="right fas fa-angle-left" />
                    </p>
                  </div>
                  <ul className="nav nav-treeview" style={{ display: "none" }}>
                    <li className="nav-item">
                      <Link
                        to="/Report/await_order"
                        className={
                          pathname === "/Report/await_order"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>Report 1</p>
                      </Link>
                    </li>
                  </ul>
                </li> */}

                {/* Webboard */}
                <li className="nav-item has-treeview">
                  <div
                    className={
                      pathname === "/webboards/upload_file" ||
                      pathname === "/webboards/create/content" ||
                      pathname === "/webboards/main_menu" ||
                      pathname.includes(
                        "/webboards/update/content/content_id="
                      ) ||
                      pathname.includes("/webboards/content/content_id=")
                        ? "nav-link active"
                        : "nav-link"
                    }
                  >
                    <i className="nav-icon iconify" data-icon="vs:whiteboard" />
                    <p>
                      Webboard
                      <i className="fas fa-angle-left right" />
                    </p>
                  </div>
                  <ul className="nav nav-treeview" style={{ display: "none" }}>
                    <li className="nav-item">
                      <Link
                        to="/webboards/main_menu"
                        className={
                          pathname === "/webboards/main_menu"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>main menu</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/webboards/create/content"
                        className={
                          pathname === "/webboards/create/content"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>create content</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/webboards/upload_file"
                        className={
                          pathname === "/webboards/upload_file"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>upload file</p>
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* e-document */}
                <li className="nav-item has-treeview">
                  <div
                    className={
                      pathname ===
                        "/e-document/delivery_order/order_arrived/" ||
                      pathname === "/e-document/delivery_order/share/" ||
                      pathname === "/e-document/document_expire" ||
                      pathname === "/e-document/create/document_expire" ||
                      pathname === "/e-document/edit/document_expire" ||
                      pathname === "/e-document/delivery_order/search/"
                        ? "nav-link active"
                        : "nav-link"
                    }
                  >
                    <i
                      className="nav-icon iconify"
                      data-icon="ion-document-attach-outline"
                    />
                    <p>
                      e-document
                      <i className="fas fa-angle-left right" />
                    </p>
                  </div>
                  <ul className="nav nav-treeview" style={{ display: "none" }}>
                    {/* <li className="nav-item">
                      <Link
                        to="/e-document/delivery_order/order_arrived/"
                        className={
                          pathname ===
                          "/e-document/delivery_order/order_arrived/"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <span
                          className="iconify"
                          data-icon="fa-solid:shipping-fast"
                          data-inline="true"
                        />
                        &nbsp;
                        <p>Order arrived</p>
                      </Link>
                    </li> */}
                    {/* <li className="nav-item">
                      <Link
                        to="/e-document/delivery_order/share/"
                        className={
                          pathname === "/e-document/delivery_order/share/"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <span
                          class="iconify"
                          data-icon="carbon:document-export"
                          data-inline="true"
                        ></span>
                        &nbsp;
                        <p>Share delivery order</p>
                      </Link>
                    </li> */}
                    <li className="nav-item">
                      <Link
                        to="/e-document/delivery_order/search/"
                        className={
                          pathname === "/e-document/delivery_order/search/"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <span
                          class="iconify"
                          data-icon="ant-design:file-search-outlined"
                          data-inline="true"
                        ></span>
                        &nbsp;
                        <p>Search delivery order</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/e-document/document_expire"
                        className={
                          pathname === "/e-document/document_expire"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <span
                          class="iconify"
                          data-icon="grommet-icons:document-time"
                          data-inline="true"
                        ></span>
                        &nbsp;
                        <p>Document expire</p>
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* master */}
                <li className="nav-item has-treeview">
                  <div
                    className={
                      pathname === "/master/divisionCode" ||
                      pathname === "/master/create/divisionCode" ||
                      pathname === "/master/purchaseCode" ||
                      pathname === "/master/create/purchaseCode" ||
                      pathname === "/master/alertMail" ||
                      pathname === "/master/create/alertMail" ||
                      pathname === "/master/domainMail" ||
                      pathname === "/master/create/domainMail" ||
                      pathname === "/master/webboard_category" ||
                      pathname === "/master/create/webboard_category" ||
                      pathname === "/e-document/document_expire_email" ||
                      pathname === "/e-document/create/document_expire_email" ||
                      pathname.includes(
                        "/master/edit/webboard_category/category="
                      )
                        ? "nav-link active"
                        : "nav-link"
                    }
                  >
                    <i
                      className="nav-icon iconify"
                      data-icon="cil:list-numbered"
                    />
                    <p>
                      Manage master
                      <i className="fas fa-angle-left right" />
                    </p>
                  </div>
                  <ul className="nav nav-treeview" style={{ display: "none" }}>
                    <li className="nav-item">
                      <Link
                        to="/master/divisionCode"
                        className={
                          pathname === "/master/divisionCode" ||
                          pathname === "/master/create/divisionCode"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>Division code</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/master/purchaseCode"
                        className={
                          pathname === "/master/purchaseCode" ||
                          pathname === "/master/create/purchaseCode"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>Purchase code</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/master/alertMail"
                        className={
                          pathname === "/master/alertMail" ||
                          pathname === "/master/create/alertMail"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>Alert mail</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/e-document/document_expire_email"
                        className={
                          pathname === "/e-document/document_expire_email" ||
                          pathname ===
                            "/e-document/create/document_expire_email"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>Doc expire alert mail</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/master/domainMail"
                        className={
                          pathname === "/master/domainMail" ||
                          pathname === "/master/create/domainMail"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>Domain mail</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/master/webboard_category"
                        className={
                          pathname === "/master/webboard_category" ||
                          pathname === "/master/create/webboard_category" ||
                          pathname.includes(
                            "/master/edit/webboard_category/category="
                          )
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>Webboard category</p>
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* admin tools */}
                <li className="nav-item has-treeview">
                  <div
                    className={
                      pathname === "/adminTools/userManage" ||
                      pathname.includes("/adminTools/editUser/")
                        ? "nav-link active"
                        : "nav-link"
                    }
                  >
                    <i
                      className="nav-icon iconify"
                      data-icon="bx-bxs-user-detail"
                    />
                    <p>
                      Manage master
                      <i className="fas fa-angle-left right" />
                    </p>
                  </div>
                  <ul className="nav nav-treeview" style={{ display: "none" }}>
                    <li className="nav-item">
                      <Link
                        to="/adminTools/userManage"
                        className={
                          pathname === "/adminTools/userManage"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>User manage</p>
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </OverlayScrollbarsComponent>
          </nav>
          {/* </OverlayScrollbarsComponent> */}
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    );
  }
}

export default withRouter(Menu);
