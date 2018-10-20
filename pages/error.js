import React, { Component } from "react";
import Layout from "../components/Layout";
import { Button, Header, Container } from "semantic-ui-react";
import Router from "../routes";
import axios from "axios";

class error extends Component {
  constructor(props) {
    super(props);
    this.state = { cookie: "" };
  }

  async componentWillMount() {
    let response = await axios.post(window.location.origin + "/getCookie");
    if (response.data.success) {
      this.setState({
        cookie: response.data.cookie
      });
    }
  }

  toProfile = () => {
    Router.pushRoute("myprofile");
  };
  toLogin = () => {
    Router.pushRoute("login");
  };

  render() {
    return (
      <Layout>
        <Container textAlign="center">
          <div>
            <Header size="huge" color="red">
              You are not allowed to see the content of this page
            </Header>
            {this.state.cookie.length > 0 ? (
              <Button content="Back to My Profile" onClick={this.toProfile} />
            ) : (
              <Button content="Back to Login" onClick={this.toLogin} />
            )}
          </div>
        </Container>
      </Layout>
    );
  }
}

export default error;
