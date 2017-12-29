import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import App from './App.js';
import SearchScreen from './SearchScreen.js';



class Routes extends Component {
  render () {
    return (
      <Router basename='/'>
        <Switch>
          <Route exact path='/' component={App}/>
          <Route exact path='/search' component={SearchScreen}/>
        </Switch>
      </Router>
    )
  }
}
export default Routes