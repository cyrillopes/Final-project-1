import React from "react";
const Weather = (props) => {
  return (
    <>
      <img
        className="icon"
        alt="img"
        src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`}
      />
      <p className="temp">{props.temp}</p>
    </>
  );
};
export default Weather;
