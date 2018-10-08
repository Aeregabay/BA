import React, { Component } from "react";
import { Container } from "semantic-ui-react";

class Itemlist extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container>
        <div className="ui items">
          {}
          <div className="item">
            <div className="ui small image">
              <img src="../static/bike.png" />
            </div>
            <div className="content">
              <div className="header">Mountainbike</div>
              <div className="meta">
                <span className="price">$1200</span>
                <span className="stay">12 bids</span>
              </div>
              <div className="description" />
            </div>
          </div>
          <div className="item">
            <div className="ui small image">
              <img src="../static/car.png" />
            </div>
            <div className="content">
              <div className="header">Car</div>
              <div className="meta">
                <span className="price">$1000</span>
                <span className="stay">6 bids </span>
              </div>
              <div className="description">
                <p />
              </div>
            </div>
          </div>
          <div className="item">
            <div className="ui small image">
              <img src="../static/iphone.jpg" />
            </div>
            <div className="content">
              <div className="header">iPhone</div>
              <div className="meta">
                <span className="price">$1600</span>
                <span className="stay">0 bids</span>
              </div>
              <div className="description">
                <p />
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}
export default Itemlist;
