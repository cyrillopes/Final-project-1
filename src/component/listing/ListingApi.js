import React, { Component } from "react";
import axios from "axios";
import "../css/listing.css";
import "../css/index.css";
import HeaderMain from "../Header/HeaderMain";
import ListingDisplay from "./ListingDisplay";
import FilterCuisine from "../filters/FilterCuisine";
import FilterCost from "../filters/FilterCost";

const url = "https://poke-us.herokuapp.com/restaurants?mealId=";

class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantList: "",
    };
  }
  setDataPerFilter = (data) => {
    this.setState({ restaurantList: data });
  };

  render() {
    return (
      <>
        <HeaderMain />
        <div className="listing-page mt-5">
          <div className="filterDiv">
            <FilterCuisine
              mealId={this.props.match.params.mealId}
              restPerCuisine={(data) => {
                this.setDataPerFilter(data);
              }}
            />
            <FilterCost
              mealId={this.props.match.params.mealId}
              restPerCost={(data) => {
                this.setDataPerFilter(data);
              }}
            />
          </div>
          <div className="contentDiv">
            <ListingDisplay listData={this.state.restaurantList} />
          </div>
        </div>
      </>
    );
  }

  componentDidMount() {
    let mealId = this.props.match.params.mealId;
    sessionStorage.setItem("mealId", mealId);
    axios
      .get(`${url}${mealId}`)
      .then((res) => this.setState({ restaurantList: res.data }));
  }
}
export default Listing;
