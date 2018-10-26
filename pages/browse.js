import React, { Component } from "react";
import Layout from "../components/Layout";
import { Header, Container } from "semantic-ui-react";
import SearchBar from "../components/SearchBar";
import Itemlist from "../components/Itemlist";

class browse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      objectIds: []
    };
    this.itemlist = React.createRef();
  }

  //take search query from search bar and pass it to Itemlist component to display searched items
  passObjectIds(ids) {
    this.setState({
      objectIds: ids
    });
    this.itemlist.current.updateItems(this.state.objectIds);
  }

  render() {
    return (
      <Layout>
        <div>
          <Container style={{ align: "center" }}>
            <div>
              <Header size="large" style={{ textAlign: "center" }}>
                Browse for products
              </Header>
              <SearchBar passObjectIds={this.passObjectIds.bind(this)} />
            </div>
            <Itemlist ref={this.itemlist} />
          </Container>
        </div>
      </Layout>
    );
  }
}

export default browse;
