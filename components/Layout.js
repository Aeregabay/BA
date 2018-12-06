import React, { Component } from "react";
import Router from "../routes";
import {
  Header,
  Container,
  List,
  Icon,
  Segment,
  Modal,
  Button
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
        isLoggedIn: true,
        loginModal: false
      });
    }
  }

  //methods to navigate between pages
  toSell = () => {
    if (this.state.isLoggedIn) {
      Router.pushRoute("sell");
    } else {
      this.setState({ loginModal: true });
    }
  };
  toProfile = () => {
    if (this.state.isLoggedIn) {
      Router.pushRoute("myprofile");
    } else {
      this.setState({ loginModal: true });
    }
  };
  toSettings = () => {
    if (this.state.isLoggedIn) {
      Router.pushRoute("settings");
    } else {
      this.setState({ loginModal: true });
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
    this.setState({ logoutModal: true });
  };

  render() {
    return (
      <div>
        <Modal
          key="loginModal"
          dimmer="blurring"
          open={this.state.loginModal}
          onClose={() => {
            this.setState({ loginModal: false });
            Router.pushRoute("login");
          }}
          basic
          style={{ textAlign: "center" }}
        >
          <Modal.Header>
            <Header size="huge" style={{ color: "white" }}>
              You have to be logged in in order to view this page!
            </Header>
            <Icon name="remove" size="huge" color="red" />
          </Modal.Header>
          <Modal.Actions>
            <Button
              key="loginPromt"
              positive
              icon="arrow right"
              labelPosition="right"
              content="Proceed to login"
              onClick={() => {
                this.setState({ loginModal: false });
                Router.pushRoute("login");
              }}
            />
          </Modal.Actions>
        </Modal>
        <Modal
          key="logoutModal"
          dimmer="blurring"
          open={this.state.logoutModal}
          onClose={() => {
            this.setState({ logoutModal: false });
            Router.pushRoute("index");
          }}
          basic
          style={{ textAlign: "center" }}
        >
          <Modal.Header>
            <Header size="huge" style={{ color: "white" }}>
              You've logged out, see you soon!
            </Header>
            <Icon name="power off" size="huge" color="red" />
          </Modal.Header>
          <Modal.Actions>
            <Button
              key="logoutModalBtn"
              positive
              icon="arrow right"
              labelPosition="right"
              content="Proceed to index"
              onClick={() => {
                this.setState({ logoutModal: false });
                Router.pushRoute("index");
              }}
            />
          </Modal.Actions>
        </Modal>
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
