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
  Input
} from "semantic-ui-react";
import Slider from "react-slick";
import Router from "../routes";
import NumberFormat from "react-number-format";
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
      tags: [],
      pics: [],
      descriptionEdit: false,
      priceEdit: false,
      categoryEdit: false,
      tagEdit: false,
      currentUser: ""
    };
  }

  //fetches objectIds to display from server
  async getObjectIds(searchTerm) {
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
  }

  //if any change to a content field is made, submit that change to DB
  submitChange = async () => {
    alert("Please refresh the page to view your changes");
    this.setState({
      descriptionEdit: false,
      priceEdit: false,
      categoryEdit: false,
      tagEdit: false
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

  purchaseItem = () => {
    //implement purchasing of items using Ethereum wallets with extensions
    //such as web3
    alert("The purchasing functionality has not yet been implemented");
  };

  //fetch object from server and write to state
  async componentWillMount() {
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

      this.setState({
        id: response.data.id,
        title: thisObject[0].title,
        category: thisObject[0].category,
        description: thisObject[0].description,
        owner: thisObject[0].owner,
        price: thisObject[0].price,
        tags: tagsToReturn,
        pics: picsTemp
      });
    }

    //fetch currentUser from cookie
    let resultTwo = await axios.post(window.location.origin + "/getCookie");
    if (resultTwo.data.success) {
      this.setState({ currentUser: resultTwo.data.username });
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
        <head>
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
        </head>
        <Layout>
          <Container textAlign="center" style={{ margin: "20px" }}>
            <Header size="huge" style={{ color: "#7a7a52" }}>
              {this.state.title}
            </Header>
            <Divider section style={{ maxWidth: "90%", marginLeft: "5%" }} />

            {/* Slider from react-slick and map all the pics into the Slider */}
            <Slider {...settings} style={{ margin: "auto" }}>
              {this.state.pics.map((pic, i) => (
                <div>
                  <img
                    key={`pic${i}`}
                    src={`../static/${pic}`}
                    style={{ maxWidth: "90%", margin: "auto", zIndex: "1" }}
                  />
                </div>
              ))}
            </Slider>
            <Divider section style={{ maxWidth: "90%", marginLeft: "5%" }} />

            <Grid
              stackable
              columns={2}
              style={{ maxWidth: "85%", margin: "auto", marginTop: 30 }}
            >
              <Grid.Row>
                <Grid.Column width={8} style={{ textAlign: "left" }}>
                  <Header style={{ color: "#7a7a52" }}>
                    Description
                    <Icon
                      style={{ marginLeft: 10 }}
                      name="file text"
                      size="mini"
                    />
                  </Header>
                  {/* if edit button is clicked, editable textarea and save button are displayed */}
                  {this.state.descriptionEdit ? (
                    <div>
                      <Form.Input
                        style={{ width: "100%", height: "250px" }}
                        control="textarea"
                        value={this.state.description}
                        onChange={event =>
                          this.setState({ description: event.target.value })
                        }
                      />
                      <Button
                        color="green"
                        content="save"
                        onClick={this.submitChange}
                        fluid
                      />
                    </div>
                  ) : (
                    <div>
                      <p
                        align="justify"
                        size="big"
                        style={{ marginLeft: 15, color: "#ccccb3" }}
                      >
                        {this.state.description}
                      </p>
                      {/* if currentUser is also owner of the object, edit button is visible */}
                      {this.state.currentUser === this.state.owner ? (
                        <Button
                          basic
                          content="edit"
                          style={{ float: "right" }}
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
                <Grid.Column width={8} style={{ textAlign: "right" }}>
                  <Header style={{ color: "#7a7a52" }}>
                    Price
                    <Icon name="usd" size="mini" style={{ marginLeft: 10 }} />
                  </Header>
                  {this.state.priceEdit ? (
                    <div>
                      <Input fluid>
                        <NumberFormat
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
                        size="big"
                        style={{ marginRight: 30, color: "#ccccb3" }}
                      >
                        {this.state.price}
                      </p>
                      {/* if currentUser is also owner of the object, edit button is visible */}
                      {this.state.currentUser === this.state.owner ? (
                        <Button
                          basic
                          content="edit"
                          style={{ float: "right" }}
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

              <Grid.Row>
                <Grid.Column width={8} style={{ textAlign: "left" }}>
                  <Header style={{ color: "#7a7a52" }}>
                    Category
                    <Icon
                      style={{ marginLeft: 10 }}
                      name="filter"
                      size="mini"
                    />
                  </Header>

                  {this.state.categoryEdit ? (
                    <div>
                      <Form.Select
                        options={categories}
                        placeholder={this.state.category}
                        onChange={this.handleCategoryChange}
                      />
                      <Button
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
                          basic
                          content="edit"
                          style={{ float: "right" }}
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
                <Grid.Column width={8} style={{ textAlign: "right" }}>
                  <Header style={{ color: "#7a7a52" }}>
                    Owner
                    <Icon
                      name="user secret"
                      size="mini"
                      style={{ marginLeft: 10 }}
                    />
                  </Header>
                  <a
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
              <Grid.Row>
                <Grid.Column width={8} style={{ textAlign: "left" }}>
                  <Header style={{ color: "#7a7a52" }}>
                    Tags
                    <Icon style={{ marginLeft: 10 }} name="tags" size="mini" />
                  </Header>
                  {this.state.tagEdit ? (
                    <div>
                      <Form.Select
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
                      <span style={{ color: "#7a7a52" }}>
                        Your old tags were:{" "}
                      </span>
                      <p style={{ color: "#7a7a52" }}>{currentTags}</p>
                      <Button
                        color="green"
                        content="save"
                        fluid
                        onClick={this.submitChange}
                      />
                    </div>
                  ) : (
                    <div>
                      {this.state.tags}
                      {this.state.currentUser === this.state.owner ? (
                        <Button
                          basic
                          content="edit"
                          style={{ float: "right", marginTop: "10px" }}
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
                <Grid.Column width={8} style={{ textAlign: "right" }}>
                  <Header style={{ color: "#7a7a52" }}>
                    Buy Item
                    <Icon
                      name="handshake"
                      size="mini"
                      style={{ marginLeft: 10 }}
                    />
                  </Header>
                  <Button
                    style={{
                      maxWidth: "85.5%",
                      margin: "auto",
                      marginTop: "5px",
                      border: "1px solid #7a7a52"
                    }}
                    basic
                    size="small"
                    onClick={this.purchaseItem}
                  >
                    <span style={{ color: "#adad85" }}>
                      {" "}
                      Purchase for {this.state.price}
                    </span>
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
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
    <div className={className} style={{ zIndex: 2 }}>
      <Button
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
        <Icon name="forward" size="huge" />
      </Button>
    </div>
  );
}

function CustomPrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className} style={{ zIndex: 2 }}>
      <Button
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
        <Icon name="backward" size="huge" />
      </Button>
    </div>
  );
}
