import React, { Component } from "react";
import { Container, Header } from "semantic-ui-react";
import ProfileBody from "../components/ProfileBody";

class admin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.child = React.createRef();
  }

  async componentDidMount() {
    this.child.current.clickableFalse();
  }

  render() {
    return (
      <Container>
        <Header
          textAlign="center"
          size="large"
          style={{ marginBottom: "30px" }}
          hidden={!this.state.admin}
        >
          This is the admin page
        </Header>
        <ProfileBody ref={this.child} />
      </Container>
    );
  }
}

export default admin;
