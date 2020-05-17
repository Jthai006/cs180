import React from 'react';
import { Container, Row, Col, Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      sortcat: [],
      filtercat: false,
      searchfield: '',
      addPlayer: ''
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


  onPlayerChange = (event) => {
    this.setState({ searchfield: event.target.value })
  }

  // onAdd = (event) => {
  //   this.setState({addPlayer: true})
  // }

  // onDrop = (event) => {
  //   this.setState({addPlayer: true})
  // }

  onCats = (cat) => {
    console.log('yeet')
    fetch('http://localhost:9000/searchCat', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        searchCat: cat
      })
    })
      .then(response => response.json())
      .then(res => {
        this.setState({ players: res });
      });
  }

  changePg = (type) => {
    fetch('http://localhost:9000/changePg', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: type
      })
    })
      .then(response => response.json())
      .then(res => {
        this.setState({ players: res });
      });
  }


  render() {
    const searchPlayers = this.state.players.filter(player => {
      return player.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
    })
    return (
      <div>
        <Container fluid="true">
          <Row>
            <Col className="bg-white" lg={{ span: 8, offset: 2 }} md={{ span: 10, offset: 1 }} sm={{ span: 12, offset: 0 }}>
              <div className='pa2'>
                <input
                  className='pa3 ba b--green bg-lightest-blue'
                  type='search'
                  placeholder='search player'
                  onChange={this.onPlayerChange}
                />
                <input
                  onClick={this.onSubmitCat}
                  className="b ph3 pv2 input-reset bg-black ba b--gray grow pointer f6 dib white"
                  type="submit"
                  value="Search" />
              </div>

              <div class="dropdown">
                <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Sort By Category
                </button>
                <div class="dropdown-menu">
                  {/* <a class="dropdown-item" onClick={() => this.onCats("pos")}>Position</a> */}
                  <a class="dropdown-item" onClick={() => this.onCats("games")}>Games</a>
                  <a class="dropdown-item" onClick={() => this.onCats("field%")}>Field Goal Percentage</a>
                  <a class="dropdown-item" onClick={() => this.onCats("3p")}>3 Pointers Per Game</a>
                  <a class="dropdown-item" onClick={() => this.onCats("3p%")}>3 Point Percentage</a>
                  <a class="dropdown-item" onClick={() => this.onCats("2p%")}>2 Point Percentage</a>
                  <a class="dropdown-item" onClick={() => this.onCats("ft%")}>Free Throw Percentage</a>
                  <a class="dropdown-item" onClick={() => this.onCats("asst")}>Assists</a>
                  <a class="dropdown-item" onClick={() => this.onCats("stl")}>Steals</a>
                  <a class="dropdown-item" onClick={() => this.onCats("blk")}>Blocks</a>
                  <a class="dropdown-item" onClick={() => this.onCats("pts")}>Points</a>
                  <a class="dropdown-item" onClick={() => this.onCats("reb")}>Rebounds</a>
                  <a class="dropdown-item" onClick={() => this.onCats("prtg")}>Player Rating</a>
                  <a class="dropdown-item" onClick={() => this.onCats("fantasyScore")}>Avg Fantasy Score</a>
                  <a class="dropdown-item" onClick={() => this.onCats("fantasytotal")}>Total Fantasy Pts</a>
                  <a class="dropdown-item" onClick={() => this.onCats("none")}>None</a>
                </div>
              </div>

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
                    <th scope="col">Total Fantasy Pts</th>
                    <th scope="col">Predicted All-Star</th>
                    <th scope="col">Add Player</th>
                  </tr>
                </thead>
                <tbody>
                  {

                    searchPlayers.map(idx => {
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
                          <td>{idx['star']}</td>
                          <td>
                            <Button onClick={() => this.props.addPlayer(idx['name'])}>+</Button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
              <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                  <li class="page-item disabled">
                    <Button class="page-link " onClick={() => this.changePg("prev")}>previous</Button>
                  </li>
                  <li class="page-item">
                    <Button class="page-link" onClick={() => this.changePg("next")}>next</Button>
                  </li>
                </ul>
              </nav>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Table;