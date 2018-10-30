import React, { Component } from "react";
import { Container, Card, Icon, Image } from "semantic-ui-react";
import axios from "axios";
import Router from "../routes";

let currentObjectId = "";

class Itemlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initObjects: [],
      initObjectIds: [],
      initObjectTags: [],
      initObjectPics: []
    };
  }

  //update displayed items after search query input
  async updateItems(objectIds) {
    let objects = await axios.post(window.location.origin + "/getObjects", {
      objectIds
    });

    if (objects.data.success) {
      this.setState({
        initObjects: objects.data.objectsToSend,
        initObjectIds: objects.data.objectIds,
        initObjectTags: objects.data.resultingTags,
        initObjectPics: objects.data.resultingPics
      });
    } else {
      console.log("failure");
    }
  }

  //fetch 10 objects from DB at page loadup and write to state
  async componentWillMount() {
    //adds case that page is accessed with prefetched Ids
    let objects;

    //case that url only contains pathname "browse"
    if (window.location.pathname === "/browse") {
      objects = await axios.post(window.location.origin + "/getObjects");

      // case that url looks like this: "/browse/id1-id2-id3"
    } else {
      //deconstruct pathname into "/browse" and the id-part that we need
      let pathname = window.location.pathname.split("/");

      //second entry in the splitted array is the part that we need
      let objectIdsDash = pathname[pathname.length - 1];

      //now split all the ids that are delimited with "-"
      let objectIdsFinal = objectIdsDash.split("-");

      //call getObjects with newly contructed array of ids of objects to fetch
      objects = await axios.post(window.location.origin + "/getObjects", {
        objectIds: objectIdsFinal
      });
    }
    if (objects.data.success) {
      this.setState({
        initObjects: objects.data.objectsToSend,
        initObjectIds: objects.data.objectIds,
        initObjectTags: objects.data.resultingTags,
        initObjectPics: objects.data.resultingPics
      });
    } else {
      console.log("failure");
    }
  }

  //truncate description to fit in Card
  truncate(text) {
    if (text.length > 100) {
      return text.substring(0, 97) + "...";
    } else {
      return text;
    }
  }

  //only display 2 lines of tags
  truncateTags(tags) {
    let maxLength;
    let string = "";
    for (let i = 0; i < tags.length; i++) {
      if (string.length + tags[i].length < 85) {
        string += tags[i];
      } else {
        maxLength = i;
        console.log();
        tags[maxLength - 1] = tags[maxLength - 1].replace("|", "");
        break;
      }
    }

    return tags.slice(0, maxLength);
  }

  pushRoute(id) {
    Router.pushRoute("item", { id: id });
  }

  renderObjects() {
    //array to return after all 10 items are constructed
    let finalObjects = [];

    //this whole following process has to be done for all objects
    //that were initially fetched
    for (let i = 0; i < this.state.initObjects.length; i++) {
      let uniqueKey = "Card" + i;

      //arrays to be filled with only necessary information
      let tags = [];
      let pics = [];
      //variables to make further code easier to read
      let title = this.state.initObjects[i].title;
      let description = this.state.initObjects[i].description;
      let id = this.state.initObjects[i].id;
      currentObjectId = id;
      let owner = this.state.initObjects[i].owner;
      let price = this.state.initObjects[i].price;
      let category = this.state.initObjects[i].category;

      //for each object, write all the tags that correspond to it
      //from the initObjectTags array to this new array
      for (let i = 0; i < this.state.initObjectTags.length; i++) {
        if (this.state.initObjectTags[i][0].corresp_obj_id === id) {
          tags.push(this.state.initObjectTags[i][0].content + " | ");
        }
      }

      //for each object, write all the pics that correspond to it
      //from the initObjectPics array to this new array
      for (let i = 0; i < this.state.initObjectPics.length; i++) {
        if (this.state.initObjectPics[i][0].corresp_obj_id == id) {
          pics.push(this.state.initObjectPics[i][0].name);
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
                onClick={this.pushRoute.bind(this, id)}
              />
            </div>
            <Card.Content href={`item/${id}`}>
              <Card.Header style={{ color: "#999966" }}>{title}</Card.Header>
              <Card.Meta>{price}</Card.Meta>
              <Card.Description>
                <span
                  style={{
                    textOverflow: "ellipsis",
                    overflow: "hidden"
                  }}
                >
                  {this.truncate(description)}
                </span>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="user secret" style={{ color: "#999966" }} />
                {owner}
              </a>
              <p />
              <a>
                <Icon name="filter" style={{ color: "#999966" }} />
                {category}
              </a>
              <p />
              <a>
                <Icon name="tags" style={{ color: "#999966" }} />
                {this.truncateTags(tags)}
              </a>
            </Card.Content>
          </Card>
        </div>
      );
    }

    return finalObjects;
  }
  render() {
    return (
      <Container
        style={{
          marginTop: "30px",
          display: "flex"
        }}
      >
        <Card.Group
          centered
          itemsPerRow={3}
          style={{ maxWidth: "90%", marginLeft: "6.4%" }}
        >
          {this.renderObjects()}
        </Card.Group>
      </Container>
    );
  }
}
export default Itemlist;
