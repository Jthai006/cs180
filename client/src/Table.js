import React from 'react';


class Table extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            players: [],
            sortcat: [],
            filtercat: false,
            searchfield: ''
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
    
      onCatChange = (event) => {
        this.setState({ searchCat: event.target.value })
      }

      onPlayerChange = (event) => {
        this.setState({ searchfield: event.target.value })
      }
    
      onSubmitCat = () => {
        console.log('yeet')
        fetch('http://localhost:9000/searchCat', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                searchCat: this.state.searchCat
            })
        })
            .then(response => response.json())
            .then(res => {
                console.log(res.msg);
                this.setState({ players: res });
            });
    }

    render(){
        const searchPlayers = this.state.players.filter(player => {
            return player.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })
        return(
            <div>
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
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown button
                </button>
                <div class="dropdown-menu">
                    <a class="dropdown-item" href='www.google.com'>Position</a>
                    <a class="dropdown-item" >Games</a>
                    <a class="dropdown-item" >Field Goal Percentage</a>
                    <a class="dropdown-item" >3 Pointers Made</a>
                    <a class="dropdown-item" >3 Point Percentage</a>
                    <a class="dropdown-item" >2 Point Percentage</a>
                    <a class="dropdown-item" >Free Throw Percentage</a>
                    <a class="dropdown-item" >Assists</a>
                    <a class="dropdown-item" >Steals</a>
                    <a class="dropdown-item" >Blocks</a>
                    <a class="dropdown-item" >Points</a>
                    <a class="dropdown-item" >Rebounds</a>
                    <a class="dropdown-item" >None</a>
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
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
        );
    }
}

export default Table;