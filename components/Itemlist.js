import React, { Component } from "react";
import { Container, Card, Icon, Image } from "semantic-ui-react";
import axios from "axios";
import Router from "../routes";
import { renderObjects } from "../utils/renderObjectsUtil";

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
    try {
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

        //call getObjects with newly constructed array of ids of objects to fetch
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
    } catch (err) {
      console.log(err);
    }
  }

  pushRoute(id) {
    Router.pushRoute("item", { id: id });
  }

  callRender() {
    return renderObjects(
      this.state.initObjects,
      this.state.initObjectTags,
      this.state.initObjectPics
    );
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
          {this.callRender()}
        </Card.Group>
      </Container>
    );
  }
}
export default Itemlist;
