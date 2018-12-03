import React, { Component } from "react";
import Layout from "../components/Layout";
import { Button, Form, Container, Message, Icon } from "semantic-ui-react";
import axios from "axios";
import Router from "../routes";
import Web3 from "web3";
const web3 = new Web3(window.web3.currentProvider);

class register extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", metaMask: false };
  }

  async onSubmit() {
    let kycKey = document.getElementById("kycKey").value;
    let userAddress = web3.eth.accounts[0];

    let Verify = web3.eth.Contract("ABI", "address");

    Verify.methods.transfer(kycKey).send({
      from: "AdminAddress"
    });

    let verificationEvent = Verify.PlatformListen();

    verificationEvent.watch(async (err, res) => {
      if (err) {
        console.log(err);
      } else {
        if (res.args.confirmed) {
          let username = document.getElementById("username").value;
          let password = document.getElementById("password").value;

          //create JSON with user input and send it to DB
          let data = { username, password, userAddress };
          const res = await axios.post(
            window.location.origin + "/register",
            data
          );
          try {
            if (res.data.success) {
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
  }

  componentWillUpdate() {
    if (web3.eth.accounts[0]) this.setState({ metaMask: true });
  }

  render() {
    return (
      <Layout>
        <Container style={{ margin: "20px" }}>
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
