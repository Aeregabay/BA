import React, { Component } from "react";
import ReactDOM from "react-dom";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, Router } from "../routes";
import MyProfile from "./myprofile";

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

  toProfile = e => {
    Router.push("/myprofile");
  };

  render() {
    return (
      <div>
        <Header />
        <button onClick={this.toProfile}>My Profile</button>
        <SearchBar itemSearch={this.itemSearch.bind(this)} />
        <Footer />
      </div>
    );
  }
}

export default App;
// ReactDOM.render(<App />, document.getElementById("app"));
