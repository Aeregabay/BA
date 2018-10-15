import React, { Component } from "react";
import { Container, Header } from "semantic-ui-react";
import ProfileBody from "../components/ProfileBody";

class admin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.child = React.createRef();
  }

  //make "Go to Admin Page" button disappear, since user is already on the page
  async componentDidMount() {
    this.child.current.clickableFalse();
  }

  render() {
    return (
      <Container>
        <ProfileBody ref={this.child} />
      </Container>
    );
  }
}

export default admin;
