import React, { Component } from "react";
import Layout from "../components/Layout";
import {
  Button,
  Form,
  Container,
  Message,
  Icon,
  Dimmer,
  Loader,
  Modal,
  Header
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
    inputs: [
      { name: "kycKey", type: "string" },
      { name: "platformAddress", type: "address" }
    ],
    name: "verify",
    outputs: [],
    payable: true,
    stateMutability: "payable",
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
    anonymous: false,
    inputs: [
      { indexed: false, name: "kycKey", type: "string" },
      { indexed: false, name: "platformAddress", type: "address" },
      { indexed: false, name: "sender", type: "address" }
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
      dimmer: false,
      registerModal: false
    };
  }

  async componentWillMount() {
    let interval = setInterval(() => {
      web3.eth.getAccounts(async (err, accounts) => {
        if (err) console.log(err);
        else if (accounts.length === 0) this.setState({ metaMask: false });
        else if (accounts.length > 0) {
          this.setState({
            metaMask: true,
            userAccount: window.web3.eth.defaultAccount
          });
          clearInterval(interval);
        }
      });
    }, 500);

    verify = new web3.eth.Contract(
      ABI,
      "0xe78285A95542F415A20c46933544b0bDfCC3263B"
    );
  }
  onSubmit = async () => {
    Web3.givenProvider.on("error", e => console.error("WS Error", e));
    Web3.givenProvider.on("end", e => console.error("WS End", e));

    this.setState({ dimmer: true });
    let kycKey = document.getElementById("kycKey").value;

    verify.methods.verify(kycKey, adminAddress).send({
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
              this.setState({ dimmer: false, registerModal: true });
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          this.setState({ registerFail: true });
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
          <Modal
            key="registerModal"
            dimmer="blurring"
            open={this.state.registerModal}
            onClose={() => {
              this.setState({ registerModal: false });
              Router.pushRoute("login");
            }}
            basic
            style={{ textAlign: "center" }}
          >
            <Modal.Header>
              <Header size="huge" style={{ color: "white" }}>
                Congratulations, you've successfully registered. Now proceed to
                the login page
              </Header>
              <Icon name="check" size="huge" color="green" />
            </Modal.Header>
            <Modal.Actions>
              <Button
                key="registerOkay"
                positive
                icon="arrow right"
                labelPosition="right"
                content="Proceed to login"
                onClick={() => {
                  this.setState({ registerModal: false });
                  Router.pushRoute("login");
                }}
              />
            </Modal.Actions>
          </Modal>
          <Modal
            key="registerFail"
            dimmer="blurring"
            open={this.state.registerFail}
            onClose={() => {
              this.setState({ registerFail: false });
              location.reload();
            }}
            basic
            style={{ textAlign: "center" }}
          >
            <Modal.Header>
              <Header size="huge" style={{ color: "white" }}>
                Could not retrieve your information.
                <p>Please register on the KYC Platform first.</p>
              </Header>
              <Icon name="remove" size="huge" color="red" />
            </Modal.Header>
            <Modal.Actions>
              <Button
                key="registerNotOkay"
                positive
                icon="refresh"
                labelPosition="right"
                content="Try again"
                onClick={() => {
                  this.setState({ registerFail: false });
                  location.reload();
                }}
              />
            </Modal.Actions>
          </Modal>

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
