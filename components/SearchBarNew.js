import React, { Component } from "react";
import axios from "axios";
import Suggestions from "./Suggestions";
import { Container } from "semantic-ui-react";

class SearchBarNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: [
        { name: "this is a test", id: 1 },
        { name: "this is also a test", id: 2 }
      ]
    };
  }
  onChangeHandler = () => {
    this.setState({ query: this.search.value }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.getInfo();
        }
      }
    });
  };

  getInfo = () => {
    TODO: "implement search in DB";
  };

  render() {
    return (
      <div>
        <Container style={{ marginTop: "30px" }}>
          <div className="ui fluid category search">
            <div className="ui fluid icon input">
              <input
                type="text"
                placeholder="What are you looking for?"
                onChange={this.onChangeHandler.bind(this)}
                ref={input => (this.search = input)}
              />
              <i className="search icon" />
            </div>
          </div>
        </Container>
        <Container>
          <Suggestions results={this.state.results} />
        </Container>
      </div>
    );
  }
}

export default SearchBarNew;
