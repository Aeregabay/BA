import React, { Component } from "react";
import {
  Container,
  Header,
  Button,
  List,
  Modal,
  Grid
} from "semantic-ui-react";
import Layout from "../components/Layout";
import axios from "axios";

class admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      userId: "",
      username: "",
      ethAddress: "",
      kycKey: "",
      email: "",
      userModal: false
    };
  }

  async componentWillMount() {
    let result = await axios.post(window.location.origin + "/getUsers");

    if (result.data.success) {
      console.log("user retrieval successful");
      this.setState({ users: result.data.users });
    } else {
      console.error("user retrieval failed");
    }
  }

  displayUser(index) {
    this.setState({
      userId: this.state.users[index].id,
      username: this.state.users[index].username,
      ethAddress: this.state.users[index].eth_account,
      kycKey: this.state.users[index].kycKey,
      email: this.state.users[index].email,
      userModal: true
    });
  }

  renderUsers() {
    let userList = [];
    if (!this.state.users) {
      setTimeout(this.renderusers, 10);
    } else {
      for (let i = 0; i < this.state.users.length; i++) {
        let username = this.state.users[i].username;
        userList.push(
          <List.Item as="a" onClick={() => this.displayUser(i)}>
            {username}
          </List.Item>
        );
      }
    }
    return userList;
  }

  render() {
    return (
      <Layout>
        <Header
          size="huge"
          style={{
            marginBottom: "30px",
            textAlign: "center",
            color: "#7a7a52"
          }}
        >
          This is the Admin Page
        </Header>
        <Header
          size="large"
          style={{
            marginBottom: "30px",
            marginLeft: "20%",
            textAlign: "left",
            color: "#7a7a52"
          }}
        >
          Userlist
        </Header>
        <Container
          style={{
            textAlign: "left",
            width: "60%",
            margin: "auto",
            marginBottom: "20px"
          }}
        >
          <List link>{this.renderUsers()}</List>
        </Container>
        <Modal
          key="userModal"
          dimmer="blurring"
          open={this.state.userModal}
          onClose={() => this.setState({ userModal: false })}
          style={{ textAlign: "center" }}
        >
          <Modal.Header>
            <Header size="huge" style={{ color: "black" }}>
              {this.state.username}
            </Header>
          </Modal.Header>
          <Modal.Content>
            <Modal.Description
              style={{ margin: "auto", textAlign: "left", marginLeft: "1%" }}
            >
              <p>UserId: {this.state.userId}</p>
              <p>Email: {this.state.email}</p>
              <p>Ethereum Address: {this.state.ethAddress}</p>
              <p>KYC Key: {this.state.kycKey}</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            {/* <Button
              key="userModalCancel"
              negative
              icon="remove"
              labelPosition="right"
              content="Cancel"
              onClick={() => this.setState({ userModal: false })}
              style={{ float: "left" }}
            /> */}
            <Button
              key="userModalOkay"
              positive
              icon="checkmark"
              labelPosition="right"
              content="Okay"
              onClick={() => this.setState({ userModal: false })}
            />
          </Modal.Actions>
        </Modal>
      </Layout>
    );
  }
}

export default admin;
