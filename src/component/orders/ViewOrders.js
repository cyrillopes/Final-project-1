import React, { Component } from "react";
import axios from "axios";
import HeaderMain from "../Header/HeaderMain";
import OrderDisplay from "./OrderDisplay";

const orderUrl = "https://poke-us.herokuapp.com/orders";

class ViewOrder extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      orders: "",
    };
  }
  render() {
    if (sessionStorage.getItem("loginStatus") === "LoggedOut") {
      return (
        <>
          <HeaderMain />
          <h2>Login first to place order</h2>
        </>
      );
    }
    return (
      <>
        <HeaderMain />
        <OrderDisplay orderData={this.state.orders} />
      </>
    );
  }
  componentDidMount() {
    if (this.props.location) {
      let query = this.props.location.search.split("&");
      if (query) {
        let data = {
          status: query[0].split("=")[1],
          date: query[2].split("=")[1],
          bank_name: query[3].split("=")[1],
        };

        console.log(data.status);
        console.log(data.date);
        console.log(data.bank_name);
        let id = query[1].split("=")[1].split("_")[1];
        console.log(id);
        fetch(`${orderUrl}/${id}`, {
          method: "PATCH",
          headers: {
            accept: "application/json ",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }
    }
    let email = sessionStorage.getItem("userInfo")
      ? sessionStorage.getItem("userInfo").split(",")[1]
      : "";

    axios.get(`${orderUrl}?email=${email}`).then((res) => {
      this.setState({ orders: res.data });
    });
  }
}
export default ViewOrder;
