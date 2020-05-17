import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

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
    fetch("http://localhost:9000/stats", {
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
                    <th scope="col">Player Rtg</th>
                    <th scope="col">Fantasy Avg</th>
                    <th scope="col">Total Fantasy Pts (2018)</th>
                    <th scope="col">Career High Fantasy Pts</th>
                    <th scope="col">Career Low Fantasy Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {

                    searchPlayers.map(idx => {
                      return (
                        <tr>
                          <th scope="row">{idx['name']}</th>
                          <td>{idx['pos']} </td>
                          <td>{idx['prtg']}</td>
                          <td>{idx['fantasyScore']}</td>
                          <td>{idx['fantasytotal']}</td>
                          <td>{idx['high']}</td>
                          <td>{idx['low']}</td>
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

export default Table;