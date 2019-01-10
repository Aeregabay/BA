import React, { Component } from "react";
import {
  Container,
  Header,
  Menu,
  Divider,
  Grid,
  Card,
  Icon,
  Image
} from "semantic-ui-react";
import Layout from "../components/Layout";
import { truncate, truncateTags } from "../utils/Truncate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faStamp,
  faPalette,
  faHeadphonesAlt,
  faBookOpen,
  faIndustry,
  faDesktop,
  faCarSide,
  faTools,
  faCompactDisc,
  faCameraRetro,
  faGamepad,
  faLeaf,
  faMobile,
  faCouch,
  faBaby,
  faTshirt,
  faRestroom,
  faShapes,
  faGuitar,
  faCoins,
  faBoxOpen,
  faRobot,
  faFutbol,
  faTicketAlt,
  faPaw,
  faCrown,
  faWineGlassAlt
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Router from "../routes";

library.add(
  fab,
  faStamp,
  faPalette,
  faHeadphonesAlt,
  faBookOpen,
  faIndustry,
  faDesktop,
  faCarSide,
  faTools,
  faCompactDisc,
  faCameraRetro,
  faGamepad,
  faLeaf,
  faMobile,
  faCouch,
  faBaby,
  faTshirt,
  faRestroom,
  faShapes,
  faGuitar,
  faCoins,
  faBoxOpen,
  faRobot,
  faFutbol,
  faTicketAlt,
  faPaw,
  faCrown,
  faWineGlassAlt
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { objects: [] };
  }

  //render 4 random objects from the DB
  async componentWillMount() {
    let result = await axios.post(window.location.origin + "/getRandomObjects");

    if (result.data.success) {
      this.setState({
        objects: result.data.objects,
        pics: result.data.pictures,
        tags: result.data.tags
      });
      console.log(this.state.objects);
      console.log(this.state.pictures);
      console.log(this.state.tags);
    }
  }

  //fetches objectIds to display from server
  getObjectIds = async searchTerm => {
    let result = await axios.post(window.location.origin + "/search", {
      query: searchTerm
    });
    if (result.data.success) {
      let objectIds = result.data.ids;
      let idString = "";

      //constructs String to display in URL to later read out
      //the string looks like: /browse/id1-id2-id3 etc.
      for (let i = 0; i < objectIds.length; i++) {
        idString += objectIds[i] + "-";
      }
      //remove last "-" to make reading out in ItemList component cleaner
      idString = idString.slice(0, idString.length - 1);

      //push to constructed route
      Router.pushRoute("browseIds", { id: idString });
      this.setState({ query: "", isLoading: false });
    } else {
      console.log("the search has failed");
    }
  };

  //push to desired item id
  pushRoute(id) {
    Router.pushRoute("item", { id: id });
  }

  //render up to 4 objects into the "try your luck section" as cards
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
        <Container
          style={{
            margin: "20px"
          }}
        >
          <Header
            size="huge"
            content="Welcome to EthTrade, a decentralized Marketplace"
            style={{ textAlign: "center", color: "#7a7a52" }}
          />
          <Divider />
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column width={5}>
                <Header
                  size="medium"
                  content="Browse for categories"
                  style={{
                    textAlign: "left",
                    color: "#7a7a52",
                    marginLeft: "22px"
                  }}
                />
              </Grid.Column>
              <Grid.Column width={11}>
                <Header
                  size="medium"
                  content="Or try your luck"
                  style={{
                    color: "#7a7a52",
                    textAlign: "center"
                  }}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={5}>
                <Menu vertical style={{ width: "17rem" }}>
                  <Menu.Item
                    style={{
                      lineHeight: "28px",
                      fontWeight: "600"
                    }}
                    onClick={() => this.getObjectIds("Antiquities & Art")}
                  >
                    <FontAwesomeIcon
                      color="#7a7a52"
                      icon="palette"
                      size="2x"
                      style={{
                        float: "left",
                        marginRight: "17px",
                        marginLeft: "4"
                      }}
                    />
                    <span style={{ color: "#7a7a52" }}>Antiquities & Art</span>
                  </Menu.Item>

                  <Menu.Item
                    style={{
                      lineHeight: "28px",
                      fontWeight: "600"
                    }}
                    onClick={() => this.getObjectIds("Audio, Video & TV")}
                  >
                    <FontAwesomeIcon
                      color="#7a7a52"
                      icon="headphones-alt"
                      size="2x"
                      style={{
                        float: "left",
                        marginRight: "17px",
                        marginLeft: "4"
                      }}
                    />
                    <span style={{ color: "#7a7a52" }}>Audio, Video & TV</span>
                  </Menu.Item>

                  <Menu.Item
                    style={{
                      lineHeight: "28px",
                      fontWeight: "600"
                    }}
                    onClick={() => this.getObjectIds("Poststamps")}
                  >
                    <FontAwesomeIcon
                      color="#7a7a52"
                      icon="stamp"
                      size="2x"
                      style={{
                        float: "left",
                        marginRight: "17px",
                        marginLeft: "4"
                      }}
                    />
                    <span style={{ color: "#7a7a52" }}> Poststamps</span>
                  </Menu.Item>

                  <Menu.Item
                    style={{
                      lineHeight: "28px",
                      fontWeight: "600"
                    }}
                    onClick={() => this.getObjectIds("Books & Comics")}
                  >
                    <FontAwesomeIcon
                      color="#7a7a52"
                      icon="book-open"
                      size="2x"
                      style={{
                        float: "left",
                        marginRight: "15px",
                        marginLeft: "2"
                      }}
                    />
                    <span style={{ color: "#7a7a52" }}> Books & Comics</span>
                  </Menu.Item>

                  <Menu.Item
                    style={{
                      lineHeight: "28px",
                      fontWeight: "600"
                    }}
                    onClick={() => this.getObjectIds("Office & Industry")}
                  >
                    <FontAwesomeIcon
                      color="#7a7a52"
                      icon="industry"
                      size="2x"
                      style={{
                        float: "left",
                        marginRight: "17px",
                        marginLeft: "4"
                      }}
                    />
                    <span style={{ color: "#7a7a52" }}>Office & Industry</span>
                  </Menu.Item>

                  <Menu.Item
                    style={{
                      lineHeight: "28px",
                      fontWeight: "600"
                    }}
                    onClick={() => this.getObjectIds("Computer & Network")}
                  >
                    <FontAwesomeIcon
                      color="#7a7a52"
                      icon="desktop"
                      size="2x"
                      style={{
                        float: "left",
                        marginRight: "15px",
                        marginLeft: "2"
                      }}
                    />
                    <span style={{ color: "#7a7a52" }}>Computer & Network</span>
                  </Menu.Item>

                  <Menu.Item
                    style={{
                      lineHeight: "28px",
                      fontWeight: "600"
                    }}
                    onClick={() => this.getObjectIds("Vehicles")}
                  >
                    <FontAwesomeIcon
                      color="#7a7a52"
                      icon="car-side"
                      size="2x"
                      style={{
                        float: "left",
                        marginRight: "15px",
                        marginLeft: "auto"
                      }}
                    />
                    <span style={{ color: "#7a7a52" }}> Vehicles</span>
                  </Menu.Item>

                  <Menu.Item
                    style={{
                      lineHeight: "28px",
                      fontWeight: "600"
                    }}
                    onClick={() => this.getObjectIds("Vehicle Accessories")}
                  >
                    <FontAwesomeIcon
                      color="#7a7a52"
                      icon="tools"
                      size="2x"
                      style={{
                        float: "left",
                        marginRight: "18px",
                        marginLeft: "4"
                      }}
                    />
                    <span style={{ color: "#7a7a52" }}>
                      Vehicle Accessories
                    </span>
                  </Menu.Item>

                  <Menu.Item
                    style={{
                      lineHeight: "28px",
                      fontWeight: "600"
                    }}
                    onClick={() => this.getObjectIds("Movies & DVDs")}
                  >
                    <FontAwesomeIcon
                      color="#7a7a52"
                      icon="compact-disc"
                      size="2x"
                      style={{
                        float: "left",
                        marginRight: "18px",
                        marginLeft: "3"
                      }}
                    />
                    <span style={{ color: "#7a7a52" }}> Movies & DVDs</span>
                  </Menu.Item>

                  <Menu.Item
                    style={{
                      lineHeight: "28px",
                      fontWeight: "600"
                    }}
                    onClick={() => this.getObjectIds("Photography & Optics")}
                  >
                    <FontAwesomeIcon
                      color="#7a7a52"
                      icon="camera-retro"
                      size="2x"
                      style={{
                        float: "left",
                        marginRight: "17px",
                        marginLeft: "4"
                      }}
                    />
                    <span style={{ color: "#7a7a52" }}>
                      Photography & Optics
                    </span>
                  </Menu.Item>

                  <Menu.Item
                    style={{
                      lineHeight: "28px",
                      fontWeight: "600"
                    }}
                    onClick={() => this.getObjectIds("Gaming")}
                  >
                    <FontAwesomeIcon
                      color="#7a7a52"
                      icon="gamepad"
                      size="2x"
                      style={{
                        float: "left",
                        marginRight: "13px",
                        marginLeft: "auto"
                      }}
                    />
                    <span style={{ color: "#7a7a52" }}> Gaming</span>
                  </Menu.Item>

                  <Menu.Item
                    style={{
                      lineHeight: "28px",
                      fontWeight: "600"
                    }}
                    onClick={() => this.getObjectIds("Crafting & Garden")}
                  >
                    <FontAwesomeIcon
                      color="#7a7a52"
                      icon="leaf"
                      size="2x"
                      style={{
                        float: "left",
                        marginRight: "17px",
                        marginLeft: "auto"
                      }}
                    />
                    <span style={{ color: "#7a7a52" }}>Crafting & Garden</span>
                  </Menu.Item>

                  <Menu.Item
                    style={{
                      lineHeight: "28px",
                      fontWeight: "600"
                    }}
                    onClick={() => this.getObjectIds("Cellphones")}
                  >
                    <FontAwesomeIcon
                      color="#7a7a52"
                      icon="mobile"
                      size="2x"
                      style={{
                        float: "left",
                        marginRight: "22px",
                        marginLeft: "9px"
                      }}
                    />
                    <span style={{ color: "#7a7a52" }}> Cellphones</span>
                  </Menu.Item>

                  <Menu.Item
                    style={{
                      lineHeight: "28px",
                      fontWeight: "600"
                    }}
                    onClick={() => this.getObjectIds("Home & Living")}
                  >
                    <FontAwesomeIcon
                      color="#7a7a52"
                      icon="couch"
                      size="2x"
                      style={{
                        float: "left",
                        marginRight: "13px",
                        marginLeft: "auto"
                      }}
                    />
                    <span style={{ color: "#7a7a52" }}> Home & Living</span>
                  </Menu.Item>

                  <Menu.Item
                    style={{
                      lineHeight: "28px",
                      fontWeight: "600"
                    }}
                    onClick={() => this.getObjectIds("Kids & Babies")}
                  >
                    <FontAwesomeIcon
                      color="#7a7a52"
                      icon="baby"
                      size="2x"
                      style={{
                        float: "left",
                        marginRight: "21px",
                        marginLeft: "7"
                      }}
                    />
                    <span style={{ color: "#7a7a52" }}> Kids & Babies</span>
                  </Menu.Item>

                  <Menu.Item
                    style={{
                      lineHeight: "28px",
                      fontWeight: "600"
                    }}
                    onClick={() => this.getObjectIds("Clothes & Accessories")}
                  >
                    <FontAwesomeIcon
                      color="#7a7a52"
                      icon="tshirt"
                      size="2x"
                      style={{
                        float: "left",
                        marginRight: "13px",
                        marginLeft: "auto"
                      }}
                    />
                    <span style={{ color: "#7a7a52" }}>
                      Clothes & Accessories
                    </span>
                  </Menu.Item>

                  <Menu.Item
                    style={{
                      lineHeight: "28px",
                      fontWeight: "600"
                    }}
                    onClick={() => this.getObjectIds("Cosmetics & Grooming")}
                  >
                    <FontAwesomeIcon
                      color="#7a7a52"
                      icon="restroom"
                      size="2x"
                      style={{
                        float: "left",
                        marginRight: "13px",
                        marginLeft: "auto"
                      }}
                    />
                    <span style={{ color: "#7a7a52" }}>
                      Cosmetics & Grooming
                    </span>
                  </Menu.Item>

                  <Menu.Item
                    style={{
                      lineHeight: "28px",
                      fontWeight: "600"
                    }}
                    onClick={() => this.getObjectIds("Modelling & Hobby")}
                  >
                    <FontAwesomeIcon
                      color="#7a7a52"
                      icon="shapes"
                      size="2x"
                      style={{
                        float: "left",
                        marginRight: "17px",
                        marginLeft: "4"
                      }}
                    />
                    <span style={{ color: "#7a7a52" }}>Modelling & Hobby</span>
                  </Menu.Item>

                  <Menu.Item
                    style={{
                      lineHeight: "28px",
                      fontWeight: "600"
                    }}
                    onClick={() => this.getObjectIds("Music & Instruments")}
                  >
                    <FontAwesomeIcon
                      color="#7a7a52"
                      icon="guitar"
                      size="2x"
                      style={{
                        float: "left",
                        marginRight: "15px",
                        marginLeft: "6"
                      }}
                    />
                    <span style={{ color: "#7a7a52" }}>
                      Music & Instruments
                    </span>
                  </Menu.Item>

                  <Menu.Item
                    style={{
                      lineHeight: "28px",
                      fontWeight: "600"
                    }}
                    onClick={() => this.getObjectIds("Coins")}
                  >
                    <FontAwesomeIcon
                      color="#7a7a52"
                      icon="coins"
                      size="2x"
                      style={{
                        float: "left",
                        marginRight: "15px",
                        marginLeft: "5"
                      }}
                    />
                    <span style={{ color: "#7a7a52" }}> Coins</span>
                  </Menu.Item>

                  <Menu.Item
                    style={{
                      lineHeight: "28px",
                      fontWeight: "600"
                    }}
                    onClick={() => this.getObjectIds("Collector's Items")}
                  >
                    <FontAwesomeIcon
                      color="#7a7a52"
                      icon="box-open"
                      size="2x"
                      style={{
                        float: "left",
                        marginRight: "13px",
                        marginLeft: "auto"
                      }}
                    />
                    <span style={{ color: "#7a7a52" }}>Collector's Items</span>
                  </Menu.Item>

                  <Menu.Item
                    style={{
                      lineHeight: "28px",
                      fontWeight: "600"
                    }}
                    onClick={() => this.getObjectIds("Toys & Handicraft")}
                  >
                    <FontAwesomeIcon
                      color="#7a7a52"
                      icon="robot"
                      size="2x"
                      style={{
                        float: "left",
                        marginRight: "13px",
                        marginLeft: "auto"
                      }}
                    />
                    <span style={{ color: "#7a7a52" }}>Toys & Handicraft</span>
                  </Menu.Item>

                  <Menu.Item
                    style={{
                      lineHeight: "28px",
                      fontWeight: "600"
                    }}
                    onClick={() => this.getObjectIds("Sports")}
                  >
                    <FontAwesomeIcon
                      color="#7a7a52"
                      icon="futbol"
                      size="2x"
                      style={{
                        float: "left",
                        marginRight: "17px",
                        marginLeft: "4"
                      }}
                    />
                    <span style={{ color: "#7a7a52" }}> Sports</span>
                  </Menu.Item>

                  <Menu.Item
                    style={{
                      lineHeight: "28px",
                      fontWeight: "600"
                    }}
                    onClick={() => this.getObjectIds("Tickets & Vouchers")}
                  >
                    <FontAwesomeIcon
                      color="#7a7a52"
                      icon="ticket-alt"
                      size="2x"
                      style={{
                        float: "left",
                        marginRight: "15px",
                        marginLeft: "2"
                      }}
                    />
                    <span style={{ color: "#7a7a52" }}>Tickets & Vouchers</span>
                  </Menu.Item>

                  <Menu.Item
                    style={{
                      lineHeight: "28px",
                      fontWeight: "600"
                    }}
                    onClick={() => this.getObjectIds("Animal Accessories")}
                  >
                    <FontAwesomeIcon
                      color="#7a7a52"
                      icon="paw"
                      size="2x"
                      style={{
                        float: "left",
                        marginRight: "17px",
                        marginLeft: "4"
                      }}
                    />
                    <span style={{ color: "#7a7a52" }}>Animal Accessories</span>
                  </Menu.Item>

                  <Menu.Item
                    style={{
                      lineHeight: "28px",
                      fontWeight: "600"
                    }}
                    onClick={() => this.getObjectIds("Watches & Jewellery")}
                  >
                    <FontAwesomeIcon
                      color="#7a7a52"
                      icon="crown"
                      size="2x"
                      style={{
                        float: "left",
                        marginRight: "14px",
                        marginLeft: "auto"
                      }}
                    />
                    <span style={{ color: "#7a7a52" }}>
                      Watches & Jewellery
                    </span>
                  </Menu.Item>

                  <Menu.Item
                    style={{
                      lineHeight: "28px",
                      fontWeight: "600"
                    }}
                    onClick={() => this.getObjectIds("Wine & Consumables")}
                  >
                    <FontAwesomeIcon
                      color="#7a7a52"
                      icon="wine-glass-alt"
                      size="2x"
                      style={{
                        float: "left",
                        marginRight: "23px",
                        marginLeft: "10px"
                      }}
                    />
                    <span style={{ color: "#7a7a52" }}>Wine & Consumables</span>
                  </Menu.Item>
                </Menu>
              </Grid.Column>
              <Grid.Column width={11}>
                <Card.Group
                  centered
                  itemsPerRow={2}
                  style={{ marginTop: "1px" }}
                >
                  {this.renderObjects()}
                </Card.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Layout>
    );
  }
}

export default App;
