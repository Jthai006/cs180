import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: []
    }
  }


  componentDidMount() {
    fetch("http://localhost:9000/", {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(res => {
        console.log(res);
        this.setState({ players: res });
      });
  }
  sendMsg = () => {
    fetch("http://localhost:9000/client", {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(res => {
        console.log(res.msg);
        this.setState({ players: res });
      });
  }
  render() {
    return (
      <div>
        {/* <Container fluid="true">
          <Row>
            <Col className="bg-white" lg={{ span: 8, offset: 2 }} md={{ span: 10, offset: 1 }} sm={{ span: 12, offset: 0 }}>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">player</th>
                    <th scope="col">pos</th>
                    <th scope="col">games</th>
                    <th scope="col">field%</th>
                    <th scope="col">3p</th>
                    <th scope="col">3p%</th>
                    <th scope="col">2p%</th>
                    <th scope="col">ft%</th>
                    <th scope="col">asst</th>
                    <th scope="col">stl</th>
                    <th scope="col">blk</th>
                    <th scope="col">pts</th>
                    <th scope="col">reb</th>
                  </tr>
                </thead>
                <tbody>
                  {

                    this.state.players.map(idx => {
                      return (
                        <tr>
                          <th scope="row">{idx['name']}</th>
                          <td>{idx['pos']} </td>
                          <td>{idx['games']}</td>
                          <td>{idx['field%']}</td>
                          <td>{idx['3p']}</td>
                          <td>{idx['3p%']}</td>
                          <td>{idx['2p%']}</td>
                          <td>{idx['ft%']}</td>
                          <td>{idx['asst']}</td>
                          <td>{idx['stl']}</td>
                          <td>{idx['blk']}</td>
                          <td>{idx['pts']}</td>
                          <td>{idx['reb']}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>

            </Col>
          </Row>
        </Container> */}
        <button onClick={() => this.sendMsg()} type="button" class="btn btn-primary">Click to send "Hi" to server</button>
      </div>
    );
  }
}

export default App;

