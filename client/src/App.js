import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from './Table';
import { Container, Row, Col, Button } from 'react-bootstrap';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      searchfield: ''
    }
  }



  // sendMsg = () => {
  //   fetch("http://localhost:9000/client", {
  //     method: 'get',
  //     headers: { 'Content-Type': 'application/json' }
  //   })
  //     .then(response => response.json())
  //     .then(res => {
  //       console.log(res.msg);
  //       this.setState({ players: res });
  //     });
  // }
  render() {
    return (
      <div>
        <Container fluid="true">
          <Row>
            <Col className="bg-white" lg={{ span: 8, offset: 2 }} md={{ span: 10, offset: 1 }} sm={{ span: 12, offset: 0 }}>
              <Table/>
            </Col>
          </Row>
        </Container>
        {/* <button onClick={() => this.sendMsg()} type="button" class="btn btn-primary">Click to send "Hi" to server</button> */}
      </div>
    );
  }
}

export default App;

