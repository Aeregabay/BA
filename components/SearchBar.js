import React, { Component } from "react";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { term: "What are you looking for?" };
  }
  render() {
    return (
      <div className="search-bar">
        <input
          value={this.state.term}
          onChange={this.handleChange.bind(this)}
        />
      </div>
    );
  }

  handleChange(e) {
    const term = e.target.value;
    this.setState({ term });
    this.props.itemSearch(term);
  }
}

export default SearchBar;
