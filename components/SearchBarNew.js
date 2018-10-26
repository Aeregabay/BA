import React, { Component } from "react";
import axios from "axios";
import { Container, Icon, Input } from "semantic-ui-react";

class SearchBarNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      isLoading: false
    };
  }

  //pass search query to server and obtain object ids
  //pass those object ids to Itemlist to render items to display after search
  async getObjectIds() {
    let result = await axios.post(window.location.origin + "/search", {
      query: this.state.query
    });
    if (result.data.success) {
      this.props.passObjectIds(result.data.ids);
      this.setState({ query: "", isLoading: false });
    } else {
      console.log("the search has failed");
    }
  }

  //when search icon is clicked
  onIconClick() {
    this.setState({ isLoading: true });
    sendQuery();
  }

  //when enter key is hit
  onEnter(e) {
    if (e.key === "Enter") {
      this.setState({ isLoading: true });
      this.getObjectIds();
    }
  }

  render() {
    return (
      <div>
        <Container style={{ marginTop: "30px" }}>
          <Input
            icon={
              <Icon
                circular
                link
                name="search"
                onClick={this.onIconClick.bind(this)}
              />
            }
            fluid
            value={this.state.query}
            onChange={query => this.setState({ query: query.target.value })}
            type="text"
            placeholder="What are you looking for?"
            onKeyPress={this.onEnter.bind(this)}
            style={{ maxWidth: "85.5%", margin: "auto" }}
            loading={this.state.isLoading}
          />
        </Container>
      </div>
    );
  }
}

export default SearchBarNew;
