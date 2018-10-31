import React, { Component } from "react";
import Layout from "../components/Layout";
import { Button, Form, Container, Message, Icon } from "semantic-ui-react";
import axios from "axios";
import Router from "../routes";

class register extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }

  async onSubmit() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    //create JSON with user input and send it to DB
    let data = { username, password };
    const res = await axios.post(window.location.origin + "/register", data);
    try {
      if (res.data.success) {
        alert(
          "Congratulations, you've successfully registred. Now proceed to the login page"
        );
        Router.pushRoute("login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Layout>
        <Container style={{ margin: "20px" }}>
          <div>
            <Message
              attached
              header="Register here to trade!"
              style={{ color: "#7a7a52" }}
            />
            <Form onSubmit={this.onSubmit} className="attached fluid segment">
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
              <Button style={{ color: "white", backgroundColor: "tomato" }}>
                Register
                <Icon name="signup" style={{ marginLeft: "5px" }} />
              </Button>
            </Form>
          </div>
        </Container>
      </Layout>
    );
  }
}

export default register;
