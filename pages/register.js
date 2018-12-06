import React, { Component } from "react";
import Layout from "../components/Layout";
import {
  Button,
  Form,
  Container,
  Message,
  Icon,
  Dimmer,
  Loader
} from "semantic-ui-react";
import axios from "axios";
import Router from "../routes";
import Web3 from "web3";
let web3 = new Web3(Web3.givenProvider || "ws://localhost:3000");
const adminAddress = "0xa9C3f40905a01240F63AA2b27375b5D43Dcd64E5";

let ABI = [
  {
    constant: false,
    inputs: [{ name: "confirmed", type: "bool" }],
    name: "answer",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "payKYC",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "kycKey", type: "string" },
      { name: "platformAddress", type: "address" }
    ],
    name: "transfer",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "kycKey", type: "string" },
      { indexed: false, name: "platformAddress", type: "address" }
    ],
    name: "KycListen",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "confirmed", type: "bool" }],
    name: "PlatformListen",
    type: "event"
  }
];
let verify;

class register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAccount: "",
      metaMask: false,
      dimmer: false
    };
  }

  async componentWillMount() {
    let interval = setInterval(() => {
      web3.eth.getAccounts(async (err, accounts) => {
        if (err) console.log(err);
        else if (accounts.length === 0) this.setState({ metaMask: false });
        else if (accounts.length > 0) {
          this.setState({ metaMask: true, userAccount: accounts[0] });
          clearInterval(interval);
        }
      });
    }, 500);

    verify = new web3.eth.Contract(
      ABI,
      "0x7bef31F17d4305A7f0AEdDC64feF61Dd6C0620C6"
    );
  }
  onSubmit = async () => {
    this.setState({ dimmer: true });
    let kycKey = document.getElementById("kycKey").value;

    verify.methods.transfer(kycKey, adminAddress).send({
      from: this.state.userAccount,
      value: web3.utils.toWei(".01", "ether")
    });

    await verify.events.PlatformListen({}, async (err, res) => {
      if (err) {
        console.log(err);
      } else {
        if (res.returnValues.confirmed) {
          let username = document.getElementById("username").value;
          let password = document.getElementById("password").value;
          let userAddress = this.state.userAccount;

          //create JSON with user input and send it to DB
          let data = { username, password, userAddress };

          const res = await axios.post(
            window.location.origin + "/register",
            data
          );
          try {
            if (res.data.success) {
              this.setState({ dimmer: false });
              alert(
                "Congratulations, you've successfully registred. Now proceed to the login page"
              );
              Router.pushRoute("login");
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          alert(
            "You are not yet registered on the KYC platform, please do so first and try again"
          );
          location.reload();
        }
      }
    });
  };

  render() {
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
            {this.state.metaMask ? (
              <div>
                <Message
                  attached
                  header="Register here to trade!"
                  style={{ color: "#7a7a52" }}
                />
                <Form
                  onSubmit={this.onSubmit}
                  className="attached fluid segment"
                >
                  <Form.Group>
                    <Form.Input
                      id="username"
                      label="Username"
                      placeholder="Desired username for EthTrade"
                      width={9}
                      required
                      autoFocus
                    />
                    <Form.Input
                      id="password"
                      label="Password"
                      placeholder="Enter desired password"
                      width={9}
                      type="password"
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Input
                      id="kycKey"
                      label="KYC public key"
                      placeholder="Enter key received from KYC platform"
                      required
                      width={16}
                    />
                  </Form.Group>
                  <Button style={{ color: "white", backgroundColor: "tomato" }}>
                    Register
                    <Icon name="signup" style={{ marginLeft: "5px" }} />
                  </Button>
                </Form>
              </div>
            ) : (
              <Message
                attached
                header="You need to login to MetaMask in order to register"
                style={{ color: "#7a7a52" }}
              />
            )}
          </div>
        </Container>
      </Layout>
    );
  }
}

export default register;
