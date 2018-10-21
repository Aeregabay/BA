import React, { Component } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { Container, Header } from "semantic-ui-react";

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

  returnImgs() {
    let picsToReturn = [];
    for (let i = 0; i < this.state.pics.length; i++) {
      let src = "../static/" + this.state.pics[i].name;

      picsToReturn.push(<img src={src} />);
    }
    console.log(picsToReturn);
    return picsToReturn;
  }

  async componentWillMount() {
    let thisObject;
    let pathname = window.location.pathname.split("/");
    let id = pathname[pathname.length - 1];
    let response = await axios.post(window.location.origin + "/item", { id });
    if (response.data.success) {
      thisObject = response.data.object;
      let picsTemp = [];
      let picsToDisplay = "";

      for (let i = 0; i < response.data.pics.length; i++) {
        picsTemp.push("../static/" + response.data.pics[i].name);
      }
      console.log(picsTemp);
      this.setState({
        id: response.data.id,
        title: thisObject[0].title,
        category: thisObject[0].category,
        description: thisObject[0].description,
        owner: thisObject[0].owner,
        price: thisObject[0].price,
        tags: response.data.tags,
        pics: picsToDisplay
      });
    }
  }

  render() {
    return (
      <Layout>
        <Container textAlign="center">
          <Header size="huge">{this.state.title}</Header>
        </Container>
        <div />
      </Layout>
    );
  }
}

export default item;
