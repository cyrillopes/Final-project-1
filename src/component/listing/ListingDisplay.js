import React from "react";
import { Link } from "react-router-dom";

const ListingDisplay = (props) => {
  const renderData = ({ listData }) => {
    if (listData) {
      if (listData.length > 0) {
        return listData.map((item) => {
          return (
            <div className="food-item" key={item.restaurant_id}>
              <div className="food-item-img">
                <img src={item.restaurant_thumb} alt={item.restaurant_name} />
              </div>
              <div className="food-item-content">
                <Link to={`/details?restid=${item.restaurant_id}`}>
                  <div className="subContent-heading">
                    <h2>{item.restaurant_name}</h2>
                    <h5>Rating: {item.average_rating}</h5>
                  </div>
                </Link>
                <div>
                  <p className="location-para">{item.address}</p>
                </div>
                <div className="line">
                  <hr />
                </div>
              </div>
              <div className="subCousine">
                <div className="cuisine-content">
                  <p>MEALTYPES:</p>
                  <p>COUSINES:</p>
                  <p>COST:</p>
                </div>
                <div className="cuisine-cost ms-lg-3">
                  <p>{item.mealTypes[0].mealtype_name}</p>
                  <p>{item.cuisines[0].cuisine_name}</p>
                  <p>₹ {item.cost}</p>
                </div>{" "}
                <div className="cuisine-cost me-5">
                  <p>{item.mealTypes[1].mealtype_name}</p>
                  <p>{item.cuisines[1].cuisine_name}</p>
                </div>
              </div>
            </div>
          );
        });
      } else {
        return (
          <div className="m-5">
            <img
              src="https://img.icons8.com/external-dreamcreateicons-flat-dreamcreateicons/64/000000/external-alert-internet-security-dreamcreateicons-flat-dreamcreateicons.png"
              alt="img"
              className="d-inline-block"
            />
            <h3 className="text-secondary d-inline-block">
              Oops!!! We couldn't find any restaurants. We are trying to add
              more restaurants to the list. Be patient with us. In the mean
              time, see if you like any other items.
            </h3>
          </div>
        );
      }
    } else {
      return (
        <div className="row mt-5">
          <div className="col-2"></div>
          <div className="col-4">
            <img
              src="https://i.pinimg.com/originals/dc/66/53/dc6653448a617b0564541708101d3eac.gif"
              alt="gif"
              style={{ height: 300, width: 400 }}
            />
          </div>
          <div className="col-6"></div>
        </div>
      );
    }
  };
  return <>{renderData(props)}</>;
};

export default ListingDisplay;
