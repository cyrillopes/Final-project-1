import React, { Component } from "react";
import axios from "axios";
const url = "https://poke-us.herokuapp.com/filter";

class FilterCuisine extends Component {
  filterCuisine = (event) => {
    let mealId = this.props.mealId;
    let cuisineId = event.target.value;
    let cuisineUrl;
    if (cuisineId === " ") {
      cuisineUrl = `${url}/${mealId}`;
    } else {
      cuisineUrl = `${url}/${mealId}?cuisineId=${cuisineId}`;
    }
    axios.get(cuisineUrl).then((res) => {
      this.props.restPerCuisine(res.data);
    });
  };

  render() {
    return (
      <>
        <div className="filter-heading">
          <h2>Filters</h2>
        </div>

        <div className="cuisine">
          <p>Cuisine</p>
          <div className="filters" onChange={this.filterCuisine}>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="cuisine" />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                All
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="cuisine"
                value="1"
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                North Indian
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="cuisine"
                value="2"
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                South Indian
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="cuisine"
                value="3"
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Chinese
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="cuisine"
                value="4"
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Fast Food
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="cuisine"
                value="5"
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Street Food
              </label>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default FilterCuisine;
