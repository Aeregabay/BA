import React, { Component } from "react";
import { Container } from "semantic-ui-react";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: "" };
  }

  onChangeHandler(e) {
    const searchTerm = e.target.value;
    this.setState({ searchTerm });
    this.props.itemSearch(searchTerm);
  }

  render() {
    return (
      <Container style={{ marginTop: "30px" }}>
        <div className="ui fluid category search">
          <div className="ui fluid icon input">
            <input
              type="text"
              placeholder="What are you looking for?"
              onChange={this.onChangeHandler.bind(this)}
            />
            <i className="search icon" />
          </div>
        </div>
        {/* <script> $(".ui.fluid.icon.input").search({});</script> */}
      </Container>
    );
  }
}

export default SearchBar;
