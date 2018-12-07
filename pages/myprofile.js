import ProfileBody from "../components/ProfileBody";
import React, { Component } from "react";

class myprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.child = React.createRef();
  }

  //make "Go to Admin page" button appear (only if admin rights)
  async componentDidMount() {
    this.child.current.clickableTrue();
    this.child.current.isMyProfilePageTrue();
  }

  render() {
    return <ProfileBody ref={this.child} />;
  }
}

export default myprofile;
