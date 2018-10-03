import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { Link, Router } from "../routes";
import Layout from "../components/Layout";

class settings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toHome = e => {
    Router.push("/");
  };

  render() {
    return (
      <Layout>
        <div>
          <h1>this is the settings page</h1>
        </div>
      </Layout>
    );
  }
}

export default settings;
