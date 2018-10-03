import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { Link, Router } from "../routes";
import Layout from "../components/Layout";

class register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout>
        <div>
          <h1>this is the register page</h1>
        </div>
      </Layout>
    );
  }
}

export default register;
