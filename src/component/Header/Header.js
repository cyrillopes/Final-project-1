import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Weather from "./Weather";
import "../css/index.css";
const locationUrl = `https://poke-us.herokuapp.com/location`;
const restUrl = `https://poke-us.herokuapp.com/restaurants?stateId=`;
const url = "https://login-jwtt.herokuapp.com/api/auth/userInfo";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      location: "",
      restaurant: "",
      userData: "",
      userName: "",
      userImg: "",
      icon: "",
      temp: "",
    };
    this.geolocation();
  }
  ///////////////////////
  geolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getWeather);
    }
  };
  getWeather = async (data) => {
    let lat = data.coords.latitude;
    let lon = data.coords.longitude;

    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`
    );
    const response = await api_call.json();
    this.setState({
      icon: response.list[0].weather[0].icon,
      temp: response.list[0].temp.day,
    });
  };
  /////////////////////////////
  renderCity(data) {
    if (data) {
      return data.map((item) => {
        return (
          <option value={item.state_id} key={item._id}>
            {item.state}
          </option>
        );
      });
    }
  }

  handleCity = (event) => {
    let stateId = event.target.value;
    fetch(`${restUrl}${stateId}`)
      .then((restaurants) => restaurants.json())
      .then((data) => {
        this.setState({ restaurant: data });
      });
  };

  handleRestaurant = (event) => {
    this.props.history.push(`/details?restId=${event.target.value}`);
  };

  renderRestaurants(data) {
    if (data) {
      return data.map((item) => {
        return (
          <option value={item.restaurant_id} key={item.restaurant_id}>
            {item.restaurant_name} | {item.address}
          </option>
        );
      });
    }
  }
  handleLogOut = () => {
    sessionStorage.removeItem("ltk");
    sessionStorage.removeItem("userInfo");
    sessionStorage.setItem("loginStatus", "LoggedOut");
    this.setState({ userData: "" });
    this.props.history.push("/");
  };

  conditionalHeader = () => {
    if (this.state.userData.name) {
      let data = this.state.userData;
      let outputArray = [data.name, data.email, data.phone];
      sessionStorage.setItem("userInfo", outputArray);
      sessionStorage.setItem("loginStatus", "LoggedIn");
      return (
        <>
          <li className="nav-item ">
            <Link className="nav-link  text-white fw-semibold" to="/login">
              Hi {data.name}
            </Link>
          </li>
          <li className="nav-item ">
            <button
              className="btn border-0 bg-transparent fs-5 text-white"
              to="/register"
              onClick={this.handleLogOut}
            >
              Logout
            </button>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item ">
            <Link className="nav-link  text-white fw-semibold" to="/login">
              Log in
            </Link>
          </li>
          <li className="nav-item ">
            <Link className="nav-link text-white fw-semibold" to="/register">
              Sign up
            </Link>
          </li>
        </>
      );
    }
  };
  /////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////
  render() {
    return (
      <header className="header">
        <div className="background-img"></div>
        <div id="nav">
          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid nav-content">
              <div className="logo-container m-0">
                <Link className="navbar-brand navbar-heading" to="/">
                  <img
                    src="https://i.ibb.co/jR8Bm6N/poke-logo.png"
                    alt="logo"
                  />
                </Link>
              </div>
              <Weather icon={this.state.icon} temp={this.state.temp} />
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarTogglerDemo01"
                aria-controls="navbarTogglerDemo01"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo01"
              >
                <ul className="navbar-nav ms-auto mb-lg-0 my-2 my-lg-0 navbar-nav-scroll">
                  <li className="nav-item ">
                    <Link
                      className="nav-link text-white fw-semibold"
                      aria-current="page"
                      to="/"
                      disabled
                    >
                      Add restaurant
                    </Link>
                  </li>
                  {this.conditionalHeader()}
                </ul>
              </div>
            </div>
          </nav>
          <div id="logo">
            <span className="fw-bold">Poke</span>
          </div>
          <div id="heading">
            <h1>Discover the best food & drinks</h1>
          </div>
          <div className="search">
            <select
              id="location"
              className=" search-form-control "
              aria-label="Default select example"
              onChange={this.handleCity}
            >
              <option value="null" hidden>
                Enter Location
              </option>
              {this.renderCity(this.state.location)}
            </select>
            <span className="input-line"></span>
            <select
              id="restaurants"
              className=" search-form-control"
              onChange={this.handleRestaurant}
            >
              <option value="null" hidden>
                Select Restaurant
              </option>
              {this.renderRestaurants(this.state.restaurant)}
            </select>
          </div>
        </div>
      </header>
    );
  }
  //Api loading on page load
  componentDidMount() {
    fetch(locationUrl, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ location: data });
      });
    fetch(url, {
      method: "GET",
      headers: {
        "x-access-token": sessionStorage.getItem("ltk"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          userData: data,
        });
      });
    ///////////////////////////////////////////////

    /////////////////////////////////////////////
  }
}

export default withRouter(Header);
