import React, { Component } from "react";
import { Router } from "../routes";
import { Header, Container } from "semantic-ui-react";
import Head from "next/head";
import axios from "axios";
import getCurrentUser from "../utils/UserUtils";
const jwt = require("jsonwebtoken");
const secret = "realmadrid";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cookie: "",
      currentUser: ""
    };
  }

  async componentDidMount() {
    let cookie = await axios.post(window.location.origin + "/getCookie");
    this.setState({ cookie });
    let currentUser = getCurrentUser();
    this.setState({ currentUser });
  }

  //methods to navigate between pages

  toSell = () => {
    this.tokenVerify();
    Router.push("/sell");
  };
  toProfile = () => {
    this.tokenVerify();
    Router.push("/myprofile");
  };
  toSettings = () => {
    this.tokenVerify();
    Router.push("/settings");
  };
  toBrowse = e => {
    Router.push("/browse");
  };
  toLogin = e => {
    Router.push("/login");
  };
  toRegister = e => {
    Router.push("/register");
  };
  toHome = e => {
    Router.push("/");
  };
  logout = async () => {
    const res = await axios.post(
      window.location.origin + "/deleteCookie",
      this.state.cookie
    );
    Router.push("/");
    alert("You've successfully logged out");
  };

  tokenVerify = () => {
    if (!this.state.cookie) {
      Router.push("/login");
    }
    jwt.verify(this.state.cookie, secret, (err, decoded) => {
      if (err) {
        Router.push("/login");
        console.log("error");
      } else {
        next();
      }
    });
  };

  render() {
    return (
      <div>
        <Head>
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"
          />
        </Head>
        <Container>
          <Header size="huge" style={{ marginTop: "15px" }} textAlign="center">
            EthTrade - Decentralized Trading
          </Header>

          <div
            //Navbar menu
            className="ui menu"
            style={{ marginTop: "30px", marginBottom: "40px" }}
          >
            <a className="header item" onClick={this.toHome}>
              Home
            </a>
            <a className="item" onClick={this.toBrowse}>
              Browse
            </a>
            <a className="item" onClick={this.toSell}>
              Sell
            </a>
            <a className="item" onClick={this.toProfile}>
              My Profile
            </a>
            <a className="item" onClick={this.toSettings}>
              Settings
            </a>
            <div className="right menu">
              {this.state.currentUser.length < 1 ? (
                <a
                  className="ui item"
                  onClick={this.toRegister}
                  style={{ color: "tomato" }}
                >
                  Register
                </a>
              ) : (
                ""
              )}
              {this.state.currentUser.length > 0 ? (
                <a
                  className="ui item"
                  onClick={this.logout}
                  style={{ color: "tomato" }}
                >
                  Logout
                </a>
              ) : (
                <a
                  className="ui item"
                  onClick={this.toLogin}
                  style={{ color: "MediumSeaGreen" }}
                >
                  Login
                </a>
              )}
              {/* <a
                className="ui item"
                onClick={this.toLogin}
                style={{ color: "MediumSeaGreen" }}
                color="green"
              >
                Login
              </a> */}
            </div>
          </div>
        </Container>
        {this.props.children}
        <Container>
          <Header size="medium" style={{ marginTop: "70px" }}>
            Footer Section with links
          </Header>
        </Container>
      </div>
    );
  }
}

export default Layout;
