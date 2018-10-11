import ProfileBody from "../components/ProfileBody";
import React, { Component } from "react";

class myprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    this.child.clickableTrue();
  }

  render() {
    return <ProfileBody ref={this.child} />;
  }
}

export default myprofile;
