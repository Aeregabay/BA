import React, { Component } from "react";
import Layout from "../components/Layout";
import { Form, Button } from "semantic-ui-react";
import User from "../User";
import { Router } from "../routes";

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  onSubmit = event => {
    event.preventDefault();
    const user = new User(this.state.username, this.state.password);
    Router.pushRoute("/");
  };

  render() {
    return (
      <Layout>
        <div>
          <h2>Login using your personal information</h2>
          <Form onSubmit={this.onSubmit}>
            <Form.Group>
              <Form.Input
                label="Username"
                placeholder="enter your username"
                width={6}
                required
                value={this.state.username}
                onChange={event =>
                  this.setState({ username: event.target.value })
                }
                autoFocus
              />
              <Form.Input
                label="Password"
                placeholder="enter your password"
                width={6}
                required
                type="password"
                value={this.state.password}
                onChange={event =>
                  this.setState({ password: event.target.value })
                }
              />
            </Form.Group>
            <Button content="Login" color="green" />
          </Form>
        </div>
      </Layout>
    );
  }
}

export default login;
