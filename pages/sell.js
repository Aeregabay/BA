import React, { Component } from "react";
import Layout from "../components/Layout";
import Router from "../routes";
import { Container, Form, Button, Header, Icon } from "semantic-ui-react";
import axios from "axios";

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
const ownerOptions = [
  { key: "yes", text: "Yes", value: "yes" },
  { key: "no", text: "No", value: "no" }
];

let options = [];
let isOwner = false;
let category = "";
let currentValues = [];
let allPics = [];

class sell extends Component {
  constructor(props) {
    super(props);
    this.state = { files: [] };
  }

  //load tags from DB to choose from
  async componentWillMount() {
    let tags = await axios.post(window.location.origin + "/getTags");
    if (tags.data.success) {
      for (let i = 0; i < tags.data.tags.length; i++) {
        options.push({
          key: tags.data.tags[i].content,
          text: tags.data.tags[i].content,
          value: tags.data.tags[i].content
        });
      }
    } else {
      alert("The tag retrieval was not successfull on the client side");
    }
  }

  async onSubmit(e) {
    //create FormData with object details to send to server
    let formData = new FormData();
    if (isOwner) {
      //these properties are fetchable via document.getElementById() from JSX part
      formData.append("title", document.getElementById("title").value);
      formData.append("price", document.getElementById("price").value);
      formData.append(
        "description",
        document.getElementById("description").value
      );
      //these properties were written into variables by their onChange methods and
      //retrieved that way
      formData.append("category", category);
      formData.append("currentValues", currentValues);
      formData.append("options", options);

      //append all pics inside allPics array to the formData individually with
      //incrementing key names like pic$ (pic0, pic1, etc...)
      for (let i = 0; i < allPics.length; i++) {
        formData.append("pic" + i, allPics[i]);
      }
    } else {
      alert("You have to own the item in order to sell it, try again");
      Router.pushRoute("index");
    }

    //send created formData to server
    try {
      const res = await axios.post(window.location.origin + "/sell", formData);

      //when successful, redirect to /browse page
      if (res.data.success) {
        alert("Your item has successfully submitted");
        Router.pushRoute("browse");
      }
    } catch (err) {
      alert("Your request has not been successful, here is the error:" + err);
    }
  }

  handleAddition = (e, { value }) => {
    options.push({ key: value, text: value, value });
  };

  handleChange = (e, { value }) => {
    currentValues[0] = value;
  };

  handleCategoryChange = (e, { value }) => {
    for (let i = 0; i < categories.length; i++) {
      if (value === categories[i].value) {
        category = categories[i].text;
      }
    }
  };

  isOwner = (e, { value }) => {
    e.persist();
    if (value === "yes") {
      isOwner = true;
    } else {
      isOwner = false;
    }
  };

  handleFiles = e => {
    let i;
    let tempFiles = e.target.files;
    for (i = 0; i < tempFiles.length; i++) {
      allPics.push(tempFiles[i]);
    }
    this.setState({ files: allPics });
  };

  render() {
    const { currentValues } = this.state;
    return (
      <Layout>
        <Container>
          <div>
            <Header textAlign="center" size="huge">
              Welcome to the selling page
            </Header>
            <Header
              textAlign="center"
              size="medium"
              style={{ marginBottom: "70px" }}
            >
              Please enter all the information about your item below
            </Header>
            <Form onSubmit={this.onSubmit}>
              <Form.Group>
                <Form.Input
                  fluid="true"
                  id="title"
                  control="input"
                  label="Item title"
                  placeholder="Enter the title that should appear in searchresults"
                  width={16}
                  required
                  autoFocus
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  fluid="true"
                  id="description"
                  control="textarea"
                  label="Description"
                  placeholder="Specify additional information about your object here"
                  width={16}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Select
                  label="Category"
                  options={categories}
                  placeholder="Category"
                  width={12}
                  required
                  onChange={this.handleCategoryChange}
                />
                <Form.Input
                  fluid="true"
                  id="price"
                  control="input"
                  label="Selling price"
                  placeholder="Item price"
                  width={4}
                  required
                  type="number"
                />
              </Form.Group>
              <Form.Group>
                <Form.Select
                  label="Tags"
                  options={options}
                  placeholder="Enter the tags here that describe your item"
                  search
                  selection
                  fluid
                  multiple
                  allowAdditions
                  value={currentValues}
                  onAddItem={this.handleAddition}
                  onChange={this.handleChange}
                  width={12}
                  required
                />
                <Form.Select
                  label="Owner"
                  onChange={this.isOwner}
                  options={ownerOptions}
                  placeholder="Do you own this item?"
                  selection
                  search
                  required
                  width={4}
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  fluid
                  type="file"
                  label="Upload your pictures here"
                  name="file"
                  id="file"
                  multiple
                  onChange={this.handleFiles}
                />
              </Form.Group>

              <Button content="Place item" color="google plus" />
            </Form>
          </div>
        </Container>
      </Layout>
    );
  }
}

export default sell;
