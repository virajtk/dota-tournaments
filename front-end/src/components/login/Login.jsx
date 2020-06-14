import React, { Component } from "react";
import "./loginStyles.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: null,
      password: null,
      login: false,
      active: null,
      redirect: null,
    };
  }

  login = (e) => {
    e.preventDefault();
    // console.log(this.state);
    let LOGIN_API = "http://localhost:5000/login/user";
    fetch(LOGIN_API, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userName: this.state.userName,
        password: this.state.password,
      }),
    }).then((response) => {
      response.json().then((result) => {
        console.log("result", result);
        if (result.message) {
          // console.log("No User Found")
          this.setState({
            userName:"",
            password:""
          });
          toast.error("🚫 User Not Found, UserName/Password does not Match", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        if (result && result._id) {
          localStorage.setItem(
            "login",
            JSON.stringify({
              login: true,
              userName: result.userName,
              userid: result._id,
            })
          );
          let userFullName = result.fullName;

          toast.info(
            "✔️ Welcome " + userFullName + ", You're Loged In Succesfully !",
            {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        }

        setTimeout(
          function () {
            //Start the timer
            this.storeCollector(); //After 2 second
            window.location.reload(false);
          }.bind(this),
          2000
        );
      });
    });
  };

  componentDidMount() {
    this.storeCollector();
  }

  storeCollector() {
    let active = JSON.parse(localStorage.getItem("login"));
    if (active && active.login) {
      this.setState({
        login: true,
        active: active,
        redirect: "/",
      });
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div>
        <ToastContainer />
        <div className="login-wrap">
          <div className="login-html">
            <input
              id="tab-1"
              type="radio"
              name="tab"
              className="sign-in"
              defaultChecked
            />
            <label htmlFor="tab-1" className="tab">
              Sign In
            </label>
            <input id="tab-2" type="radio" name="tab" className="for-pwd" />
            <label htmlFor="tab-2" className="tab">
              Forgot Password
            </label>
            <div className="login-form">
              {/* Login */}
              <form
                autoComplete="off"
                onSubmit={(e) => {
                  this.login(e);
                }}
              >
                <div className="sign-in-htm">
                  <div className="group">
                    <label htmlFor="user" className="label">
                      Username
                    </label>
                    <input
                      id="user"
                      type="text"
                      className="input"
                      name="userName"
                      onChange={(event) => {
                        this.setState({ userName: event.target.value });
                      }}
                      value={this.state.userName}
                      required
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="pass" className="label">
                      Password
                    </label>
                    <input
                      id="pass"
                      type="password"
                      className="input"
                      data-type="password"
                      name="password"
                      onChange={(event) => {
                        this.setState({ password: event.target.value });
                      }}
                      value={this.state.password}
                      required
                    />
                  </div>
                  <div className="group">
                    <input
                      type="submit"
                      className="button"
                      defaultValue="Sign In"
                    />
                  </div>
                  <div className="hr" />
                </div>
              </form>
              {/* Fogot Pass */}
              <div className="for-pwd-htm">
                <div className="group">
                  <label htmlFor="user" className="label">
                    Username or Email
                  </label>
                  <input id="user" type="text" className="input" />
                </div>
                <div className="group">
                  <input
                    type="submit"
                    className="button"
                    defaultValue="Reset Password"
                  />
                </div>
                <div className="hr" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
