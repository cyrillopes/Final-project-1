import React from "react";
import { Component } from "react";
import HeaderMain from "../Header/HeaderMain";
import { withRouter } from "react-router-dom";

const url = "https://login-jwtt.herokuapp.com/api/auth/register";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Cyril",
      email: "cyrillopez05@gmail.com",
      password: "",
      phone: 9011691056,
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = () => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    }).then(this.props.history.push("/"));
  };

  render() {
    return (
      <>
        <HeaderMain />
        <div className="container mt-5 d-flex justify-content-center">
          <div className="card w-50">
            <div className="card-body">
              <form className="row g-3">
                <div className="col-12">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <label htmlFor="phone" className="form-label">
                    Contact
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={this.state.phone}
                    onChange={this.handleChange}
                  />
                </div>

                <div className="col-12">
                  <button
                    className="btn btn-primary"
                    onClick={this.handleSubmit}
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default withRouter(Register);
