import React, { Component } from "react";
import {
  Container,
  Card,
  Icon,
  Image,
  CardHeader,
  CardMeta,
  CardDescription
} from "semantic-ui-react";
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

    this.renderObjects();
  }

  renderObjects() {
    let finalObjects = [];

    for (let i = 0; i < this.state.initObjects.length; i++) {
      let tags = [];
      let pics = [];
      let title = this.state.initObjects[i].title;
      let description = this.state.initObjects[i].description;
      let id = this.state.initObjects[i].id;
      let owner = this.state.initObjects[i].owner;
      let price = this.state.initObjects[i].price;
      let category = this.state.initObjects[i].category;

      for (let i = 0; i < this.state.initObjectTags.length; i++) {
        if (this.state.initObjectTags[i][0].corresp_obj_id === id) {
          tags.push(this.state.initObjectTags[i][0].content + " | ");
        }
      }
      for (let i = 0; i < this.state.initObjectPics.length; i++) {
        if (this.state.initObjectPics[i][0].corresp_obj_id == id) {
          pics.push(this.state.initObjectPics[i][0].name);
        }
      }

      let imgSrc = "../static/" + pics[0];

      finalObjects.push(
        <div style={{ marginBottom: "30px", marginRight: "30px" }}>
          <Card style={{ maxHeight: "500px" }}>
            <Image
              src={imgSrc}
              style={{
                maxHeight: "300px",
                maxWidth: "300px"
              }}
            />
            <Card.Content>
              <Card.Header>{title}</Card.Header>
              <Card.Meta>{price}</Card.Meta>
              <Card.Description>{description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
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
      <Container>
        <Card.Group centered itemsPerRow={2}>
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
