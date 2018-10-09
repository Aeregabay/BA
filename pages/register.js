import React, { Component } from "react";
import Layout from "../components/Layout";
import { Button, Form, Container } from "semantic-ui-react";
import axios from "axios";
import { Router } from "../routes";

class register extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.onSubmit = e => this._onSubmit();
  }

  async _onSubmit() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let data = { username, password };

    try {
      const res = await axios.post(window.location.origin + "/register", data);
      if (res.data.success) {
        Router.push("/");
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
                  width={6}
                  required
                  autoFocus
                />
                <Form.Input
                  id="password"
                  label="Password"
                  placeholder="Enter your password"
                  width={6}
                />
                <Form.Input
                  label="Last Name"
                  placeholder="Last Name"
                  width={6}
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  label="Street"
                  placeholder="Enter your address"
                  width={16}
                />
                <Form.Input label="House Number" placeholder="#" width={2} />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  label="Zip Code"
                  placeholder="Enter your Zip Code"
                  width={4}
                />
                <Form.Input
                  label="City"
                  placeholder="Enter your City"
                  width={7}
                />
                <Form.Input
                  label="State"
                  placeholder="Enter your state"
                  width={7}
                />
                <Form.Input
                  label="Country"
                  placeholder="Enter your country"
                  width={7}
                />
              </Form.Group>
              <Button content="Submit!" color="red" />
            </Form>
          </div>
        </Container>
      </Layout>
    );
  }
}

export default register;
