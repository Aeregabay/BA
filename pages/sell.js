import React, { Component } from "react";
import Layout from "../components/Layout";
import Router from "../routes";
import {
  Container,
  Form,
  Button,
  Header,
  FormInput,
  Checkbox,
  Dimmer,
  Loader
} from "semantic-ui-react";
import axios from "axios";
import NumberFormat from "react-number-format";
import { ABI, contractAddress } from "../ethereum/deployedContract";

import Web3 from "web3";
let web3 = new Web3(Web3.givenProvider || "ws://localhost:3000");
let register;

global.fetch = require("node-fetch");
const cc = require("cryptocompare");
cc.setApiKey(
  "41e7dfb621809bb8dc9f905d7fa8a728389852a7d41e9e225d88e68cfe6d2b4b"
);

//possible amounts of identical objects to sell
const amountOptions = [
  { key: 1, text: "1", value: 1 },
  { key: 2, text: "2", value: 2 },
  { key: 3, text: "3", value: 3 },
  { key: 4, text: "4", value: 4 },
  { key: 5, text: "5", value: 5 },
  { key: 6, text: "6", value: 6 },
  { key: 7, text: "7", value: 7 },
  { key: 8, text: "8", value: 8 },
  { key: 9, text: "9", value: 9 },
  { key: 10, text: "10", value: 10 },
  { key: 11, text: "11", value: 11 },
  { key: 12, text: "12", value: 12 },
  { key: 13, text: "13", value: 13 },
  { key: 14, text: "14", value: 14 },
  { key: 15, text: "15", value: 15 },
  { key: 16, text: "16", value: 16 },
  { key: 17, text: "17", value: 17 },
  { key: 18, text: "18", value: 16 },
  { key: 19, text: "19", value: 19 },
  { key: 20, text: "20", value: 16 }
];

//predefined categories the user can choose from to categorize his item
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
//possible states of an item
const statusOptions = [
  { key: "new", text: "new", value: "new" },
  { key: "used", text: "used", value: "used" },
  { key: "damaged", text: "damaged", value: "damaged" }
];

//arrays that will be used for modifications further down
let options = [];
let currentValues = [];
let allPics = [];

