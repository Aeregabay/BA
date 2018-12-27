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
import { truncate, truncateTags } from "../utils/Truncate";

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

  renderObjects() {
    if (this.state.objects) {
      //array to return after all 10 items are constructed
      let finalObjects = [];

      //this whole following process has to be done for all objects
      //that were initially fetched
      for (let i = 0; i < this.state.objects.length; i++) {
        let uniqueKey = "Card" + i;

        //arrays to be filled with only necessary information
        let tags = [];
        let pics = [];
        //variables to make further code easier to read
        let title = this.state.objects[i].title;
        let description = this.state.objects[i].description;
        let id = this.state.objects[i].id;
        let owner = this.state.objects[i].owner;
        let price = this.state.objects[i].price;
        let category = this.state.objects[i].category;

        //for each object, write all the tags that correspond to it
        //from the tags array to this new array
        for (let i = 0; i < this.state.tags.length; i++) {
          if (this.state.tags[i].corresp_obj_id === id) {
            tags.push(this.state.tags[i].content + " | ");
          }
        }

        //for each object, write all the pics that correspond to it
        //from the pics array to this new array
        for (let i = 0; i < this.state.pics.length; i++) {
          if (this.state.pics[i].corresp_obj_id == id) {
            pics.push(this.state.pics[i].name);
          }
        }
        //remove the vertical divider from the last tag for nicer display
        if (tags.length > 0) {
          tags[tags.length - 1] = tags[tags.length - 1].replace("|", "");
        }

        //create img source
        let imgSrc = "../static/" + pics[0];

        //create the actual JSX objects and push to array that is returned
        finalObjects.push(
          <div
            key={uniqueKey}
            style={{ marginBottom: "30px", marginRight: "30px" }}
          >
            <Card raised link style={{ height: "550px", width: "300px" }}>
              <div
                style={{
                  height: "300px"
                }}
              >
                <Image
                  src={imgSrc}
                  style={{
                    maxHeight: "300px",
                    maxWidth: "300px",
                    borderRadius: "2px",
                    margin: "auto"
                  }}
                  value={id}
                  onClick={() => {
                    this.pushRoute(id);
                  }}
                />
              </div>
              <Card.Content href={`item/${id}`}>
                <Card.Header style={{ color: "#7a7a52" }}>{title}</Card.Header>
                <Card.Meta style={{ color: "#adad85" }}>{price}</Card.Meta>
                <Card.Description>
                  <span
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      color: "#ccccb3"
                    }}
                  >
                    {truncate(description)}
                  </span>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name="user secret" style={{ color: "#7a7a52" }} />
                  <span style={{ color: "#ccccb3" }}>{owner}</span>
                </a>
                <p />
                <a>
                  <Icon name="filter" style={{ color: "#7a7a52" }} />
                  <span style={{ color: "#ccccb3" }}>{category}</span>
                </a>
                <p />
                <a>
                  <Icon name="tags" style={{ color: "#7a7a52" }} />
                  <span style={{ color: "#ccccb3" }}>{truncateTags(tags)}</span>
                </a>
              </Card.Content>
            </Card>
          </div>
        );
      }

      return finalObjects;
    }
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
            {this.renderObjects()}
          </Card.Group>
        </Container>
      </Layout>
    );
  }
}

export default user;
