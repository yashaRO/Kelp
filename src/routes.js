import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import App from './App.js';
import SearchScreen from './SearchScreen.js';
import Business from './Business.js';


class Routes extends Component {
  render () {
    return (
      <Router basename='/'>
        <Switch>
          <Route exact path='/' component={App}/>
          <Route exact path='/search' component={SearchScreen}/>
          <Route exact path='/business/:id' component={Business}/>
          <Route component={NoMatch}/>
        </Switch>
      </Router>
    )
  }
}

class NoMatch extends Component {
  render () {
    return (
      <div>No Match</div>
    )
  }
}
export default Routes