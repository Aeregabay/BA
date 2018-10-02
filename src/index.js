import React, { Component } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import SearchBar from "./components/SearchBar";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Router, Route, IndexRoute } from "react-router";
import { HashRouter } from "react-router-dom";
import MyProfile from "./pages/MyProfile";

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
        <Home />
        <SearchBar itemSearch={this.itemSearch.bind(this)} />
        <Footer />
      </div>
    );
  }
}

export default App;
ReactDOM.render(
  <Router>
    <Route exact path="/" component={App} />
    <Route path="myprofile" component={MyProfile} />
  </Router>,
  document.getElementById("app")
);
