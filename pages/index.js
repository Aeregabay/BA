import React, { Component } from "react";
import SearchBar from "../components/SearchBar";

import Layout from "../components/Layout";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      items: [],
      selectedItem: null
    };
  }

  itemSearch(searchTerm) {
    this.setState({
      searchTerm
    });
    console.log(this.state.searchTerm);
  }

  render() {
    return (
      <Layout>
        <SearchBar itemSearch={this.itemSearch.bind(this)} />
      </Layout>
    );
  }
}

export default App;
// ReactDOM.render(<App />, document.getElementById("app"));
