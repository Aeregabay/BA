import React, { Component } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { Container, Header, Button, Icon, Grid } from "semantic-ui-react";
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
      pics: []
    };
  }

  onCategoryClick = () => {
    //TODO redirect to browse page with category already inserted into search
    //and query executed
    Router.pushRoute("browse");
  };

  onSellerClick = () => {
    //TODO create public page for owner and corresponding items for sale
    //also ratings for this user could be displayed here
    Router.pushRoute("index");
  };

  onTagClick = () => {
    //TODO redirect to browse page with tag already inserted into search
    //and query executed
    Router.pushRoute("browse");
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
            style={{ cursor: "pointer", marginLeft: 15, color: "#f2711c" }}
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
          <Container textAlign="center">
            <Header size="huge">{this.state.title}</Header>

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
            <Grid
              stackable
              columns={2}
              style={{ maxWidth: "85%", margin: "auto", marginTop: 30 }}
            >
              <Grid.Row>
                <Grid.Column width={8} style={{ textAlign: "left" }}>
                  <Header>
                    Description
                    <Icon
                      style={{ marginLeft: 10 }}
                      name="file text"
                      size="mini"
                    />
                  </Header>
                  <p align="justify" size="big" style={{ marginLeft: 15 }}>
                    {this.state.description}
                  </p>
                </Grid.Column>
                <Grid.Column width={8} style={{ textAlign: "right" }}>
                  <Header>
                    Price
                    <Icon name="usd" size="mini" style={{ marginLeft: 10 }} />
                  </Header>
                  <p size="big" style={{ marginRight: 30 }}>
                    {this.state.price}
                  </p>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column width={8} style={{ textAlign: "left" }}>
                  <Header>
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
                      color: "#f2711c"
                    }}
                    onClick={this.onCategoryClick}
                  >
                    {this.state.category}
                  </a>
                </Grid.Column>
                <Grid.Column width={8} style={{ textAlign: "right" }}>
                  <Header>
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
                      color: "#f2711c"
                    }}
                    onClick={this.onSellerClick}
                  >
                    {this.state.owner}
                  </a>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={8} style={{ textAlign: "left" }}>
                  <Header>
                    Tags
                    <Icon style={{ marginLeft: 10 }} name="tags" size="mini" />
                  </Header>
                  {this.state.tags}
                </Grid.Column>
                <Grid.Column width={8} style={{ textAlign: "right" }}>
                  <Header>
                    Buy Item
                    <Icon
                      name="handshake"
                      size="mini"
                      style={{ marginLeft: 10 }}
                    />
                  </Header>
                  <Button
                    basic
                    size="small"
                    style={{}}
                    color="orange"
                    onClick={this.purchaseItem}
                  >
                    Purchase for {this.state.price}
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
          marginLeft: "-480%"
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
          zIndex: "2"
        }}
        onClick={onClick}
      >
        <Icon name="backward" size="huge" />
      </Button>
    </div>
  );
}
