import React, { Component } from "react";
import QuickDisplay from "./QuickDisplay";
import DisplayCard from "./DisplayCard";

const url = "https://poke-us.herokuapp.com/mealType";

class QuickSearch extends Component {
  constructor() {
    super();
    this.state = {
      mealTypes: "",
    };
  }

  render() {
    return (
      <>
        <div id="category">
          <div className="category-heading">Choose By Category</div>
        </div>
        <div className="container">
          <div className="row">
            <DisplayCard mealData={this.state.mealTypes} />
          </div>
        </div>
        <div id="category">
          <div className="category-heading">Quick Search</div>
        </div>
        <div className="container">
          <div className="row">
            <QuickDisplay mealData={this.state.mealTypes} />
          </div>
        </div>
      </>
    );
  }
  //   componentDidMount
  componentDidMount() {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ mealTypes: data });
      });
  }
}
export default QuickSearch;
