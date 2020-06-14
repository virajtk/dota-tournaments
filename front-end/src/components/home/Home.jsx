import React, { Component } from "react";
import { Fade } from "react-slideshow-image";
import "./homeStyles.css";
import slideshow1 from "../../images/slide1.jpg";
import slideshow2 from "../../images/slide2.jpg";
import slideshow3 from "../../images/slide3.jpg";

const fadeProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsList: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/news/")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          newsList: json,
        });
      });
  }

  render() {
    return (
      <div>
          <br/>
        <div className="slide-container">
          <Fade {...fadeProperties}>
            <div className="each-fade">
              <div className="image-container">
                <img src={slideshow1} alt="Slide 1" />
              </div>
              <h2>1</h2>
            </div>
            <div className="each-fade">
              <div className="image-container">
                <img src={slideshow2} alt="Slide 2" />
              </div>
              <h2>2</h2>
            </div>
            <div className="each-fade">
              <div className="image-container">
                <img src={slideshow3} alt="Slide 3" />
              </div>
              <h2>3</h2>
            </div>
          </Fade>
        </div>
        <div className="content">
          <h2 style={{ color: "white" }}>News Feeds And Patch Notes</h2>
          <br />
          {this.state.newsList.map((news) => (
            <div className="card" key={news._id}>
              <div className="card-header">{news.type}</div>
              <div className="card-body">
                <h5 className="card-title">{news.title}</h5>
                <p className="card-text">{news.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
