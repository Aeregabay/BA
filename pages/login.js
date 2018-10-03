import React, { Component } from "react";
import Layout from "../components/Layout";
import { Form } from "semantic-ui-react";

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout>
        <div>
          <h2>Login using your personal information</h2>
          <Form>
            <Form.Group>
              <Form.Input
                label="Username"
                placeholder="enter your username"
                width={6}
                required
              />
              <Form.Input
                label="Password"
                placeholder="enter your password"
                width={6}
                required
                type="password"
              />
            </Form.Group>
          </Form>
        </div>
      </Layout>
    );
  }
}

export default login;
