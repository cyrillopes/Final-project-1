import React, { Component } from "react";
import HeaderMain from "../Header/HeaderMain";

const url = "https://poke-us.herokuapp.com/menuItem";

const placeOrderUrl = "https://poke-us.herokuapp.com/placeOrder";
let orderId = [];

class PlaceOrder extends Component {
  constructor(props) {
    super(props);
    let sessionData = sessionStorage.getItem("userInfo")
      ? sessionStorage.getItem("userInfo").split(",")
      : [];

    this.state = {
      id: Math.floor(Math.random() * 10000),
      restaurant_name: this.props.match.params.restName,
      name: sessionData ? sessionData[0] : "",
      email: sessionData ? sessionData[1] : "",
      cost: 0,
      phone: sessionData ? sessionData[2] : "",
      address: "769 St. Lewis Street",
      menuItem: "",
    };
    console.log(this.state.restaurant_name);
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  checkout = () => {
    let obj = this.state;
    obj.menuItem = sessionStorage.getItem("menu");
    fetch(placeOrderUrl, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      // .then(this.props.history.push("/viewOrders"));
      .then(console.log("order added"));
  };

  renderItem = (data) => {
    if (data) {
      return data.map((item) => {
        return (
          <li
            className="list-group-item d-flex justify-content-between lh-sm"
            key={item._id}
          >
            <div>
              <h6 className="my-0">{item.menu_name}</h6>
              <small className="text-muted text-lowercase">
                {item.description}
              </small>
              <div className="p-2">
                <img src={item.menu_image} alt="Menu img" className="w-50 " />
              </div>
            </div>
            <span className="text-muted">₹{item.menu_price}</span>
          </li>
        );
      });
    }
  };
  render() {
    if (
      !sessionStorage.getItem("loginStatus") ||
      sessionStorage.getItem("loginStatus") === "LoggedOut"
    ) {
      return (
        <>
          <HeaderMain />
          <div className="m-5">
            <img
              src="https://img.icons8.com/external-dreamcreateicons-flat-dreamcreateicons/64/000000/external-alert-internet-security-dreamcreateicons-flat-dreamcreateicons.png"
              alt="img"
              className=" d-inline-block"
            />
            <h2 className="  d-inline-block ms-3">
              Login first to place order
            </h2>
          </div>
        </>
      );
    }
    return (
      <>
        <HeaderMain />
        <form action="https://paytm-jwt.herokuapp.com/paynow" method="POST">
          <div className="container text-center mt-5">
            <div className="row g-5">
              <div className="col-md-5 col-lg-4 order-md-last">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                  <span style={{ color: "#506108" }}>Your cart</span>
                  <span
                    className="badge rounded-pill"
                    style={{ backgroundColor: "#506108", color: "white" }}
                  >
                    {orderId.length}
                  </span>
                </h4>

                <ul className="list-group mb-3">
                  {this.renderItem(this.state.menuItem)}

                  <li className="list-group-item d-flex justify-content-between">
                    <span>Total (RS)</span>
                    <strong>{this.state.cost}</strong>
                  </li>
                </ul>
                <button
                  className="w-100 btn  btn-lg mt-4"
                  style={{ backgroundColor: "#506108", color: "white" }}
                  type="submit"
                  onClick={this.checkout}
                >
                  Continue to checkout
                </button>
              </div>

              <div className="col-md-7 col-lg-8">
                <h4 className="mb-3">Billing address</h4>
                <input type="hidden" value={this.state.id} name="id" />
                <input type="hidden" value={this.state.cost} name="cost" />
                <input
                  type="hidden"
                  value={this.state.restaurant_name}
                  name="restaurant_name"
                />

                <div className="row g-3">
                  <div className="col-sm-6">
                    <label htmlFor="firstName" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.name}
                      name="name"
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="col-6">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="you@example.com"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="col-6">
                    <label htmlFor="address" className="form-label">
                      Contact
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      placeholder="0123456789"
                      required
                      value={this.state.phone}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      placeholder="Example: 1234 Main St"
                      value={this.state.address}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                </div>
                <hr className="my-4"></hr>
              </div>
            </div>
          </div>
        </form>
      </>
    );
  }

  componentDidMount() {
    const menuItem = sessionStorage.getItem("menu");
    menuItem.split(",").map((item) => {
      orderId.push(parseInt(item));
      return "ok";
    });
    // console.log(JSON.stringify(orderId));
    const sdata = {
      id: orderId,
    };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(sdata),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let totalPrice = 0;
        data.map((item) => {
          totalPrice += parseFloat(item.menu_price);
          return "ok";
        });
        this.setState({ menuItem: data, cost: totalPrice });
      });
  }
}
export default PlaceOrder;
