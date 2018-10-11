import React, { Component } from "react";
import Layout from "../components/Layout";
import { Button, Form, Container } from "semantic-ui-react";
import axios from "axios";
import { Router } from "../routes";

class register extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    // this.onSubmit = e => this._onSubmit(); //don't know what this does...
  }

  async onSubmit() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let data = { username, password };
    const res = await axios.post(window.location.origin + "/register", data);
    try {
      if (res.data.success) {
        alert(
          "Congratulations, you've successfully registred. Now proceed to the login page"
        );
        Router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Layout>
        <Container>
          <div>
            <h2>Register here to trade!</h2>
            <Form onSubmit={this.onSubmit}>
              <Form.Group>
                <Form.Input
                  id="username"
                  label="Username"
                  placeholder="Username"
                  width={9}
                  required
                  autoFocus
                />
                <Form.Input
                  id="password"
                  label="Password"
                  placeholder="Enter your password"
                  width={9}
                  type="password"
                  required
                />
              </Form.Group>
              <Button content="Register now" color="google plus" />
            </Form>
          </div>
        </Container>
      </Layout>
    );
  }
}

export default register;
