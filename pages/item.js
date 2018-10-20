import React, { Component } from "react";
import Layout from "../components/Layout";
import axios from "axios";

class item extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentWillMount() {
    let pathname = window.location.pathname.split("/");
    let id = pathname[pathname.length - 1];
    let response = await axios.post(window.location.origin + "/item", { id });
    if (response.data.success) {
      console.log(response.data.id);
      console.log(response.data.object);
      console.log(response.data.tags);
      console.log(response.data.pics);
    }
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
