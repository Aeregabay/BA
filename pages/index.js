import React, { Component } from "react";
import SearchBar from "../components/SearchBar";
import { Container, Header, Button } from "semantic-ui-react";
import Layout from "../components/Layout";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container style={{ textAlign: "left" }}>
        <Layout>
          <Container
            style={{
              marginTop: "35px",
              marginBottom: "50px",
              textAlign: "left"
            }}
          >
            <Header as="h2" content="Welcome to my beautiful page" />
            <Button floated="right" content="doing nothing" color="blue" />
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
              sem. Nulla consequat massa quis enim. Donec pede justo, fringilla
              vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
              imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
              link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus
              elementum semper nisi. Aenean vulputate eleifend tellus. Aenean
              leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
              Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
              Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.
              Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur
              ullamcorper ultricies nisi.
            </p>
          </Container>
        </Layout>
      </Container>
    );
  }
}

export default App;
// ReactDOM.render(<App />, document.getElementById("app"));
