import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from './Table';
import HomeNav from './HomeNav';
import Roster from './Roster';
import { Route, Switch } from 'react-router-dom';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      searchfield: '',
      roster: []
    }
  }


// componentDidMount(){
  
// }
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
  addPlayer = (name, roster) => {
    console.log(name)
    fetch('http://localhost:9000/addPlayer', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        addPlayer: name,
        roster: roster
      })
    })
      .then(response => response.json())
      .then(res => {
        this.setState({ roster: res });
      });
  }

  dropPlayer = (name, roster) => {
    fetch('http://localhost:9000/dropPlayer', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        addPlayer: name,
        roster: roster
      })
    })
      .then(response => response.json())
      .then(res => {
        this.setState({ roster: res });
      });
  }


  render() {
    return (
      <div>
        <Switch>
                <Route path="/"  render={props =>
                <div>
                <HomeNav />
                <Table addPlayer={this.addPlayer} roster={this.state.roster}/>
                </div> }exact />
                <Route path="/team" render={props =>
                <div>
                <HomeNav />
                <Roster roster={this.state.roster} dropPlayer={this.dropPlayer}/>
                </div> } />
                
                <Route component={Error} />
            </Switch>
        
            
        {/* <button onClick={() => this.sendMsg()} type="button" class="btn btn-primary">Click to send "Hi" to server</button> */}
        
      </div>
      
    );
  }
}

export default App;

