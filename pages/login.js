import React, { Component } from "react";
import Layout from "../components/Layout";
import { Form, Button } from "semantic-ui-react";
import axios from "axios";
import { Router } from "../routes";

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  async onSubmit() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let data = { username, password };

    try {
      const res = await axios.post(window.location.origin + "/login", data);
      if (res.data.success) {
        Router.push("/myprofile");
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Layout>
        <div>
          <h2>Login using your personal information</h2>
          <Form onSubmit={this.onSubmit}>
            <Form.Group>
              <Form.Input
                id="username"
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
                id="password"
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
