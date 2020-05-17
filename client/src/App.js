import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from './Table';
import HomeNav from './HomeNav';
import Roster from './Roster';
import Compare from './Compare';
import Stats from './Stats';
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


componentDidMount(){
  this.setState({roster: []});
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
  addPlayer = (name) => {
    console.log(name)
    fetch('http://localhost:9000/addPlayer', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        addPlayer: name
      })
    })
      .then(response => response.json())
      .then(res => {
        console.log(res)
        this.setState({ roster: res });
      });
  }

  dropPlayer = (name) => {
    fetch('http://localhost:9000/dropPlayer', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        addPlayer: name
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
                <Table addPlayer={this.addPlayer}/>
                </div> }exact />
                <Route path="/team" render={props =>
                <div>
                <HomeNav />
                <Roster dropPlayer={this.dropPlayer} roster={this.state.roster}/>
                </div> } />
                <Route path="/compare" render={props =>
                <div>
                <HomeNav />
                <Compare/>
                </div> } />
                <Route path="/stats" render={props =>
                <div>
                <HomeNav />
                <Stats></Stats>
                </div> } />
                
                <Route component={Error} />
            </Switch>
        
            
        {/* <button onClick={() => this.sendMsg()} type="button" class="btn btn-primary">Click to send "Hi" to server</button> */}
        
      </div>
      
    );
  }
}

export default App;

