import React, { Component } from "react";

class Order_arrived extends Component {
  render() {
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>
                  Order arrived&nbsp;
                  <span
                    className="iconify"
                    data-icon="fa-solid:shipping-fast"
                    data-inline="true"
                  />
                </h1>
              </div>
              <div className="col-sm-6"></div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>

        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                {/* general form elements */}
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">2D scan tab</h3>
                  </div>
                  {/* /.card-header */}
                  {/* form start */}
                  <div className="card-body">
                    <div style={{ textAlign: "center" }}>
                      <img
                        src="/images/scan2D.gif"
                        alt="MIC Logo"
                        className="img-fluid mb-3"
                        style={{ maxHeight: 100 }}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">
                        Delivery Order(DO) number :
                      </label>
                      <input
                        autoFocus
                        type="text"
                        autocomplete="off"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Scan delivery order number"
                      />
                    </div>
                  </div>
                  {/* /.card-body */}
                  <div className="card-footer">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Order_arrived;
