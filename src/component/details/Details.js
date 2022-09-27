import React, { Component } from "react";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Link } from "react-router-dom";
import HeaderMain from "../Header/HeaderMain";
import MenuDisplay from "./MenuDisplay";
import "../css/index.css";
import "../css/details.css";

const url = "https://poke-us.herokuapp.com";

class Details extends Component {
  constructor() {
    super();
    this.state = {
      restDetails: "",
      menuList: "",
      mealId: sessionStorage.getItem("mealId"),
      userItem: "",
    };
  }
  addToCart = (data) => {
    this.setState({ userItem: data });
  };

  proceed = () => {
    sessionStorage.setItem("menu", this.state.userItem);
    this.props.history.push(
      `/placeOrder/${this.state.restDetails.restaurant_name}`
    );
  };

  address = (address) => {
    if (address) {
      let add = address.split(",")[0];
      return add;
    }
  };

  render() {
    let { restDetails } = this.state;
    return (
      <>
        <HeaderMain />
        <div className="ms-lg-5">
          <p className="headingTitle ms-lg-5">
            Restaurant in {this.address(restDetails.address)}
          </p>
        </div>
        <div className="container-fluid">
          <div className="row ms-lg-3">
            <div className="col-lg-5 ms-lg-5">
              <div className="imgDiv">
                <img src={restDetails.restaurant_thumb} alt="lunch img" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="contentDiv">
                <h6 className="fw-bold detail-heading display-6">
                  {restDetails.restaurant_name}
                </h6>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star-half-stroke"></i>
                <span>{restDetails.average_rating} Customer ratings</span>
                <h5 className="text-decoration-line-through fw-semibold ms-0">
                  Old price: ₹ {restDetails.cost + 200}
                </h5>
                <h5 className="fw-semibold ms-0">
                  New price: ₹ {restDetails.cost}
                </h5>
                <h6 className="fw-semibold ms-0">
                  Covid 19 precautions are taken. All our delivery partners are
                  well Checked before Delivery
                </h6>
                <div className="feature_content m-0">
                  <div className="feature removeMargin ms-1">
                    <img
                      src="https://i.ibb.co/wJvrhYg/veg.png"
                      alt="veg"
                      className="fetIcon "
                    />
                    <p>Pure Veg</p>
                  </div>
                  <div className="feature">
                    <img
                      src="https://i.ibb.co/mD3jpgc/sentizied.png"
                      alt="veg"
                      className="fetIcon"
                    />
                    <p>Fully Sanitized</p>
                  </div>
                  <div className="feature">
                    <img
                      src="https://i.ibb.co/kHrm3Mh/delivery.png"
                      alt="veg"
                      className="fetIcon"
                    />
                    <p>Free delivery</p>
                  </div>
                </div>
                <div className="available">
                  <h4 className="fw-semibold">Available</h4>
                </div>
                <div>
                  <button className="btn btn-add w-50" onClick={this.proceed}>
                    Add to cart
                  </button>
                  <Link
                    to={`/listing/${this.state.mealId}`}
                    className="btn btn-add ms-2 w-25"
                  >
                    Back
                  </Link>
                </div>
              </div>
              <Tabs className="ms-lg-4 mt-4">
                <TabList>
                  <Tab>About</Tab>
                  <Tab>Contact</Tab>
                </TabList>
                <TabPanel>
                  <h5 className="ms-0">{restDetails.restaurant_name}</h5>
                  <p>{restDetails.about}</p>
                </TabPanel>
                <TabPanel>
                  <h6 className="ms-0">
                    <h5 className="ms-0">Address: {restDetails.address}</h5>
                    Contact: {restDetails.contact_number}
                  </h6>
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <MenuDisplay
            menuData={this.state.menuList}
            finalOrder={(data) => {
              this.addToCart(data);
            }}
          />
        </div>
      </>
    );
  }
  async componentDidMount() {
    let restId = this.props.location.search.split("=")[1];
    let restResponse = await axios.get(`${url}/details/${restId}`);
    let menuResponse = await axios.get(`${url}/menu/${restId}`);
    sessionStorage.setItem("rest_name", restResponse.data[0].restaurant_name);
    this.setState({
      restDetails: restResponse.data[0],
      menuList: menuResponse.data,
    });
  }
}
export default Details;
