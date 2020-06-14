import React, { Component } from "react";
import "./addTournamentStyles.css";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class AddTournament extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      gamemode: "",
      description: "",
      pricepool: "",
      date: new Date(),
      time: "",
      server: "",
    };
  }

  onSubmitHandler = (e) => {
    e.preventDefault();
    // alert(JSON.stringify(this.state));
    this.postData();
  };

  async postData() {
    try {
      let result = await fetch("http://localhost:5000/tournament", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.state),
      });
      console.log("Result: " + result);
      toast.info("✔️ Tournament Added Susseccfully !", {
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
            this.setState({ redirect: "/jointour" }); //After 3 second, set redirect to true
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

  onChangeDate = (date) => {
      this.setState({
          date:date
      })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div>
        <ToastContainer />
        <div className="container register">
          <div className="row">
            <div className="col-md-3 register-left">
              {/* <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" /> */}
              <h3>Create your own Tournament.</h3>
              <br />
            </div>
            <div className="col-md-9 register-right">
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <h3 className="register-heading">Add a Tournament</h3>
                  <form onSubmit={this.onSubmitHandler} autoComplete="off">
                    <div className="row register-form">
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Title"
                            name="title"
                            value={this.state.title}
                            onChange={this.onChangeHandler}
                          />
                        </div>
                        <div className="form-group">
                          <select
                            className="form-control"
                            name="gamemode"
                            value={this.state.gamemode}
                            onChange={this.onChangeHandler}
                          >
                            <option>Select Game Mode</option>
                            <option>All Pick</option>
                            <option>Captain Mode</option>
                            <option>1v1 Mid Only</option>
                            <option>2v2 Mid Only</option>
                            <option>Captain Draft</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <textarea
                            type="text"
                            className="form-control"
                            placeholder="Description"
                            name="description"
                            value={this.state.description}
                            onChange={this.onChangeHandler}
                            rows="1"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Price Pool (USD)"
                            name="pricepool"
                            value={this.state.pricepool}
                            onChange={this.onChangeHandler}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <DatePicker
                            className="datepicker"
                            name="date"
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Time (13:10)"
                            name="time"
                            value={this.state.time}
                            onChange={this.onChangeHandler}
                          />
                        </div>
                        <div className="form-group">
                          <select
                            className="form-control"
                            name="server"
                            value={this.state.server}
                            onChange={this.onChangeHandler}
                          >
                            <option>Select Server</option>
                            <option>SE Asia</option>
                            <option>Europe</option>
                            <option>US</option>
                            <option>Africa</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <input
                            type="submit"
                            className="btnRegister"
                            value="Create"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddTournament;
