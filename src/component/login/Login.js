import React, { Component } from "react";
import HeaderMain from "../Header/HeaderMain";

const url = "https://login-jwtt.herokuapp.com/api/auth/login";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "cyrillopez05@gmail.com",
      password: "123456",
      message: "",
    };
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {
    console.log("insode handlesubmit");
    fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.auth === false) {
          this.setState({ message: data.token });
        } else {
          sessionStorage.setItem("ltk", data.token);
          if (sessionStorage.getItem("menu")) {
            this.props.history.push(
              `/placeOrder/${sessionStorage.getItem("rest_name")}`
            );
          } else this.props.history.push(`/`);
        }
      });
  };

  render() {
    return (
      <>
        <HeaderMain />
        <div className="container mt-5 d-flex justify-content-center">
          <div className="card w-25">
            <h4 style={{ color: "red" }}>{this.state.message}</h4>
            <div className="card-body">
              <div className="col-md-12">
                <label htmlFor="inputEmail4" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail4"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="inputPassword4" className="form-label">
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

              <div className="col-12">
                <button
                  style={{ backgroundColor: "#506108" }}
                  className="btn btn-primary mt-3 border-0"
                  onClick={this.handleSubmit}
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Login;
