import React, { Component } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import {
  Container,
  Header,
  Button,
  Icon,
  Grid,
  Divider,
  Form,
  Input,
  Segment,
  Modal
} from "semantic-ui-react";
import Slider from "react-slick";
import Router from "../routes";
import NumberFormat from "react-number-format";
import Web3 from "web3";
let web3 = new Web3(Web3.givenProvider || "ws://localhost:3000");
import { ABI, contractAddress } from "../ethereum/deployedContract";
global.fetch = require("node-fetch");
const cc = require("cryptocompare");
cc.setApiKey(
  "41e7dfb621809bb8dc9f905d7fa8a728389852a7d41e9e225d88e68cfe6d2b4b"
);

const categories = [
  { key: "antiquities", text: "Antiquities & Art", value: "antiquities" },
  { key: "audioVideoTv", text: "Audio, Video & TV", value: "audioVideoTv" },
  { key: "poststamps", text: "Poststamps", value: "poststamps" },
  { key: "booksComics", text: "Books & Comics", value: "booksComics" },
  { key: "officeIndustry", text: "Office & Industry", value: "officeIndustry" },
  {
    key: "computerNetwork",
    text: "Computer & Network",
    value: "computerNetwork"
  },
  { key: "vehicles", text: "Vehicles", value: "vehicles" },
  {
    key: "vehicleAccessories",
    text: "Vehicle Accessories",
    value: "vehicleAccessories"
  },
  { key: "moviesDvd", text: "Movies & DVDs", value: "moviesDvd" },
  { key: "photoOptics", text: "Photography & Optics", value: "photoOptics" },
  { key: "gaming", text: "Gaming", value: "gaming" },
  { key: "craftingGarden", text: "Crafting & Garden", value: "craftingGarden" },
  { key: "cellphones", text: "Cellphones", value: "cellphones" },
  { key: "homeLiving", text: "Home & Living", value: "homeLiving" },
  { key: "kidsBabies", text: "Kids & Babies", value: "kidsBabies" },
  {
    key: "clothesAccessories",
    text: "Clothes & Accessories",
    value: "clothesAccessories"
  },
  {
    key: "cosmeticsGrooming",
    text: "Cosmetics & Grooming",
    value: "cosmeticsGrooming"
  },
  { key: "modellingHobby", text: "Modelling & Hobby", value: "modellingHobby" },
  {
    key: "musicIntruments",
    text: "Music & Instruments",
    value: "musicIntruments"
  },
  { key: "coins", text: "Coins", value: "coins" },
  { key: "collectorsRare", text: "Collector's Items", value: "collectorsRare" },
  { key: "toysHandicraft", text: "Toys & Handicraft", value: "toys" },
  { key: "sports", text: "Sports", value: "sports" },
  {
    key: "ticketsVouchers",
    text: "Tickets & Vouchers",
    value: "ticketsVouchers"
  },
  {
    key: "animalAccessories",
    text: "Animal Accessories",
    value: "animalAccessories"
  },
  {
    key: "watchesJewellery",
    text: "Watches & Jewellery",
    value: "watchesJewellery"
  },
  {
    key: "wineConsumption",
    text: "Wine & Consumables",
    value: "wineConsumption"
  }
];
let options = [];
let currentValues = [];
let currentTags = [];
let picsToAdd = [];
let verify;

