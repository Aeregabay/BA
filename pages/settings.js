import React, { Component } from "react";
import Layout from "../components/Layout";
import { Container, Header } from "semantic-ui-react";

class settings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout>
        <Container style={{ textAlign: "center" }}>
          <Header size="huge">this is the settings page</Header>
        </Container>
      </Layout>
    );
  }
}

export default settings;
