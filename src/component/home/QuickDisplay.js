import React from "react";
import { Link } from "react-router-dom";

const QuickDisplay = (props) => {
  const ListMeal = ({ mealData }) => {
    if (mealData) {
      return mealData.map((item) => {
        return (
          <div className="col-lg-4 col-md-6 quick-display" key={item._id}>
            <div className="card quick-search">
              <img
                src={item.meal_image}
                className="card-img-top"
                alt={item.mealtype}
              />
              <div className="card-body">
                <h5 className="card-title search-title">{item.mealtype}</h5>
                <p className="card-text search-content">{item.content}</p>
                <div className="cost">
                  <div className="price">
                    <h3>₹ {item.price}</h3>
                  </div>
                  <Link
                    style={{ padding: 0 }}
                    to={`/listing/${item.mealtype_id}`}
                  >
                    <button className="btn order">Order</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
  };
  return <>{ListMeal(props)}</>;
};

export default QuickDisplay;
