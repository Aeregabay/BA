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
  Form
} from "semantic-ui-react";
import Slider from "react-slick";
import Router from "../routes";

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
    this.setState({ descriptionEdit: false });

    let objectInfo = {
      id: this.state.id,
      title: this.state.title,
      category: this.state.category,
      description: this.state.description,
      owner: this.state.owner,
      price: this.state.price,
      tags: this.state.tags,
      pics: this.state.pics
    };
    let result = await axios.post(
      window.location.origin + "/updateContent",
      objectInfo
    );
    if (result.data.success) {
      console.log("hurray");
    } else {
      console.log("failfail");
    }
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
                        style={{ float: "right" }}
                      />
                    </div>
                  ) : (
                    <div>
                      <Header style={{ color: "#7a7a52" }}>
                        Description
                        <Icon
                          style={{ marginLeft: 10 }}
                          name="file text"
                          size="mini"
                        />
                      </Header>
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
                  <p size="big" style={{ marginRight: 30, color: "#ccccb3" }}>
                    {this.state.price}
                  </p>
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
                  {this.state.tags}
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
