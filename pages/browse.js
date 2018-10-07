import React, { Component } from "react";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import { Header, Container } from "semantic-ui-react";
import SearchBarNew from "../components/SearchBarNew";

class browse extends Component {
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
        <Container>
          <div>
            <Header size="medium">Browse for products</Header>
            {/* <SearchBar itemSearch={this.itemSearch.bind(this)} /> */}
            <SearchBarNew itemSearch={this.itemSearch.bind(this)} />
          </div>
        </Container>
      </Layout>
    );
  }
}

export default browse;
