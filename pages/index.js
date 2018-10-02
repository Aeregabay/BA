import React, { Component } from "react";
import ReactDOM from "react-dom";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "../next/link";

import MyProfile from "./MyProfile";

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
      <div>
        <Header />
        <Link href="/myprofile">
          <button>My Profile</button>
        </Link>
        <SearchBar itemSearch={this.itemSearch.bind(this)} />
        <Footer />
      </div>
    );
  }
}

export default App;
// ReactDOM.render(<App />, document.getElementById("app"));
