import React, { Component } from "react";
import Layout from "../components/Layout";
import { Form, Button, Container, Message, Icon } from "semantic-ui-react";
import axios from "axios";
import Router from "../routes";
import { setCookie } from "../utils/CookieUtils";

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  async onSubmit() {
    //fetch username and password from the form
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let data = { username, password };

    try {
      const res = await axios.post(window.location.origin + "/login", data);
      //if login succeeds
      if (res.data.success) {
        //if person logging in is not an admin
        if (res.data.admin == 0) {
          setCookie("x-access-token", res.data.token, 1);
          Router.pushRoute("myprofile");
          //if person is an admin
        } else {
          setCookie("x-access-token", res.data.adminToken, 1);
          Router.pushRoute("admin");
        }
      } else if (res.data.success == false && res.data.userExists == false) {
        alert("Username or password incorrect, please try again");
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Layout>
        <div>
          <Container style={{ margin: "20px" }}>
            <Message
              style={{ color: "#7a7a52" }}
              attached
              header="Login using your personal information."
            />
            <Form onSubmit={this.onSubmit} className="attached fluid segment">
              <Form.Group>
                <Form.Input
                  id="username"
                  label="Username"
                  placeholder="enter your username"
                  width={9}
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
                  width={9}
                  required
                  type="password"
                  value={this.state.password}
                  onChange={event =>
                    this.setState({ password: event.target.value })
                  }
                />
              </Form.Group>
              <Button style={{ color: "white", backgroundColor: "#00cc7a" }}>
                Login <Icon name="sign-in" style={{ marginLeft: "5px" }} />
              </Button>
            </Form>
          </Container>
        </div>
      </Layout>
    );
  }
}

export default login;