class item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      category: "",
      description: "",
      owner: "",
      price: "",
      status: "",
      tags: [],
      pics: [],
      descriptionEdit: false,
      priceEdit: false,
      categoryEdit: false,
      tagEdit: false,
      currentUser: "",
      pictureEdit: false,
      titleEdit: false,
      modalOpen: false,
      verifiedStatus: "",
      verifiedOwner: "",
      buyerAddress: "",
      sellerAddress: "",
      ethPrice: "",
      ownsItem: false
    };
  }

  verifyItem = async () => {
    this.setState({ modalOpen: true });

    let result = await verify.methods.getObject(this.state.id).call();
    this.setState({ verifiedStatus: result[1], verifiedOwner: result[0] });
  };

  handleFiles = e => {
    picsToAdd = [];
    let i;
    let tempFiles = e.target.files;
    for (i = 0; i < tempFiles.length; i++) {
      picsToAdd.push(tempFiles[i]);
    }
  };

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

  deletePicture = async (picture, picNumber) => {
    let tempPics = this.state.pics;
    tempPics.splice(picNumber, 1);
    this.setState({ pics: tempPics });

    let result = await axios.post(window.location.origin + "/deletePicture", {
      picture
    });
    if (result.data.success) {
      console.log("picture " + picture + " has successfully been deleted");
    } else {
      console.log("picture deleting failed for " + picture);
    }
  };

  addPictures = async () => {
    let formData = new FormData();
    for (let i = 0; i < picsToAdd.length; i++) {
      formData.append("pic" + i, picsToAdd[i]);
    }
    formData.append("username", this.state.owner);
    formData.append("objectId", this.state.id);

    this.setState({ pictureEdit: false });

    let result = await axios.post(
      window.location.origin + "/addNewPictures",
      formData
    );

    if (result.data.success) {
      console.log("new pictures have been added to the DB");
    } else {
      console.log("the addition of new pictures has failed");
      alert("Picture upload failed, no changes made");
    }
    location.reload();
  };

  //if any change to a content field is made, submit that change to DB
  submitChange = async () => {
    this.setState({
      descriptionEdit: false,
      priceEdit: false,
      categoryEdit: false,
      tagEdit: false,
      pictureEdit: false,
      titleEdit: false
    });

    let objectInfo = {
      id: this.state.id,
      title: this.state.title,
      category: this.state.category,
      description: this.state.description,
      owner: this.state.owner,
      price: this.state.price,
      tags: currentValues,
      pics: this.state.pics
    };

    let result = await axios.post(
      window.location.origin + "/updateContent",
      objectInfo
    );
    if (result.data.success) {
      console.log("object update successful");
    } else {
      console.log("object update has failed");
    }
    location.reload();
  };

  //change handler if category is edited
  handleCategoryChange = (e, { value }) => {
    for (let i = 0; i < categories.length; i++) {
      if (value === categories[i].value) {
        this.setState({ category: categories[i].text });
      }
    }
  };

  //handler if new tags are added while editing the tags
  handleAddition = (e, { value }) => {
    options.push({
      key: Math.random()
        .toString(36)
        .substr(2, 16),
      text: value,
      value
    });
  };

  //handler for change in tag editing
  handleChange = (e, { value }) => {
    currentValues[0] = value;
  };

  onCategoryClick = () => {
    //shows browse page with object already prefiltered by searchterm === this.state.category
    this.getObjectIds(this.state.category);
  };

  onSellerClick = () => {
    //TODO create public page for owner and corresponding items for sale
    //also ratings for this user could be displayed here
    // Router.pushRoute("profile/xxx");
  };

  onTagClick = content => {
    //same as onCategoryClik but with tag content
    this.getObjectIds(content);
  };

  purchaseItem = async () => {
    this.setState({ purchaseInit: false });

    verify.methods
      .tradeObject(
        this.state.buyerAddress,
        this.state.sellerAddress,
        this.state.id,
        this.state.status
      )
      .send({
        from: this.state.buyerAddress,
        value: web3.utils.toWei(this.state.ethPrice.toString(), "ether")
      });

    await verify.events.PurchaseListen({}, async (err, res) => {
      if (err) {
        console.log(err);
      } else if (res.returnValues.confirmed) {
        let purchaseRes = await axios.post(
          window.location.origin + "/purchaseItem",
          {
            objectId: this.state.id,
            buyer: this.state.currentUser
          }
        );
        if (purchaseRes.data.success) {
          alert(
            "You have successfully purchased the item with id " + this.state.id
          );
        } else {
          alert("The purchase of item " + this.state.id + " has failed.");
        }
      }
    });
  };

  //fetch object from server and write to state
  async componentWillMount() {
    verify = await new web3.eth.Contract(ABI, contractAddress);
    let thisObject;

    let pathname = window.location.pathname.split("/");
    let id = pathname[pathname.length - 1];

    let response = await axios.post(window.location.origin + "/item", { id });
    if (response.data.success) {
      thisObject = response.data.object;
      let picsTemp = [];

      //write the names of the pictures to state
      for (let i = 0; i < response.data.pics.length; i++) {
        picsTemp.push(response.data.pics[i].name);
      }

      //create anchor tags for tags to later display in render()
      let tagsToReturn = [];
      for (let i = 0; i < response.data.tags.length; i++) {
        //are used to remind the user of the old tags when editing them
        currentTags.push(response.data.tags[i].content + ", ");
        tagsToReturn.push(
          <a
            key={i}
            style={{ cursor: "pointer", marginLeft: 15, color: "#adad85" }}
            onClick={() => this.onTagClick(response.data.tags[i].content)}
          >
            <Icon name="tag" size="small" />
            {response.data.tags[i].content}
          </a>
        );
      }

      let ethToCHF = await cc.price("ETH", ["CHF"]);
      let priceToNumber = Number(
        thisObject[0].price.slice(0, this.state.price.length - 4)
      );
      let price = priceToNumber / ethToCHF.CHF;

      this.setState({
        id: response.data.id,
        title: thisObject[0].title,
        category: thisObject[0].category,
        description: thisObject[0].description,
        owner: thisObject[0].owner,
        price: thisObject[0].price,
        status: thisObject[0].status,
        tags: tagsToReturn,
        pics: picsTemp,
        ethPrice: price
      });
    }
    //fetch currentUser from cookie
    let resultTwo = await axios.post(
      window.location.origin + "/getEthAccounts",
      {
        seller: thisObject[0].owner
      }
    );
    if (resultTwo.data.success) {
      this.setState({
        currentUser: resultTwo.data.username,
        buyerAddress: resultTwo.data.buyerAddress,
        sellerAddress: resultTwo.data.sellerAddress
      });
    }
    if (resultTwo.data.buyerAddress === resultTwo.data.sellerAddress) {
      this.setState({ ownsItem: true });
    }

    //fetch tags from DB to display options when editing tags
    let tags = await axios.post(window.location.origin + "/getTags");
    if (tags.data.success) {
      for (let i = 0; i < tags.data.tags.length; i++) {
        options.push({
          key: Math.random()
            .toString(36)
            .substr(2, 16),
          text: tags.data.tags[i].content,
          value: tags.data.tags[i].content
        });
      }
    } else {
      alert("The tag retrieval was not successfull on the client side");
    }
  }

  render() {
    //settings for react-slick plugin
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      speed: 500,
      prevArrow: <CustomPrevArrow />,
      nextArrow: <CustomNextArrow />
    };

    const { currentValues } = this.state;

    return (
      <div>
        {/* import stylesheets for react-slick plugin */}
        <div>
          <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
        </div>
        <Layout>
          <Container
            key="objectInfo"
            textAlign="center"
            style={{ margin: "20px" }}
          >
            {this.state.titleEdit ? (
              <div key="titleEdit">
                <Form.Input
                  key="title_edit"
                  style={{ width: "100%" }}
                  control="textarea"
                  value={this.state.title}
                  onChange={event =>
                    this.setState({ title: event.target.value })
                  }
                />
                <Button
                  key="titleSaveButton"
                  color="green"
                  content="save"
                  onClick={this.submitChange}
                  fluid
                />
              </div>
            ) : (
              <div key="titleNonEdit">
                <Header
                  key="titleHeader"
                  size="huge"
                  style={{ color: "#7a7a52" }}
                >
                  {this.state.title}
                </Header>
                {/* if currentUser is also owner of the object, edit button is visible */}
                {this.state.currentUser === this.state.owner ? (
                  <Button
                    key="titleEditButton"
                    basic
                    fluid
                    content="Edit Title"
                    style={{
                      maxWidth: "30%",
                      margin: "auto"
                    }}
                    onClick={() => {
                      this.setState({ titleEdit: true });
                    }}
                  />
                ) : (
                  ""
                )}
              </div>
            )}
            <Divider
              key="firstDivider"
              section
              style={{ maxWidth: "90%", marginLeft: "5%" }}
            />

            {this.state.pictureEdit ? (
              <Segment
                key="firstSegment"
                style={{ maxWidth: "85%", margin: "auto" }}
              >
                <div key="pictureGrid" className="ui internally celled grid">
                  {this.state.pics.map((pic, i) => (
                    <div key={`pictureRow${i}`} className="row">
                      <div key="pictureColumnOne" className="five wide column">
                        <img
                          key={`editPicture${i}`}
                          src={`../static/${pic}`}
                          className="ui image"
                        />
                      </div>
                      <div key="pictureColumnTwo" className="eight wide column">
                        <a>{pic}</a>
                      </div>
                      <div
                        key="pictureColumnThree"
                        className="three wide column"
                      >
                        <Button
                          key="pictureDeleteButton"
                          content="delete"
                          style={{ textAlign: "center" }}
                          onClick={() => {
                            this.deletePicture(pic, i);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  <div
                    key="pictureEditUpload"
                    style={{ margin: "auto", marginTop: "30px" }}
                  >
                    <Form.Input
                      key="pictureEditUploader"
                      fluid
                      type="file"
                      label="Upload your new pictures here"
                      name="file"
                      id="file"
                      multiple
                      onChange={this.handleFiles}
                    />
                    <Button
                      key="pictureEditSaveBtn"
                      color="green"
                      content="Save new Pictures"
                      onClick={this.addPictures}
                      fluid
                      style={{ marginTop: "5px" }}
                    />
                  </div>
                </div>
              </Segment>
            ) : (
              <div>
                {/* Slider from react-slick and map all the pics into the Slider */}
                <Slider key="slider" {...settings} style={{ margin: "auto" }}>
                  {this.state.pics.map((pic, i) => (
                    <div key="picturesMap">
                      <img
                        key={`pic${i}`}
                        src={`../static/${pic}`}
                        style={{ maxWidth: "90%", margin: "auto", zIndex: "1" }}
                      />
                    </div>
                  ))}
                </Slider>
                {this.state.currentUser === this.state.owner ? (
                  <Button
                    key="pictureEditBtn"
                    basic
                    fluid
                    content="Edit Pictures"
                    style={{
                      marginTop: "40px",
                      maxWidth: "30%",
                      marginLeft: "35%"
                    }}
                    onClick={() => {
                      this.setState({ pictureEdit: true });
                    }}
                  />
                ) : (
                  ""
                )}
              </div>
            )}

            <Divider
              key="secondDivider"
              section
              style={{ maxWidth: "90%", marginLeft: "5%" }}
            />

            <Grid
              key="infoGrid"
              stackable
              columns={2}
              style={{ maxWidth: "85%", margin: "auto", marginTop: 30 }}
            >
              <Grid.Row key="gridRowOne">
                <Grid.Column
                  key="gridCellOne"
                  width={8}
                  style={{ textAlign: "left" }}
                >
                  <Header key="descriptionHeader" style={{ color: "#7a7a52" }}>
                    Description
                    <Icon
                      key="descriptionIcon"
                      style={{ marginLeft: 10 }}
                      name="file text"
                      size="mini"
                    />
                  </Header>
                  {/* if edit button is clicked, editable textarea and save button are displayed */}
                  {this.state.descriptionEdit ? (
                    <div>
                      <Form.Input
                        key="descriptionEdit"
                        style={{ width: "100%", height: "250px" }}
                        control="textarea"
                        value={this.state.description}
                        onChange={event =>
                          this.setState({ description: event.target.value })
                        }
                      />
                      <Button
                        key="descriptionEditSaveBtn"
                        color="green"
                        content="save"
                        onClick={this.submitChange}
                        fluid
                      />
                    </div>
                  ) : (
                    <div>
                      <p
                        key="description"
                        align="justify"
                        size="big"
                        style={{ marginLeft: 15, color: "#ccccb3" }}
                      >
                        {this.state.description}
                      </p>
                      {/* if currentUser is also owner of the object, edit button is visible */}
                      {this.state.currentUser === this.state.owner ? (
                        <Button
                          key="editDescriptionBtn"
                          basic
                          fluid
                          content="Edit Description"
                          style={{ float: "right", maxWidth: "40%" }}
                          onClick={() => {
                            this.setState({ descriptionEdit: true });
                          }}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                </Grid.Column>
                <Grid.Column
                  key="gridCellTwo"
                  width={8}
                  style={{ textAlign: "right" }}
                >
                  <Header key="priceHeader" style={{ color: "#7a7a52" }}>
                    Price
                    <Icon
                      key="priceIcon"
                      name="usd"
                      size="mini"
                      style={{ marginLeft: 10 }}
                    />
                  </Header>
                  {this.state.priceEdit ? (
                    <div>
                      <Input key="priceEditInputParent" fluid>
                        <NumberFormat
                          key="priceEditInputChild"
                          style={{ textAlign: "right" }}
                          value={this.state.price}
                          thousandSeparator="´"
                          suffix=" CHF"
                          allowNegative={false}
                          onChange={event =>
                            this.setState({ price: event.target.value })
                          }
                        />
                      </Input>
                      <Button
                        key="priceEditSaveBtn"
                        color="green"
                        content="save"
                        onClick={this.submitChange}
                        style={{
                          marginTop: "5px"
                        }}
                        fluid
                      />
                    </div>
                  ) : (
                    <div>
                      <p
                        key="price"
                        size="big"
                        style={{ marginRight: 30, color: "#ccccb3" }}
                      >
                        {this.state.price}
                      </p>
                      {/* if currentUser is also owner of the object, edit button is visible */}
                      {this.state.currentUser === this.state.owner ? (
                        <Button
                          key="priceEditBtn"
                          basic
                          fluid
                          content="Edit Price"
                          style={{ float: "right", maxWidth: "40%" }}
                          onClick={() => {
                            this.setState({ priceEdit: true });
                          }}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row key="gridRowTwo">
                <Grid.Column
                  key="gridCellThree"
                  width={8}
                  style={{ textAlign: "left" }}
                >
                  <Header key="categoryHeader" style={{ color: "#7a7a52" }}>
                    Category
                    <Icon
                      key="categoryIcon"
                      style={{ marginLeft: 10 }}
                      name="filter"
                      size="mini"
                    />
                  </Header>

                  {this.state.categoryEdit ? (
                    <div>
                      <Form.Select
                        key="categoryEdit"
                        options={categories}
                        placeholder={this.state.category}
                        onChange={this.handleCategoryChange}
                      />
                      <Button
                        key="categoryEditSaveBtn"
                        color="green"
                        fluid
                        content="save"
                        onClick={this.submitChange}
                        style={{
                          margin: "left",
                          marginTop: "5px",
                          width: "53.1%"
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      <a
                        key="category"
                        style={{
                          cursor: "pointer",
                          marginLeft: 15,
                          color: "#adad85"
                        }}
                        onClick={this.onCategoryClick}
                      >
                        {this.state.category}
                      </a>
                      {this.state.currentUser === this.state.owner ? (
                        <Button
                          key="categoryEditBtn"
                          basic
                          fluid
                          content="Edit Category"
                          style={{ float: "right", maxWidth: "40%" }}
                          onClick={() => {
                            this.setState({ categoryEdit: true });
                          }}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                </Grid.Column>
                <Grid.Column
                  key="gridCellFour"
                  width={8}
                  style={{ textAlign: "right" }}
                >
                  <Header key="ownerHeader" style={{ color: "#7a7a52" }}>
                    Owner
                    <Icon
                      key="ownerIcon"
                      name="user secret"
                      size="mini"
                      style={{ marginLeft: 10 }}
                    />
                  </Header>
                  <a
                    key="owner"
                    style={{
                      cursor: "pointer",
                      marginRight: 30,
                      color: "#adad85"
                    }}
                    onClick={this.onSellerClick}
                  >
                    {this.state.owner}
                  </a>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row key="gridRowThree">
                <Grid.Column
                  key="gridCellFive"
                  width={8}
                  style={{ textAlign: "left" }}
                >
                  <Header key="tagHeader" style={{ color: "#7a7a52" }}>
                    Tags
                    <Icon
                      key="tagIcon"
                      style={{ marginLeft: 10 }}
                      name="tags"
                      size="mini"
                    />
                  </Header>
                  {this.state.tagEdit ? (
                    <div>
                      <Form.Select
                        key="tagEdit"
                        options={options}
                        search
                        selection
                        fluid
                        multiple
                        placeholder="enter your new tags"
                        allowAdditions
                        value={currentValues}
                        onAddItem={this.handleAddition}
                        onChange={this.handleChange}
                        width={12}
                      />
                      <span key="oldTags" style={{ color: "#7a7a52" }}>
                        Your old tags were:
                      </span>
                      <p key="currentTags" style={{ color: "#7a7a52" }}>
                        {currentTags}
                      </p>
                      <Button
                        key="tagEditSaveBtn"
                        color="green"
                        content="save"
                        fluid
                        onClick={this.submitChange}
                      />
                    </div>
                  ) : (
                    <div>
                      <p>{this.state.tags}</p>
                      {this.state.currentUser === this.state.owner ? (
                        <Button
                          key="tagEditBtn"
                          basic
                          fluid
                          content="Edit Tags"
                          style={{
                            float: "right",
                            // marginTop: "10px",
                            maxWidth: "40%"
                          }}
                          onClick={() => {
                            this.setState({ tagEdit: true });
                          }}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                </Grid.Column>
                <Grid.Column
                  key="gridCellSix"
                  width={8}
                  style={{ textAlign: "right" }}
                >
                  <Header key="statusHeader" style={{ color: "#7a7a52" }}>
                    Status
                    <Icon
                      key="statusIcon"
                      name="info"
                      size="mini"
                      style={{ marginLeft: 10 }}
                    />
                  </Header>
                  <p>
                    <a
                      key="status"
                      style={{
                        cursor: "pointer",
                        marginRight: 30,
                        color: "#adad85"
                      }}
                    >
                      {this.state.status}
                    </a>
                  </p>
                  <Button
                    key="verifyStatusBtn"
                    basic
                    fluid
                    content="Verify Status"
                    style={{
                      float: "right",
                      maxWidth: "40%",
                      marginTop: "3px"
                    }}
                    onClick={this.verifyItem}
                  />
                  <Modal
                    key="verifyModal"
                    dimmer="blurring"
                    open={this.state.modalOpen}
                    onClose={() => this.setState({ modalOpen: false })}
                    basic
                    style={{ textAlign: "center" }}
                  >
                    <Modal.Header>
                      <Header size="huge" style={{ color: "white" }}>
                        Status verification on the Etherchain
                      </Header>
                    </Modal.Header>
                    <Modal.Content>
                      <Modal.Description>
                        <Grid.Row>
                          <Grid.Column>
                            <Header
                              size="large"
                              style={{ color: "white", marginBottom: "5px" }}
                            >
                              Owner
                            </Header>
                            {this.state.verifiedOwner}
                          </Grid.Column>
                          <Grid.Column>
                            <Header
                              size="large"
                              style={{
                                color: "white",
                                marginTop: "15px",
                                marginBottom: "5px"
                              }}
                            >
                              Status
                            </Header>
                            {this.state.verifiedStatus}
                          </Grid.Column>
                        </Grid.Row>
                      </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button
                        key="verifyOkay"
                        positive
                        icon="checkmark"
                        labelPosition="right"
                        content="Okay"
                        onClick={() => this.setState({ modalOpen: false })}
                      />
                    </Modal.Actions>
                  </Modal>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider
              key="thirdDivider"
              section
              style={{ maxWidth: "90%", marginLeft: "5%" }}
            />
            <div key="buySection" style={{ margin: "auto", marginTop: "20px" }}>
              <Header key="buyHeader" style={{ color: "#7a7a52" }}>
                Buy Item
                <Icon
                  key="buyIcon"
                  name="handshake"
                  size="mini"
                  style={{ marginLeft: 10 }}
                />
              </Header>
              {this.state.ownsItem ? (
                <p
                  key="description"
                  align="justify"
                  size="big"
                  style={{
                    marginLeft: 15,
                    color: "#ccccb3",
                    textAlign: "center"
                  }}
                >
                  You already own this item
                </p>
              ) : (
                <Button
                  key="buyButton"
                  style={{
                    maxWidth: "20%",
                    marginTop: "5px",
                    border: "1px solid #7a7a52",
                    margin: "auto"
                  }}
                  basic
                  hidden={this.state.ownsItem}
                  fluid
                  size="small"
                  onClick={() => this.setState({ purchaseInit: true })}
                >
                  <span key="buyBtnContent" style={{ color: "#adad85" }}>
                    Purchase for {this.state.price}
                  </span>
                </Button>
              )}
            </div>
            <Modal
              key="purchaseModal"
              dimmer="blurring"
              open={this.state.purchaseInit}
              onClose={() => this.setState({ purchaseInit: false })}
              basic
              style={{ textAlign: "center" }}
            >
              <Modal.Header>
                <Header size="huge" style={{ color: "white" }}>
                  Are you sure you want to purchase this item?
                </Header>
              </Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <Header
                    size="large"
                    style={{ color: "white", marginBottom: "5px" }}
                  >
                    Price
                  </Header>
                  {this.state.price}
                  <p>~ {Number(this.state.ethPrice).toFixed(2)} ETH</p>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <Button
                  key="purchaseCancel"
                  negative
                  icon="remove"
                  labelPosition="right"
                  content="Cancel"
                  onClick={() => this.setState({ purchaseInit: false })}
                  style={{ float: "left" }}
                />
                <Button
                  key="purchaseOkay"
                  positive
                  icon="checkmark"
                  labelPosition="right"
                  content="Confirm Purchase"
                  onClick={this.purchaseItem}
                />
              </Modal.Actions>
            </Modal>
          </Container>
        </Layout>
      </div>
    );
  }
}

export default item;

//custom buttons for navigating through the image gallery
//standard buttons are white and therefore not visible on white background
function CustomNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div key="fwdButton" className={className} style={{ zIndex: 2 }}>
      <Button
        key="forwardButton"
        size="mini"
        style={{
          display: "block",
          background: "transparent",
          opacity: 1,
          marginTop: "-210%",
          marginLeft: "-480%",
          color: "#adad85"
        }}
        onClick={onClick}
      >
        <Icon key="forwardArrow" name="forward" size="huge" />
      </Button>
    </div>
  );
}

function CustomPrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div key="bckButton" className={className} style={{ zIndex: 2 }}>
      <Button
        key="backButton"
        size="mini"
        style={{
          display: "block",
          background: "transparent",
          opacity: 1,
          marginTop: "-210%",
          marginLeft: "250%",
          zIndex: "2",
          color: "#adad85"
        }}
        onClick={onClick}
      >
        <Icon key="backwardArrow" name="backward" size="huge" />
      </Button>
    </div>
  );
}
