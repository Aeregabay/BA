import React, { Component } from "react";
import Layout from "../components/Layout";

class item extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout>
        <div>
          <h1>this is the item page</h1>
        </div>
      </Layout>
    );
  }
}

export default item;
