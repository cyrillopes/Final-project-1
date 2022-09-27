import React, { Component } from "react";

class MenuDisplay extends Component {
  orderId = [];
  placeOrder = (id) => {
    this.orderId.push(id);
    this.props.finalOrder(this.orderId);
  };
  removeOrder = (id) => {
    if (this.orderId.indexOf(id) > -1) {
      this.orderId.splice(this.orderId.indexOf(id), 1);
    }
    this.props.finalOrder(this.orderId);
  };
  renderCart = (orders) => {
    if (orders) {
      return orders.map((item, i) => {
        return <b key={i}>{item}&nbsp;</b>;
      });
    }
  };

  renderMenu = ({ menuData }) => {
    if (menuData) {
      return menuData.map((item) => {
        return (
          <div key={item.menu_id}>
            <div className="col-md-4 float-end mt-4">
              <button
                className="btn btn-success"
                onClick={() => {
                  this.placeOrder(item.menu_id);
                }}
              >
                <strong>+</strong>
              </button>
              &nbsp;
              <button
                className="btn btn-danger"
                onClick={() => {
                  this.removeOrder(item.menu_id);
                }}
              >
                <strong>-</strong>
              </button>
            </div>
            <div className="col-md-6">
              <b> &nbsp;{item.menu_id}</b>
              <img src={item.menu_image} style={{ height: 80, width: 80 }} alt="Item img"/>
              &nbsp;
              {item.menu_name} - ₹ {item.menu_price}
            </div>
          </div>
        );
      });
    }
  };

  render() {
    return (
      <>
        <div className="col-md-12 bg-secondary ps-5 py-2">
          <h1 className="">Items added</h1>
          <p className="m-0 py-2">
            Item Number {this.renderCart(this.orderId)} Added
          </p>
        </div>
        <div className="col-md-12 bg-light p-5">
          {this.renderMenu(this.props)}
        </div>
      </>
    );
  }
}
export default MenuDisplay;
