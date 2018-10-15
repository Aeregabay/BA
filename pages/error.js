import React, { Component } from "react";
import Layout from "../components/Layout";
import { Button, Header, Container } from "semantic-ui-react";
import { Router } from "../routes";

class error extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toLogin = () => {
    Router.push("/login");
  };

  render() {
    return (
      <Layout>
        <Container textAlign="center">
          <div>
            <Header size="huge" color="red">
              You are not allowed to see the content of this page
            </Header>
            <Button content="Back to Login" onClick={this.toLogin} />
          </div>
        </Container>
      </Layout>
    );
  }
}

export default error;
