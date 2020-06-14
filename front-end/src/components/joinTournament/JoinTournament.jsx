import React, { Component } from "react";
import "./joinTournamentStyles.css";
// import coverImg from "../../images/background.png";

class JoinTournament extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemList: [],
      redirect: null,
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/tournament/")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          itemList: json,
        });
      });
  }

  handleSelectedPlace = (tournamentID) => {
    window.sessionStorage.setItem("tournamentID:", tournamentID);
    this.setState({ redirect: "/selected-tournament" });
  };

  render() {
    return (
      <div>
        <div className="cardbackground">
          <div className="row">
            <div className="col">
              <div className="row">
                {this.state.itemList.map((item) => (
                  <div
                    className="col-12 col-md-6 col-lg-4"
                    key={item._id}
                    onClick={this.handleSelectedPlace.bind(this, item._id)}
                  >
                    <div className="card">
                      <img
                        className="card-img-top"
                        src="https://wallpapercart.com/wp-content/uploads/2020/05/Hd-Dota-2-Video-Game-Wallpaper-Background-Image0013-.jpg"
                        alt="Card cap"
                      />
                      <div className="card-body">
                        <h4 className="card-title">
                          <a href="product.html" title="View Product">
                            {item.title}
                          </a>
                        </h4>
                        <p className="card-text">{item.description}</p>
                        <div className="row">
                          <div className="col">
                            <a href="/" className="btn btn-danger btn-block">
                              Favourite
                            </a>
                          </div>
                          <div className="col">
                            <a href="/" className="btn btn-success btn-block">
                              Join
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default JoinTournament;
