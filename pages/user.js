import {
  Button,
  Container,
  Header,
  Card,
  Icon,
  Image
} from "semantic-ui-react";
import React, { Component } from "react";
import Layout from "../components/Layout";
import Router from "../routes";
import axios from "axios";
import { renderObjects } from "../utils/renderObjectsUtil";

class user extends Component {
  constructor(props) {
    super(props);
    this.state = { userId: "", user: [], objects: [], pics: [], tags: [] };
  }

  async componentWillMount() {
    //fetch userId from path (integer after the "/")
    let pathname = window.location.pathname.split("/");
    this.setState({ userId: pathname[pathname.length - 1] });

    let result = await axios.post(window.location.origin + "/getUser", {
      userId: pathname[pathname.length - 1]
    });

    if (result.data.success) {
      this.setState({
        user: result.data.user,
        objects: result.data.objects,
        pics: result.data.pics,
        tags: result.data.tags
      });
    } else {
      alert("This user doesn't exist");
      Router.pushRoute("browse");
    }
  }

  pushRoute(id) {
    Router.pushRoute("item", { id: id });
  }

  callRender() {
    return renderObjects(this.state.objects, this.state.tags, this.state.pics);
  }

  render() {
    return (
      <Layout>
        <Container style={{ maxWidth: "90%" }}>
          <Header size="huge" style={{ color: "#7a7a52", textAlign: "center" }}>
            {this.state.user.username}
          </Header>
          <Header
            size="big"
            style={{
              color: "#7a7a52",
              textAlign: "center",
              marginBottom: "5%"
            }}
          >
            Items being sold by {this.state.user.username}
          </Header>
          <Card.Group
            centered
            itemsPerRow={3}
            style={{ maxWidth: "90%", marginLeft: "6.4%" }}
          >
            {this.callRender()}
          </Card.Group>
        </Container>
      </Layout>
    );
  }
}

export default user;
