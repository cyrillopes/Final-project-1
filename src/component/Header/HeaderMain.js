import React, { Component } from "react";
import AutoSearch from "./AutoSearch";
import "../css/listing.css";
import "../css/index.css";
import { Link, withRouter } from "react-router-dom";
const url = "https://login-jwtt.herokuapp.com/api/auth/userInfo";

class HeaderMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestion: JSON,
      filterSuggestions: [],
      userData: "",
      userName: "",
      userImg: "",
    };
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
          <li className="nav-item  ms-lg-5">
            <Link className="nav-link text-dark" to="/login">
              Hi {data.name}
            </Link>
          </li>
          <li className="nav-item  ms-lg-1 bg-transparent me-3">
            <button
              className="btn border-0 bg-transparent fs-5"
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
          <li className="nav-item ms-lg-5">
            <Link className="nav-link text-dark" to="/login">
              Log in
            </Link>
          </li>
          <li className="nav-item  ms-lg-2">
            <Link className="nav-link " to="/register">
              Sign up
            </Link>
          </li>
        </>
      );
    }
  };

  render() {
    return (
      <>
        <header>
          <div id="nav">
            <nav className="navbar navbar-expand-lg">
              <div className="container-fluid nav-content row">
                <div className="logo-container col-md-3 text-center">
                  <Link className="navbar-brand navbar-heading-listing" to="/">
                    <img
                      src="https://i.ibb.co/jR8Bm6N/poke-logo.png"
                      alt="logo"
                    />
                  </Link>
                </div>

                <AutoSearch />
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
                  className="collapse navbar-collapse loginLogout"
                  id="navbarTogglerDemo01"
                >
                  <ul className="navbar-nav  navbar-nav-scroll ">
                    {this.conditionalHeader()}

                    <li className="nav-item ms-lg-3">
                      <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABiUlEQVRIie3VzysEcRjH8fcza3e2/AEOlJK/wUlu2oPS5D9YtCd/gIP/wsXKj21zUCMUUraUdpOcnFwligvKYhbNPA4IGXbWzOwBn9PM0zO9er7Ptwb+WgTAyqbLQO9L7VhUxlcKzmKcsOFT61TRhcERsztO+FOs4XTRyqbVyqYn4nQ+TeyhSwAKA02Fzep9CXAEegZHW9uaBts2jgo7gCGem4kLFr+ilTXHQCZj8Mqr87U+8L/VuAnZiAFFoOv12Rdem6kdAYdRw6qUvoWfmzTyqRWpDxsS+XFrCmO7LtxyU6sAlxG6B3bh9rwubNu48LaTsBGRrffvX8IAKJEdt7ofh/gWTiZSG4Abgesk72q7gWF79voS2A+rqrBj2ziBYQBV1sPC6Mf9BoITKWMeqP4YFa4Mt6XYMLw8fXcmIhmFPeCxAfIBqOAa/SvF6kUD3/3S+P4W/TI0Yg6oJ3kFRTS3One/Gaav7o5f43kypdAOdKCSD9sXGI46wWHRHHAKnIhqLnTff5qVJzzPkK3ELHfXAAAAAElFTkSuQmCC"
                        alt="basket"
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </header>
      </>
    );
  }
  componentDidMount() {
    fetch(url, {
      method: "GET",
      headers: {
        "x-access-token": sessionStorage.getItem("ltk"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ userData: data });
      });
  }
}

export default withRouter(HeaderMain);
