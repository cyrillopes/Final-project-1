import React, { Component } from "react";
import axios from "axios";
const url = "https://poke-us.herokuapp.com/filter";

class FilterCost extends Component {
  FilterCost = (event) => {
    let mealId = this.props.mealId;
    let cost = event.target.value.split("-");
    console.log(cost);
    let lCost = cost[0];
    let hCost = cost[1];
    let costUrl;
    if (event.target.value === "") {
      costUrl = `${url}/${mealId}`;
    } else {
      costUrl = `${url}/${mealId}?hcost=${hCost}&lcost=${lCost}`;
    }
    axios.get(costUrl).then((res) => {
      this.props.restPerCost(res.data);
    });
  };

  render() {
    return (
      <>
        <div className="cuisine">
          <p>Cost For Two</p>
        </div>
        <div className="filters" onChange={this.FilterCost}>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value=""
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              All
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value="100-500"
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Less than ₹ 500
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value="500-1000"
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              ₹ 500 to ₹ 1000
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value="1000-1500"
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              ₹ 1000 to ₹ 1500
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value="1499-2000"
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              ₹ 1500 to ₹ 2000
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value="2000-5000"
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              ₹ 2000+
            </label>
          </div>
          <div className="cuisine">
            <p>Sort</p>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Price high to low
            </label>
          </div>
          <div className="form-check sort-radio">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Price low to high
            </label>
          </div>
        </div>
      </>
    );
  }
}

export default FilterCost;
