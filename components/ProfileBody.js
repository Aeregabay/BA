import React, { Component } from "react";
import Layout from "../components/Layout";
import { Container, Header } from "semantic-ui-react";
import axios from "axios";
import getCurrentUser from "../utils/UserUtils";
import { Router } from "../routes";

class ProfileBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      id: "",
      username: "",
      password: "",
      profilePic: "",
      ethAddress: "",
      admin: "",
      userType: "",
      clickable: true
    };
  }

  toAdmin = e => {
    Router.push("/admin");
  };

  clickableTrue() {
    this.setState({ clickable: true });
  }
  clickableFalse() {
    this.setState({ clickable: false });
  }

  async componentDidMount() {
    const username = getCurrentUser();
    const res = await axios.post(window.location.origin + "/myprofile", {
      username
    });
    try {
      if (res.data.success) {
        this.setState({
          user: res.data.userData
        });
        this.setState({
          id: this.state.user[0].id,
          username: this.state.user[0].username,
          password: this.state.user[0].password,
          profilePic: "../static/" + this.state.user[0].profile_pic,
          ethAddress: this.state.user[0].eth_account,
          admin: this.state.user[0].admin
        });
      }
      if (this.state.admin == 1) {
        this.setState({ userType: "an admin" });
      } else {
        this.setState({ userType: "a user" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const etherscanAddress =
      "https://etherscan.io/address/" + this.state.ethAddress;

    return (
      <Layout>
        <div>
          <Header
            textAlign="center"
            size="large"
            style={{ marginBottom: "30px" }}
          >
            Welcome to your profile, {this.state.username}
          </Header>
        </div>
        <Container textAlign="center">
          {this.state.admin && this.state.clickable ? (
            <div
              className="ui blue button"
              hidden={!this.state.admin}
              style={{
                marginBottom: "30px"
              }}
              textAlign="center"
              onClick={this.toAdmin}
            >
              Go to Admin page
            </div>
          ) : (
            ""
          )}
        </Container>
        <Container>
          <div
            className="ui fluid centered raised link card"
            style={{ width: "340px" }}
          >
            <div className="image">
              <img
                src={this.state.profilePic}
                style={{
                  backgroundColor: "white",
                  maxWidth: "340px"
                }}
              />
            </div>
            <div className="content">
              <div className="header">{this.state.username}</div>
              <div className="meta">You are {this.state.userType}</div>
            </div>
            <div className="extra content">
              <a href={etherscanAddress} target="_blank">
                <i className="ethereum icon">{this.state.ethAddress}</i>
              </a>
            </div>
          </div>
        </Container>
      </Layout>
    );
  }
}
export default ProfileBody;
