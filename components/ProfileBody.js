import React, { Component } from "react";
import Layout from "../components/Layout";
import {
  Container,
  Header,
  Segment,
  Form,
  Button,
  Dimmer,
  Loader
} from "semantic-ui-react";
import axios from "axios";
import Router from "../routes";

class ProfileBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      username: "",
      password: "",
      ethAddress: "",
      admin: "", //either 1 or 0
      userType: "", //suffix for display of userType
      clickable: true, //determines whether the "go to admin page" button should be visible
      isMyProfilePage: false, //determines whether the admin user is on his profile page or not
      oldPw: "",
      newPw1: "",
      newPw2: "",
      dimmer: false,
      newEmail: ""
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
          id: res.data.userData[0].id,
          username: res.data.userData[0].username,
          password: res.data.userData[0].password,
          ethAddress: res.data.userData[0].eth_account,
          admin: res.data.userData[0].admin
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

  changePassword = async () => {
    let oldPw = document.getElementById("oldPw").value;
    let newPw1 = document.getElementById("newPw1").value;
    let newPw2 = document.getElementById("newPw2").value;
    this.setState({ oldPw: "", newPw1: "", newPw2: "", dimmer: true });

    if (newPw1 !== newPw2) {
      alert("Your new passwords didn't match, please try again");
      this.setState({ dimmer: false });
      location.reload();
    } else {
      let result = await axios.post(window.location.origin + "/changeData", {
        type: "pw",
        username: this.state.username,
        oldPw: oldPw,
        newPw: newPw1,
        userId: this.state.id
      });
      if (result.data.success) {
        alert("Your password has been changed");
      } else {
        alert('You entered an incorrect "old" password, please try again');
      }
      this.setState({ dimmer: false });
      location.reload();
    }
  };

  changeEmail = async () => {
    let newEmail = document.getElementById("newEmail").value;
    this.setState({ newEmail: "", dimmer: true });

    let result = await axios.post(window.location.origin + "/changeData", {
      type: "email",
      email: newEmail,
      userId: this.state.id
    });
    if (result.data.success) {
      alert("Your email has been changed");
    } else {
      alert("Something went wrong, please try again");
    }
    location.reload();
  };

  render() {
    //etherscan link builder
    const etherscanAddress =
      "https://etherscan.io/address/" + this.state.ethAddress;

    return (
      <Layout>
        <Dimmer inverted active={this.state.dimmer}>
          <Loader>Please wait, do not refresh or leave the page</Loader>
        </Dimmer>
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
                  src="../static/icon.png"
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
            <Segment style={{ width: "60%", margin: "auto", marginTop: "5%" }}>
              <Header
                size="medium"
                style={{
                  marginBottom: "30px",
                  textAlign: "center",
                  color: "#7a7a52"
                }}
              >
                Change your password
              </Header>
              <Form onSubmit={this.changePassword}>
                <Form.Group>
                  <Form.Input
                    id="oldPw"
                    type="password"
                    control="input"
                    label="Old Password"
                    placeholder="Enter your old password here"
                    width={16}
                    required
                    value={this.state.oldPw}
                    onChange={e => this.setState({ oldPw: e.target.value })}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Input
                    id="newPw1"
                    type="password"
                    control="input"
                    label="New Password"
                    placeholder="Enter your new password here"
                    width={8}
                    required
                    value={this.state.newPw1}
                    onChange={e => this.setState({ newPw1: e.target.value })}
                  />
                  <Form.Input
                    id="newPw2"
                    type="password"
                    control="input"
                    label="Confirm New Password"
                    placeholder="Enter your new password again"
                    width={8}
                    required
                    value={this.state.newPw2}
                    onChange={e => this.setState({ newPw2: e.target.value })}
                  />
                </Form.Group>
                <Container textAlign="center">
                  <Button
                    key="ChangePwBtn"
                    basic
                    style={{
                      maxWidth: "40%",
                      border: "1px solid #7a7a52"
                    }}
                  >
                    <span key="changePwBtnContent" style={{ color: "#adad85" }}>
                      Change Password
                    </span>
                  </Button>
                </Container>
              </Form>
            </Segment>
            <Segment style={{ width: "60%", margin: "auto", marginTop: "5%" }}>
              <Header
                size="medium"
                style={{
                  marginBottom: "30px",
                  textAlign: "center",
                  color: "#7a7a52"
                }}
              >
                Change your email address
              </Header>
              <Form onSubmit={this.changeEmail}>
                <Form.Group>
                  <Form.Input
                    id="newEmail"
                    control="input"
                    type="email"
                    label="New Email"
                    placeholder="Enter your new email address here"
                    width={16}
                    required
                    value={this.state.newEmail}
                    onChange={e => this.setState({ newEmail: e.target.value })}
                  />
                </Form.Group>
                <Container textAlign="center">
                  <Button
                    key="ChangePwBtn"
                    basic
                    style={{
                      maxWidth: "40%",
                      border: "1px solid #7a7a52"
                    }}
                  >
                    <span key="changePwBtnContent" style={{ color: "#adad85" }}>
                      Change Email
                    </span>
                  </Button>
                </Container>
              </Form>
            </Segment>
          </Container>
        </div>
      </Layout>
    );
  }
}
export default ProfileBody;
