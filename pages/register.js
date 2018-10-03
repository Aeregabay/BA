import React, { Component } from "react";
import Layout from "../components/Layout";
import { Button, Form, Container } from "semantic-ui-react";

class register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout>
        <Container>
          <div>
            <h2>Register here to trade!</h2>
            <Form>
              <Form.Group>
                <Form.Input
                  label="First Name"
                  placeholder="First Name"
                  width={6}
                  required
                />
                <Form.Input
                  label="Middle Name"
                  placeholder="Middle Name"
                  width={6}
                />
                <Form.Input
                  label="Last Name"
                  placeholder="Last Name"
                  width={6}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  label="Street"
                  placeholder="Enter your address"
                  width={16}
                  required
                />
                <Form.Input
                  label="House Number"
                  placeholder="#"
                  width={2}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  label="Zip Code"
                  placeholder="Enter your Zip Code"
                  width={4}
                  required
                />
                <Form.Input
                  label="City"
                  placeholder="Enter your City"
                  width={7}
                  required
                />
                <Form.Input
                  label="State"
                  placeholder="Enter your state"
                  width={7}
                  required
                />
                <Form.Input
                  label="Country"
                  placeholder="Enter your country"
                  width={7}
                  required
                />
              </Form.Group>
            </Form>
          </div>
          <Button content="Submit!" color="red" />
        </Container>
      </Layout>
    );
  }
}

export default register;
