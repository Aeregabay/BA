import React, { Component } from "react";
import Layout from "../components/Layout";
import { Container, Header } from "semantic-ui-react";
import axios from "axios";
import getCurrentUser from "../utils/UserUtils";
import Router from "../routes";

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
      //determines whether the "go to admin page" button should be visible
      clickable: true,
      //determines whether the admin user is on his profile page or not
      isMyProfilePage: false
    };
  }
  //method to go to admin page only if user is admin and on his profile page
  toAdmin = e => {
    Router.pushRoute("admin");
  };
  //functions to toggle clickable for adminpage button
  clickableTrue() {
    this.setState({ clickable: true });
  }
  clickableFalse() {
    this.setState({ clickable: false });
  }

  isMyProfilePageTrue() {
    this.setState({ isMyProfilePage: true });
  }

  //get userdata to display in myprofile
  async componentWillMount() {
    const res = await axios.post(window.location.origin + "/myprofile");
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
    //etherscan link builder
    const etherscanAddress =
      "https://etherscan.io/address/" + this.state.ethAddress;

    return (
      <Layout>
        <div style={{ margin: "20px" }}>
          <div>
            {/* check which header should be displayed, admin or myprofile header */}
            {this.state.admin && !this.state.isMyProfilePage ? (
              <Header
                size="large"
                style={{
                  marginBottom: "30px",
                  textAlign: "center",
                  color: "#7a7a52"
                }}
                hidden={!this.state.admin}
              >
                This is the admin page, {this.state.username}
              </Header>
            ) : (
              <Header
                size="large"
                style={{
                  marginBottom: "30px",
                  textAlign: "center",
                  color: "#7a7a52"
                }}
              >
                Welcome to your profile, {this.state.username}
              </Header>
            )}
          </div>
          <Container style={{ textAlign: "center" }}>
            {/* button only appears when user has admin rights and is on his myprofile page */}
            {this.state.admin && this.state.clickable ? (
              <div
                className="ui basic button"
                hidden={!this.state.admin}
                style={{
                  marginBottom: "30px",
                  border: "1px solid #7a7a52"
                }}
                onClick={this.toAdmin}
              >
                <span style={{ color: "#7a7a52" }}> Go to Admin page</span>
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
                <div className="header" style={{ color: "#7a7a52" }}>
                  {this.state.username}
                </div>
                <div className="meta" style={{ color: "#ccccb3" }}>
                  You are {this.state.userType}
                </div>
              </div>
              <div className="extra content">
                <a href={etherscanAddress} target="_blank">
                  <i className="ethereum icon" style={{ color: "#adad85" }}>
                    {this.state.ethAddress}
                  </i>
                </a>
              </div>
            </div>
          </Container>
        </div>
      </Layout>
    );
  }
}
export default ProfileBody;
