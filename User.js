import React, { Component } from "react";

class User extends Component {
  constructor(username, password) {
    super();
    this.state = {
      username,
      password
    };
    console.log(this.state.username);
    console.log(this.state.password);
  }
}

export default User;