class sell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      status: "",
      category: "",
      price: "",
      userAddress: "",
      objectId: "",
      amount: "",
      metaMask: false,
      agreement: false,
      dimmer: false
    };
  }

  //function to register an item on the Smart Contract
  pushToChain = async () => {
    let ethToCHF = await cc.price("ETH", ["CHF"]);
    let priceToNumber = Number(
      this.state.price.slice(0, this.state.price.length - 4)
    );
    let price = priceToNumber / ethToCHF.CHF;
    let collateral = (price / 2).toFixed(10);

    register.methods
      .registerObject(
        parseInt(this.state.objectId),
        this.state.userAddress,
        this.state.status
      )
      .send({
        from: this.state.userAddress,
        value: web3.utils.toWei(collateral.toString(), "ether"),
        gas: 100000,
        gasPrice: "10000000000"
      });
  };

  //load tags from DB to choose from
  async componentWillMount() {
    //create local contract to interact with smart contract
    register = new web3.eth.Contract(ABI, contractAddress);

    //fetch tags
    let tags = await axios.post(window.location.origin + "/getTags");
    if (tags.data.success) {
      let temporary = [];

      //read content and push to temporary array
      for (let i = 0; i < tags.data.tags.length; i++) {
        temporary.push(tags.data.tags[i].content);
      }
      //clean temporary array from duplicates
      let tempClean = Array.from(new Set(temporary));
      let tempOptions = [];

      //create json objects to display later on
      for (let i = 0; i < tempClean.length; i++) {
        tempOptions.push({
          key: Math.random()
            .toString(36)
            .substr(2, 16),
          text: tempClean[i],
          value: tempClean[i]
        });
      }
      options = tempOptions;
    } else {
      alert("The tag retrieval was not successfull on the client side");
    }

    //metamask extension login is needed in order to sell an item
    setInterval(() => {
      web3.eth.getAccounts((err, accounts) => {
        if (err) console.log(err);
        else if (accounts.length === 0) this.setState({ metaMask: false });
        else if (accounts.length > 0) {
          this.setState({
            metaMask: true,
            userAddress: window.web3.eth.defaultAccount
          });
        }
      });
    }, 500);
  }

  onSubmit = async () => {
    if (
      this.state.category !== "" &&
      this.state.price !== "" &&
      currentValues !== [] &&
      this.state.status !== "" &&
      this.state.files !== []
    ) {
      //create FormData with object details to send to server
      let formData = new FormData();
      //these properties are fetchable via document.getElementById() from JSX part
      formData.append("title", document.getElementById("title").value);
      formData.append("price", document.getElementById("price").value);
      this.setState({ price: document.getElementById("price").value });
      formData.append("email", document.getElementById("email").value);

      formData.append(
        "description",
        document.getElementById("description").value
      );
      //these properties were written into variables by their onChange methods and
      //retrieved that way
      formData.append("category", this.state.category);
      formData.append("currentValues", currentValues);
      // let uniqueOptions = new Set(options);
      // formData.append("options", uniqueOptions);

      //append all pics inside allPics array to the formData individually with
      //incrementing key names like pic$ (pic0, pic1, etc...)
      for (let i = 0; i < allPics.length; i++) {
        formData.append("pic" + i, this.state.files[i]);
      }
      //status entered by the user concerning the object
      formData.append("status", this.state.status);

      this.setState({ dimmer: true });
      for (let i = 0; i < this.state.amount; i++) {
        //adds the remaining amount of objects in an inventory (in an inventory of 5, the first object will have
        //an amount of 5, the second one 4 and the last one 1)
        //amount from precedent object has to first be deleted
        formData.delete("amount");
        formData.append("amount", this.state.amount - i);

        if (this.state.amount > 1) {
          //append "multipleOf" attribute to all the multiples (hence except the first object where i = 0)
          //needs to happen only once, since stays appended to formData and doesn't change
          if (i === 1) formData.append("multipleOf", this.state.objectId);
        }

        //send created formData to server
        const res = await axios.post(
          window.location.origin + "/sell",
          formData
        );

        //when successful, redirect to /browse page
        if (res.data.success) {
          //objectId is set for the first object, the rest will have this id in their "multiple_of" column
          if (i === 0) {
            this.setState({ objectId: res.data.objectId });
          }
          this.pushToChain();

          register.events.PurchaseListen({}, (err, res) => {
            if (err) {
              console.log(err);
            } else if (res.returnValues.confirmed) {
              console.log("object has been written to the smart contract");
              //if last object in inventory, redirect to browse
              if (i === this.state.amount - 1) {
                Router.pushRoute("browse");
              }
            }
          });
        }
      }
    } else {
      alert("Please fill out all the required fields (marked with a star)");
    }
  };

  //handler for addition of a Tag
  handleAddition = (e, { value }) => {
    options.push({
      key: Math.random()
        .toString(36)
        .substr(2, 16),
      text: value,
      value
    });
  };

  //handler to always have a current array of all tags to submit
  handleChange = (e, { value }) => {
    currentValues[0] = value;
  };

  //category change handler
  handleCategoryChange = (e, { value }) => {
    for (let i = 0; i < categories.length; i++) {
      if (value === categories[i].value) {
        this.setState({ category: categories[i].text });
      }
    }
  };

  //handler to track item status that is input
  statusHandler = (e, { value }) => {
    // e.persist();
    switch (value) {
      case "new":
        this.setState({ status: "new" });
        break;
      case "used":
        this.setState({ status: "used" });
        break;
      case "damaged":
        this.setState({ status: "damaged" });
        break;
    }
  };

  //handler for photo upload
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
        <Container style={{ margin: "20px" }}>
          <Dimmer inverted active={this.state.dimmer}>
            <Loader>
              Please wait for the transaction to complete, do not refresh or
              leave the page
            </Loader>
          </Dimmer>
          <div>
            <Header style={{ color: "#7a7a52" }} textAlign="center" size="huge">
              Welcome to the selling page
            </Header>
            {this.state.metaMask ? (
              <div>
                <Header
                  textAlign="center"
                  size="medium"
                  style={{ marginBottom: "70px", color: "#7a7a52" }}
                >
                  Please enter all the information about your item below
                </Header>
                <Form onSubmit={this.onSubmit}>
                  <Form.Group>
                    <Form.Input
                      id="title"
                      control="input"
                      label="Item title"
                      placeholder="Enter the title that should appear in searchresults"
                      width={13}
                      required
                      autoFocus
                    />
                    <Form.Select
                      label="Amount"
                      onChange={(e, { value }) => {
                        this.setState({ amount: value });
                      }}
                      options={amountOptions}
                      placeholder="Amount of identical items sold"
                      selection
                      search
                      required
                      width={4}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Input
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
                      width={14}
                      required
                      onChange={this.handleCategoryChange}
                    />
                    <FormInput required label="Selling price">
                      <NumberFormat
                        id="price"
                        placeholder="Item price"
                        customInput={FormInput}
                        thousandSeparator="´"
                        suffix=" CHF"
                        allowNegative={false}
                        onChange={e => {
                          this.setState({ price: e.target.value });
                        }}
                      />
                    </FormInput>
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
                      label="Status"
                      onChange={this.statusHandler}
                      options={statusOptions}
                      placeholder="What is the status of this item?"
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
                    <FormInput
                      fluid
                      id="email"
                      control="input"
                      type="email"
                      label="Email Address"
                      placeholder="This will only be displayed once a user has successfully bought your item"
                      width={12}
                      required
                    />
                  </Form.Group>
                  <Checkbox
                    label={
                      <label>
                        <p>
                          By checking this box, you agree that 50% of the item's
                          price will be sent to the platforms escrow account as
                          collateral. These funds will be refunded back to you
                          together with the rest of the sale, as soon as the
                          buyer has received the item.
                        </p>
                        <p>
                          You also acknowledge that all the information provided
                          to the platform regarding an item will always remain
                          on the blockchain, even after deletion from the
                          platform.
                        </p>
                      </label>
                    }
                    onClick={() =>
                      this.setState({ agreement: !this.state.agreement })
                    }
                  />
                  <p />
                  {this.state.agreement ? (
                    <Button
                      content="Place item"
                      style={{ color: "white", backgroundColor: "tomato" }}
                    />
                  ) : (
                    ""
                  )}
                </Form>
              </div>
            ) : (
              <Header
                textAlign="center"
                size="medium"
                style={{ marginBottom: "70px", color: "#7a7a52" }}
              >
                You need to login to MetaMask in order to sell an item
              </Header>
            )}
          </div>
        </Container>
      </Layout>
    );
  }
}

export default sell;
