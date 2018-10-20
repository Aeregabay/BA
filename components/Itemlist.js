import React, { Component } from "react";
import { Container, Card, Icon, Image } from "semantic-ui-react";
import axios from "axios";

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

  //fetch 10 objects from DB at page loadup and write to state
  async componentDidMount() {
    let objects = await axios.post(window.location.origin + "/getObjects");
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

  renderObjects() {
    //array to return after all 10 items are constructed
    let finalObjects = [];

    //this whole following process has to be done for all objects
    //that were initially fetched
    for (let i = 0; i < this.state.initObjects.length; i++) {
      //arrays to be filled with only necessary information
      let tags = [];
      let pics = [];
      //variables to make further code easier to read
      let title = this.state.initObjects[i].title;
      let description = this.state.initObjects[i].description;
      let id = this.state.initObjects[i].id;
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
      tags[tags.length - 1] = tags[tags.length - 1].substring(
        0,
        tags[tags.length - 1].length - 2
      );

      //create img source
      let imgSrc = "../static/" + pics[0];

      //create the actual JSX objects and push to array that is returned
      finalObjects.push(
        <div style={{ marginBottom: "30px", marginRight: "30px" }}>
          <Card raised link style={{ height: "500px", width: "300px" }}>
            <div
              style={{
                height: "330px"
              }}
            >
              <Image
                src={imgSrc}
                style={{
                  maxHeight: "300px",
                  maxWidth: "300px",
                  borderRadius: "2px"
                }}
              />
            </div>
            <Card.Content style={{}}>
              <Card.Header>{title}</Card.Header>
              <Card.Meta>{price} CHF</Card.Meta>
              <Card.Description>{description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="user secret" />
                {owner}
              </a>
              <p />
              <a>
                <Icon name="filter" />
                {category}
              </a>
              <p />
              <a>
                <Icon name="tags" />
                {tags}
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
        <Card.Group centered itemsPerRow={3}>
          {this.renderObjects()}
        </Card.Group>
      </Container>
    );
  }
}
export default Itemlist;
{
  /* <div className="ui items">
          {}
          <div className="item">
            <div className="ui small image">
              <img src="../static/bike.png" />
            </div>
            <div className="content">
              <div className="header">Mountainbike</div>
              <div className="meta">
                <span className="price">$1200</span>
                <span className="stay">12 bids</span>
              </div>
              <div className="description" />
            </div>
          </div>
          <div className="item">
            <div className="ui small image">
              <img src="../static/car.png" />
            </div>
            <div className="content">
              <div className="header">Car</div>
              <div className="meta">
                <span className="price">$1000</span>
                <span className="stay">6 bids </span>
              </div>
              <div className="description">
                <p />
              </div>
            </div>
          </div>
          <div className="item">
            <div className="ui small image">
              <img src="../static/iphone.jpg" />
            </div>
            <div className="content">
              <div className="header">iPhone</div>
              <div className="meta">
                <span className="price">$1600</span>
                <span className="stay">0 bids</span>
              </div>
              <div className="description">
                <p />
              </div>
            </div>
          </div>
        </div> */
}
