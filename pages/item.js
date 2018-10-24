import React, { Component } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { Container, Header, Button, Icon } from "semantic-ui-react";
import Slider from "react-slick";

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

  async componentWillMount() {
    let thisObject;
    let pathname = window.location.pathname.split("/");
    let id = pathname[pathname.length - 1];
    let response = await axios.post(window.location.origin + "/item", { id });
    if (response.data.success) {
      thisObject = response.data.object;
      let picsTemp = [];

      for (let i = 0; i < response.data.pics.length; i++) {
        picsTemp.push(response.data.pics[i].name);
      }

      this.setState({
        id: response.data.id,
        title: thisObject[0].title,
        category: thisObject[0].category,
        description: thisObject[0].description,
        owner: thisObject[0].owner,
        price: thisObject[0].price,
        tags: response.data.tags,
        pics: picsTemp
      });
    }
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      speed: 500,
      dotsClass: "slick-dots slick-thumb",
      adaptiveHeight: true,
      focusOnSelect: true,
      onEdge: true,
      prevArrow: <CustomPrevArrow />,
      nextArrow: <CustomNextArrow />
    };
    return (
      <div>
        <head>
          <link
            rel="stylesheet"
            type="text/css"
            charset="UTF-8"
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
          </Container>
        </Layout>
      </div>
    );
  }
}

export default item;

function CustomNextArrow(props) {
  const { className, style, onClick } = props;
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
  const { className, style, onClick } = props;
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
