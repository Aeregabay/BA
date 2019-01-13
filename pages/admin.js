import React, { Component } from "react";
import {
  Container,
  Header,
  Button,
  List,
  Modal,
  Grid,
  Icon
} from "semantic-ui-react";
import Layout from "../components/Layout";
import axios from "axios";
import Web3 from "web3";
let web3 = new Web3(Web3.givenProvider || "ws://localhost:3000");
const adminAddress = "0xa9C3f40905a01240F63AA2b27375b5D43Dcd64E5";
import Router from "../routes";

class admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      reports: [],
      userId: "",
      username: "",
      ethAddress: "",
      kycKey: "",
      email: "",
      userModal: false,
      reportModal: false,
      reporter: "",
      reportContent: "",
      objectId: "",
      reportId: ""
    };
  }

  async componentWillMount() {
    let result = await axios.post(window.location.origin + "/getUsers");
    let reports = await axios.post(window.location.origin + "/getReports");

    if (result.data.success) {
      console.log("user retrieval successful");
      this.setState({ users: result.data.users });
    } else {
      console.error(result);
      console.error("user retrieval failed");
    }

    if (reports.data.success) {
      console.log("report retrieval successful");
      this.setState({ reports: reports.data.data });
    } else {
      console.error(reports);
      console.error("report retrieval failed");
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
  displayReport(index) {
    this.setState({
      reporter: this.state.reports[index].reporter,
      objectId: this.state.reports[index].objectId,
      reportContent: this.state.reports[index].content,
      reportId: this.state.reports[index].id,
      reportModal: true
    });
  }

  renderUsers() {
    let userList = [];
    if (!this.state.users) {
      setTimeout(renderUsers(), 10);
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

  renderReports() {
    let reportList = [];
    if (!this.state.reports) {
      setTimeout(renderReports(), 10);
    } else {
      for (let i = 0; i < this.state.reports.length; i++) {
        reportList.push(
          <List.Item as="a" onClick={() => this.displayReport(i)}>
            # {i + 1}
            <Icon
              name="remove"
              color="red"
              fitted
              link
              style={{ float: "right" }}
              onClick={() => {
                this.deleteReport(i);
              }}
            />
          </List.Item>
        );
      }
    }
    return reportList;
  }

  deleteReport = async index => {
    let result = await axios.post(window.location.origin + "/deleteReport", {
      reportId: this.state.reports[index].id
    });

    if (result.data.success) {
      console.log(
        "Report with id " + this.state.reports[index].id + " has been deleted"
      );
    } else {
      console.error(result);
    }
    location.reload();
  };

  rewardReporter = async reporter => {
    let reporterAddress;
    for (let i = 0; i < this.state.users.length; i++) {
      if (this.state.users[i].username === reporter) {
        reporterAddress = this.state.users[i].eth_account;
        break;
      }
    }
    if (reporterAddress) {
      web3.eth.sendTransaction(
        {
          to: reporterAddress,
          from: adminAddress,
          value: web3.utils.toWei("0.03"),
          gas: 250000,
          gasPrice: "5000000000"
        },
        (err, res) => {
          if (!err) {
            alert("Reporter has been rewarded");
            this.setState({ reportModal: false });
          } else {
            alert("Something went wrong, try again");
          }
        }
      );
    }
  };

  goToSeller = () => {
    this.setState({ userModal: false });
    Router.pushRoute("user", { id: this.state.userId });
  };

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
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
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
            </Grid.Column>
            <Grid.Column width={8}>
              <Header
                size="large"
                style={{
                  marginBottom: "30px",
                  marginLeft: "20%",
                  textAlign: "left",
                  color: "#7a7a52"
                }}
              >
                Reports
              </Header>
              <Container
                style={{
                  textAlign: "left",
                  width: "60%",
                  margin: "auto",
                  marginBottom: "20px"
                }}
              >
                <List link>{this.renderReports()}</List>
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
            <Button
              key="userModalOkay"
              positive
              icon="checkmark"
              labelPosition="right"
              content="Okay"
              onClick={() => this.setState({ userModal: false })}
            />
            <Button
              key="goToUser"
              positive
              color="linkedin"
              floated="left"
              icon="arrow up"
              labelPosition="right"
              content="Go to profile"
              onClick={this.goToSeller}
            />
          </Modal.Actions>
        </Modal>
        <Modal
          key="reportModal"
          dimmer="blurring"
          open={this.state.reportModal}
          onClose={() => this.setState({ reportModal: false })}
          style={{ textAlign: "center" }}
        >
          <Modal.Header>
            <Header size="huge" style={{ color: "black" }}>
              Report # {this.state.reportId}
            </Header>
          </Modal.Header>
          <Modal.Content>
            <Modal.Description
              style={{ margin: "auto", textAlign: "left", marginLeft: "1%" }}
            >
              <p>Reporter: {this.state.reporter}</p>
              <p>Concerning Object: {this.state.objectId}</p>
              <p>Content: {this.state.reportContent}</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              key="reportModalOkay"
              positive
              icon="checkmark"
              labelPosition="right"
              content="Close"
              onClick={() => this.setState({ reportModal: false })}
            />
            <Button
              key="reportModalOkay"
              color="linkedin"
              floated="left"
              icon="dollar"
              labelPosition="right"
              content="Reward Reporter"
              onClick={() => this.rewardReporter(this.state.reporter)}
            />
          </Modal.Actions>
        </Modal>
      </Layout>
    );
  }
}

export default admin;
