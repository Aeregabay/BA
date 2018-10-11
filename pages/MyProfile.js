import ProfileBody from "../components/ProfileBody";
import React, { Component } from "react";

class myprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //make "Go to Admin page" button appear (only if admin rights)
  async componentDidMount() {
    this.child.clickableTrue();
  }

  render() {
    return <ProfileBody ref={this.child} />;
  }
}

export default myprofile;
