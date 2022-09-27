import React from "react";
import { Link } from "react-router-dom";

const DisplayCard = (props) => {
  const CardDisplay = ({ mealData }) => {
    if (mealData) {
      return mealData.map((item) => {
        return (
          <div className="col" key={item._id}>
            <Link
              to={`/listing/${item.mealtype_id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="card category">
                <img
                  src={item.meal_image}
                  className="card-img-top mt-lg-2"
                  alt="..."
                />
                <div className="card-body align-para">
                  <p className="card-text text-dark ">{item.mealtype}</p>
                </div>
              </div>
            </Link>
          </div>
        );
      });
    }
  };
  return <>{CardDisplay(props)}</>;
};

export default DisplayCard;
