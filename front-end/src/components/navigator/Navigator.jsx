import React, { Component } from "react";
import icon from "../../images/icon.png";
import "./navigatorStyles.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Register from "../register/Register";
import AddTournament from "../addTournament/AddTournament";
import JoinTournament from "../joinTournament/JoinTournament";
import Home from "../home/Home";
import Login from "../login/Login";

class Navigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      user: [],
      redirect: null,
      login: false,
      hiddenUser: true,
      hiddenGuest: true,
    };
  }

  logoutAction = () => {
    this.setState({
      activeUser: [],
    });
    window.localStorage.clear();
    window.sessionStorage.clear();
    // alert(this.state.activeUser);
    

    toast.info("✔️ You're Succesfully Loged Out", {
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
        alert(this.state.activeUser);
      }.bind(this),
      3000
    );
  };

  componentDidMount() {
    let active = JSON.parse(localStorage.getItem("login"));
    if (active && active.login) {
      this.setState({
        login: true,
        hiddenGuest:true,
        hiddenUser:false
      });

      const LogedUserID = active.userid;
      fetch("http://localhost:5000/user/" + LogedUserID)
        .then((res) => res.json())
        .then((json) => {
          this.setState({
            isLoaded: true,
            user: json,
          });
          window.sessionStorage.setItem("activeUserID:", this.state.user._id);
        });
    } else {
      this.setState({
        activeUser: [],
        hiddenGuest:false,
        hiddenUser:true
      });
      window.localStorage.clear();
      window.sessionStorage.clear();
      // alert(this.state.activeUser);
      // this.props.history.push("/login");
    }
  }

  render() {
    return (
      <div>
        <Router>
          <ToastContainer />
          <nav className="navbar navbar-expand-lg navbar-dark">
            <a className="navbar-brand" href="/">
              <img
                src={icon}
                width={30}
                height={30}
                className="d-inline-block align-top"
                alt=""
                loading="lazy"
              />
              DOTA 2 Tournaments
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <NavLink
                    className="nav-link"
                    to="/"
                    exact
                    activeStyle={{ color: "white", fontWeight: "bold" }}
                  >
                    <span>Home </span>
                  </NavLink>
                </li>
                <li className="nav-item " hidden={this.state.hiddenUser}>
                  <NavLink
                    className="nav-link"
                    to="/addtour"
                    exact
                    activeStyle={{ color: "white", fontWeight: "bold" }}
                  >
                    <span>Create Tournament{"  "}</span>
                  </NavLink>
                </li>
                <li className="nav-item " hidden={this.state.hiddenUser}>
                  <NavLink
                    className="nav-link"
                    to="/jointour"
                    exact
                    activeStyle={{ color: "white", fontWeight: "bold" }}
                  >
                    <span>Join Tournament{"  "}</span>
                  </NavLink>
                </li>
              </ul>
              <form className="form-inline my-2 my-lg-0">
                <input
                  style={{
                    fontWeight: "bold",
                    backgroundColor: "black",
                    color: "white",
                  }}
                  id="dashName"
                  type="text"
                  className="form-control"
                  value={this.state.user.fullName}
                  disabled
                  hidden={this.state.hiddenUser}
                />
              </form>
              <form className="form-inline my-2 my-lg-0">
                <button
                  className="btn btn-outline-primary my-2 my-sm-0"
                  type="submit"
                  hidden={this.state.hiddenGuest}
                >
                  <NavLink
                    className="nav-link anchortag"
                    to="/login"
                    exact
                    activeStyle={{ color: "white", fontWeight: "bold" }}
                  >
                    <span>Sign In</span>
                  </NavLink>
                </button>
              </form>
              <form className="form-inline my-2 my-lg-0">
                <button
                  className="btn btn-outline-success my-2 my-sm-0"
                  type="submit"
                  hidden={this.state.hiddenGuest}
                >
                  <NavLink
                    className="nav-link anchortag"
                    to="/sign"
                    exact
                    activeStyle={{ color: "white", fontWeight: "bold" }}
                  >
                    <span>Sign Up</span>
                  </NavLink>
                </button>
              </form>
              <form onSubmit={this.logoutAction} className="form-inline my-2 my-lg-0">
                <button
                  className="btn btn-outline-danger my-2 my-sm-0"
                  type="submit"
                  hidden={this.state.hiddenUser}
                >
                  
                    <span>Sign Out</span>
                  
                </button>
              </form>
            </div>
          </nav>

          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/addtour" exact>
              <AddTournament />
            </Route>
            <Route path="/jointour" exact>
              <JoinTournament />
            </Route>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/sign" exact>
              <Register />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Navigator;
