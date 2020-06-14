import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./registerStyles.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      userName: "",
      password: "",
      confirmPassword: "",
      email: "",
      contactNo: "",
      steamURL: "",
      redirect: null,
    };
  }

  onSubmitHandler = (e) => {
    e.preventDefault();
    // alert(JSON.stringify(this.state));
    this.postData();
  };

  async postData() {
    try {
      let result = await fetch("http://localhost:5000/user", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.state),
      });
      alert(JSON.stringify(this.state))
      console.log("Result: " + result);
      toast.info("✔️ Account Added Susseccfully !", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(
        function () {
          //Start the timer
          this.setState({ redirect: "/login" }); //After 3 second, set redirect to true
        }.bind(this),
        3500
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  onChangeHandler = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div>
        <ToastContainer />
        <section className="register-block">
          <div className="container">
            <div className="row">
              <div className="col-md-4 register-sec">
                <h2 className="text-center">Register Now</h2>
                <form
                  className="register-form"
                  autoComplete="off"
                  onSubmit={this.onSubmitHandler}
                >
                  <div className="form-group">
                    <label htmlFor="exampleInputName1">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="fullName"
                      value={this.state.fullname}
                      onChange={this.onChangeHandler}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputAddress1">User Name</label>
                    <input
                      type="text"
                      name="userName"
                      className="form-control"
                      value={this.state.username}
                      onChange={this.onChangeHandler}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputAddress2">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChangeHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputTown1">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="confirmPassword"
                      value={this.state.confirmPassword}
                      onChange={this.onChangeHandler}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputCountry1">E-mail</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChangeHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPostCode1">
                      Contact Number
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="contactNo"
                      value={this.state.contactNo}
                      onChange={this.onChangeHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputUsername">
                      Steam Profile URL
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="steamURL"
                      value={this.state.steamURL}
                      onChange={this.onChangeHandler}
                    />
                  </div>
                  <div className="form-check">
                    <button
                      type="submit"
                      className="btn btn-register float-right"
                    >
                      SIGN UP
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-md-8 banner-sec"></div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Register;
