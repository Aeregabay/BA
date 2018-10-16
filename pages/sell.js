import React, { Component } from "react";
import Layout from "../components/Layout";
import { Container, Form, Button, Header, Dropdown } from "semantic-ui-react";

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

let options = [
  { key: "computers", text: "Computers", value: "Computers" },
  { key: "cars", text: "Cars", value: "Cars" }
];
let isOwner = false;
let category = "";
let currentValues = [];

class sell extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleAddition = (e, { value }) => {
    options.push({ key: value, text: value, value });
  };

  handleChange = (e, { value }) => {
    currentValues.push(value);
  };

  handleCategoryChange = (e, { value }) => {
    category = value;
  };

  isOwner = (e, { value }) => {
    e.persist();
    if (value === "yes") {
      isOwner = true;
    } else {
      isOwner = false;
    }
  };

  async onSubmit() {
    console.log(document.getElementById("title").value);
    console.log(document.getElementById("price").value);
    console.log(document.getElementById("description").value);
    console.log(isOwner);
    console.log(category);
    console.log(currentValues);
    console.log(options);
  }

  render() {
    const { currentValues } = this.state;
    console.log(currentValues);
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
              <Button content="Place item" color="google plus" />
            </Form>
          </div>
        </Container>
      </Layout>
    );
  }
}

export default sell;
