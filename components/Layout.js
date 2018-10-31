import React, { Component } from "react";
import Router from "../routes";
import {
  Header,
  Container,
  Divider,
  List,
  Icon,
  Segment
} from "semantic-ui-react";
import Head from "next/head";
import axios from "axios";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cookie: "",
      currentUser: "",
      isLoggedIn: false
    };
  }

  async componentDidMount() {
    let response = await axios.post(window.location.origin + "/getCookie");
    if (response.data.success) {
      this.setState({
        cookie: response.data.cookie,
        currentUser: response.data.username,
        isLoggedIn: true
      });
    }
  }

  //methods to navigate between pages
  toSell = () => {
    if (this.state.isLoggedIn) {
      Router.pushRoute("sell");
    } else {
      alert("You need to be logged in to access this page");
      Router.pushRoute("login");
    }
  };
  toProfile = () => {
    if (this.state.isLoggedIn) {
      Router.pushRoute("myprofile");
    } else {
      alert("You need to be logged in to access this page");
      Router.pushRoute("login");
    }
  };
  toSettings = () => {
    if (this.state.isLoggedIn) {
      Router.pushRoute("settings");
    } else {
      alert("You need to be logged in to access this page");
      Router.pushRoute("login");
    }
  };
  toBrowse = e => {
    Router.pushRoute("browse");
  };
  toLogin = e => {
    Router.pushRoute("login");
  };
  toRegister = e => {
    Router.pushRoute("register");
  };
  toIndex = e => {
    Router.pushRoute("index");
  };
  logout = async () => {
    const res = await axios.post(
      window.location.origin + "/deleteCookie",
      this.state.cookie
    );
    Router.pushRoute("index");
    alert("You've successfully logged out");
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
        <style jsx global>{`
          body {
            background: #f5f5f0;
          }
        `}</style>
        <Segment style={{ width: "90%", margin: "auto", marginBottom: "30px" }}>
          <Container>
            <Header
              size="huge"
              style={{
                marginTop: "15px",
                textAlign: "center",
                color: "#7a7a52"
              }}
            >
              EthTrade <Icon name="ethereum" />
              Decentralized Trading
            </Header>

            <div
              //Navbar menu
              className="ui menu"
              style={{ marginTop: "30px", marginBottom: "20px" }}
            >
              <a
                className="header item"
                onClick={this.toIndex}
                style={{ color: "#7a7a52" }}
              >
                <Icon name="home" />
                Home
              </a>
              <a
                className="item"
                onClick={this.toBrowse}
                style={{ color: "#7a7a52" }}
              >
                <Icon name="search" />
                Browse
              </a>
              <a
                className="item"
                onClick={this.toSell}
                style={{ color: "#7a7a52" }}
              >
                <Icon name="dollar sign" />
                Sell
              </a>
              <a
                className="item"
                onClick={this.toProfile}
                style={{ color: "#7a7a52" }}
              >
                <Icon name="user" />
                My Profile
              </a>
              <a
                className="item"
                onClick={this.toSettings}
                style={{ color: "#7a7a52" }}
              >
                <Icon name="settings" />
                Settings
              </a>
              <div className="right menu">
                {this.state.currentUser.length < 1 ? (
                  <a
                    className="ui item"
                    onClick={this.toRegister}
                    style={{ color: "tomato" }}
                  >
                    <Icon name="signup" />
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
                    <Icon name="shutdown" />
                    Logout
                  </a>
                ) : (
                  <a
                    className="ui item"
                    onClick={this.toLogin}
                    style={{ color: "#00cc7a" }}
                  >
                    <Icon name="key" />
                    Login
                  </a>
                )}
              </div>
            </div>
          </Container>
        </Segment>
        <Segment style={{ width: "90%", margin: "auto", marginBottom: "30px" }}>
          {this.props.children}
        </Segment>
        <Segment style={{ width: "90%", margin: "auto", marginBottom: "30px" }}>
          <Container>
            <p>
              <b style={{ color: "#7a7a52" }}>Links</b>
            </p>
            <List bulleted horizontal>
              <List.Item
                as="a"
                href="https://github.com/Aeregabay/BA"
                style={{ color: "#adad85" }}
              >
                <List.Icon name="github" />
                GitHub Repo
              </List.Item>
            </List>
          </Container>
        </Segment>
      </div>
    );
  }
}

export default Layout;
