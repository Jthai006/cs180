import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

class Roster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchfield: '',
      roster1: []
    }
  }

  componentDidMount() {

    fetch("http://localhost:9000/getRoster", {
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(res => {
        console.log(res);
        this.setState({ roster1: res });
      });
    console.log(this.state.roster1);
  }
  // onPlayerChange = (event) => {
  //   this.setState({ searchfield: event.target.value })
  // }

  render() {
    // const searchPlayers = this.props.roster.filter(player => {
    //   return player.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
    // })
    return (
      <div>
        <Container fluid="true">
          <Row>
            <Col className="bg-white" lg={{ span: 8, offset: 2 }} md={{ span: 10, offset: 1 }} sm={{ span: 12, offset: 0 }}>
              <h1>My Team</h1>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Player</th>
                    <th scope="col">Pos</th>
                    <th scope="col">Games</th>
                    <th scope="col">Field%</th>
                    <th scope="col">3p</th>
                    <th scope="col">3p%</th>
                    <th scope="col">2p%</th>
                    <th scope="col">Ft%</th>
                    <th scope="col">Ast</th>
                    <th scope="col">Stl</th>
                    <th scope="col">Blk</th>
                    <th scope="col">Pts</th>
                    <th scope="col">Reb</th>
                    <th scope="col">Player Rtg</th>
                    <th scope="col">Fantasy Avg</th>
                    <th scope="col">Tot Fantasy Pts</th>
                    <th scope="col">Drop Player</th>
                  </tr>
                </thead>
                <tbody>
                  {

                    this.state.roster1.map(idx => {
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
                          <td>{idx['prtg']}</td>
                          <td>{idx['fantasyScore']}</td>
                          <td>{idx['fantasytotal']}</td>
                          <td><Button onClick={() => this.props.dropPlayer(idx['name'])}>-</Button></td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Roster;