import React, { Component } from "react";
import { Router } from "../routes";
import { Button } from "semantic-ui-react";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toProfile = e => {
    Router.push("/myprofile");
  };
  toSettings = e => {
    Router.push("/settings");
  };
  toLogin = e => {
    Router.push("/login");
  };
  toRegister = e => {
    Router.push("/register");
  };
  toHome = e => {
    Router.push("/");
  };
  render() {
    return (
      <div>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"
        />
        <h1>This is the global header</h1>
        <Button
          color="black"
          onClick={this.toHome}
          content="Home"
          icon="Home"
          labelPosition="right"
        />
        <Button.Group>
          <Button
            primary
            icon="add"
            onClick={this.toProfile}
            content="My Profile"
            labelPosition="right"
          />
          <Button
            color="grey"
            icon="minus"
            onClick={this.toSettings}
            content="Settings"
            labelPosition="right"
          />
        </Button.Group>
        <Button.Group>
          <Button positive onClick={this.toLogin} content="Login" />
          <Button.Or />
          <Button color="purple" onClick={this.toRegister} content="Register" />
        </Button.Group>

        {this.props.children}
        <h1>This is the global footer</h1>
      </div>
    );
  }
}

export default Layout;
