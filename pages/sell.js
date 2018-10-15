import React, { Component } from "react";
import Layout from "../components/Layout";
import { Container, Form, Button, Header } from "semantic-ui-react";

import CreatableSelect from "react-select/lib/Creatable";

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

const options = [
  { key: "yes", text: "Yes", value: "yes" },
  { key: "no", text: "No", value: "no" }
];

const tags = [{ value: "computers", label: "Computers" }];

class sell extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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
                  width={15}
                  required
                  autoFocus
                />
                <Form.Input
                  fluid="true"
                  id="price"
                  control="input"
                  label="Selling price"
                  placeholder="Item price"
                  width={3}
                  required
                  type="number"
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
                  width={10}
                  required
                />
                <Form.Select
                  id="owner"
                  label="Item Owner"
                  options={options}
                  placeholder="Do you own this item?"
                  required
                  width={6}
                />
              </Form.Group>
              <Form.Group>
                <Container>
                  <CreatableSelect
                    id="tags"
                    placeholder="Enter the tags here that describe your item"
                    isClearable
                    isMulti
                    options={tags}
                  />
                </Container>
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
