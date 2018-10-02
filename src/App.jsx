import React, { Component } from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import Matches from './containers/Matches/Matches';
import MatchDetail from './containers/Matches/MatchDetail/MatchDetail';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/deneme" component={MatchDetail} />
          <Route path="/" component={Matches} />
        </Switch>
      </div>
    );
  }
}

export default App;
