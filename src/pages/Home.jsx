import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1>Welcome to my page</h1>
        <Link to="myprofile">MyProfile</Link>
      </div>
    );
  }
}

export default Home;
