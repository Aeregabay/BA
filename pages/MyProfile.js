import React, { Component } from "react";
import Layout from "../components/Layout";

class myprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout>
        <div>
          <h1>this is the my profile page</h1>
        </div>
      </Layout>
    );
  }
}

export default myprofile;
