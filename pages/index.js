import React, { Component } from "react";
import {
  Container,
  Header,
  Menu,
  Divider,
  Grid,
  Card,
  Segment,
  Input,
  Button,
  Modal
} from "semantic-ui-react";
import Layout from "../components/Layout";
import { ABI, contractAddress } from "../ethereum/deployedContract";
import Web3 from "web3";
let web3 = new Web3(Web3.givenProvider || "ws://localhost:3000");
import { renderObjects } from "../utils/renderObjectsUtil";
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

let verify;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { objects: [], ownerHistory: [], uidModal: false };
  }

  //render 4 random objects from the DB
  async componentWillMount() {
    //create instance of the SC
    verify = await new web3.eth.Contract(ABI, contractAddress);

    let result = await axios.post(window.location.origin + "/getRandomObjects");

    if (result.data.success) {
      this.setState({
        objects: result.data.objects,
        pics: result.data.pictures,
        tags: result.data.tags
      });
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

  callRender() {
    return renderObjects(this.state.objects, this.state.tags, this.state.pics);
  }

  renderOwnerHistory = () => {
    let returnArray = [];
    for (let i = 0; i < this.state.ownerHistory.length; i++) {
      returnArray.push(
        <p>
          <span style={{ fontWeight: "bold", color: "orange" }}>{i + 1}:</span>{" "}
          {this.state.ownerHistory[i]}
        </p>
      );
    }
    return returnArray;
  };

  //when enter key is hit
  onEnter(e) {
    if (e.key === "Enter") {
      this.checkUid();
    }
  }

  checkUid = async () => {
    let uidResult = await verify.methods
      .viewOwnerHistory(document.getElementById("uidSearch").value)
      .call();
    let ownerHistory = [];
    uidResult.forEach(function(owner) {
      ownerHistory.push(owner);
    });
    this.setState({
      ownerHistory,
      uidModal: true,
      uid: document.getElementById("uidSearch").value
    });
  };

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
          <Grid columns={2} style={{ marginTop: "20px" }}>
            <Segment style={{ width: "27%", marginLeft: "1.2%" }}>
              <Grid.Column width={5}>
                <Grid.Row>
                  <Header
                    size="large"
                    content="Browse for categories"
                    style={{
                      textAlign: "left",
                      color: "#7a7a52",
                      marginLeft: "22px"
                    }}
                  />
                </Grid.Row>
                <Grid.Row style={{ marginTop: "20px" }}>
                  <Menu vertical style={{ width: "20rem" }}>
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
                      <span style={{ color: "#7a7a52" }}>
                        Antiquities & Art
                      </span>
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
                      <span style={{ color: "#7a7a52" }}>
                        Audio, Video & TV
                      </span>
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
                      <span style={{ color: "#7a7a52" }}>
                        Office & Industry
                      </span>
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
                      <span style={{ color: "#7a7a52" }}>
                        Computer & Network
                      </span>
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
                      <span style={{ color: "#7a7a52" }}>
                        Crafting & Garden
                      </span>
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
                      <span style={{ color: "#7a7a52" }}>
                        Modelling & Hobby
                      </span>
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
                      <span style={{ color: "#7a7a52" }}>
                        Collector's Items
                      </span>
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
                      <span style={{ color: "#7a7a52" }}>
                        Toys & Handicraft
                      </span>
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
                      <span style={{ color: "#7a7a52" }}>
                        Tickets & Vouchers
                      </span>
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
                      <span style={{ color: "#7a7a52" }}>
                        Animal Accessories
                      </span>
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
                      <span style={{ color: "#7a7a52" }}>
                        Wine & Consumables
                      </span>
                    </Menu.Item>
                  </Menu>
                </Grid.Row>
              </Grid.Column>
            </Segment>
            <Segment
              style={{
                marginLeft: "20px",
                width: "68.8%",
                marginTop: "0%",
                marginBottom: "27%"
              }}
            >
              <Grid.Column width={12}>
                <Grid.Row>
                  <Header
                    size="large"
                    content="Or try your luck"
                    style={{
                      color: "#7a7a52",
                      textAlign: "center"
                    }}
                  />
                </Grid.Row>
                <Grid.Row style={{ marginTop: "4.3%" }}>
                  <Card.Group
                    centered
                    itemsPerRow={2}
                    // style={{ marginTop: "1px" }}
                  >
                    {this.callRender()}
                  </Card.Group>
                </Grid.Row>
                <Grid.Row>
                  <Segment style={{ marginTop: "20px" }}>
                    <Header
                      size="large"
                      content="Check an item's owner history"
                      style={{
                        color: "#7a7a52",
                        textAlign: "center"
                      }}
                    />
                    <Input
                      id="uidSearch"
                      icon="barcode"
                      onKeyPress={this.onEnter.bind(this)}
                      iconPosition="left"
                      placeholder="UID # ..."
                      label={{ tag: true, content: "Enter the UID here" }}
                      labelPosition="right"
                      style={{
                        width: "90%",
                        marginLeft: "5%",
                        marginTop: "2%"
                      }}
                    />
                    <Button
                      key="uidBtn"
                      basic
                      style={{
                        float: "middle",
                        width: "30%",
                        border: "1px solid #7a7a52",
                        marginTop: "2%",
                        marginLeft: "35%"
                      }}
                      onClick={this.checkUid}
                    >
                      <span key="uidButtonContent" style={{ color: "#adad85" }}>
                        Get owner History!
                      </span>
                    </Button>
                  </Segment>
                </Grid.Row>
              </Grid.Column>
            </Segment>
          </Grid>
          <Modal
            key="verifyModal"
            // dimmer="blurring"
            open={this.state.uidModal}
            onClose={() => this.setState({ uidModal: false })}
            basic
            style={{ textAlign: "center" }}
          >
            <Modal.Header>
              <Header size="huge" style={{ color: "white" }}>
                Owner history of object with UID {this.state.uid}
              </Header>
            </Modal.Header>
            <Modal.Content>{this.renderOwnerHistory()}</Modal.Content>
            <Modal.Actions>
              <Button
                key="verifyOkay"
                positive
                icon="checkmark"
                labelPosition="right"
                content="Okay"
                onClick={() => this.setState({ uidModal: false })}
              />
            </Modal.Actions>
          </Modal>
        </Container>
      </Layout>
    );
  }
}

export default App;
