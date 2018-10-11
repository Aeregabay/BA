import React, { Component } from "react";
import { Router } from "../routes";
import { Header, Menu, Container } from "semantic-ui-react";
import Head from "next/head";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toBrowse = e => {
    Router.push("/browse");
  };
  toSell = e => {
    Router.push("/sell");
  };
  toProfile = e => {
    Router.push("/myprofile");
  };
  toSettings = e => {
    Router.push("/settings");
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
              <a
                className="ui item"
                onClick={this.toRegister}
                style={{ color: "tomato" }}
              >
                Register
              </a>
              <a
                className="ui item"
                onClick={this.toLogin}
                style={{ color: "MediumSeaGreen" }}
                color="green"
              >
                Login
              </a>
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

//button version
{
  /* <Menu style={{ marginTop: "10px" }}>
            <Menu.Item>
              <Button onClick={this.toHome} content="Home" color="black" />
            </Menu.Item>
            <Menu.Item>
              <Button onClick={this.toBrowse} content="Browse" color="grey" />
            </Menu.Item>
            <Menu.Item>
              <Button onClick={this.toSell} content="Sell" color="grey" />
            </Menu.Item>
            <Menu.Item>
              <Button onClick={this.toProfile} content="My Profile" />
            </Menu.Item>
            <Menu.Item>
              <Button onClick={this.toSettings} content="Settings" />
            </Menu.Item>

            <Menu.Menu position="right">
              <Menu.Item>
                <Button
                  onClick={this.toRegister}
                  content="Register"
                  color="red"
                />
              </Menu.Item>
              <Menu.Item>
                <Button onClick={this.toLogin} content="Login" color="green" />
              </Menu.Item>
            </Menu.Menu>
          </Menu> */
}
