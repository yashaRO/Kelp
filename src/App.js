import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import MainHeader from './components/MainHeader'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      find: '',
      where: '',
      relocate: false
    }
  }

  handleChange = (e, field) => {
    let obj = {}
    obj[field] = e.target.value
    this.setState(obj)
  } 
  
  handleSearch = () => {
    this.setState({
      relocate: true
    })
  }
  
  render() {
    if (this.state.relocate) {
      return <Redirect push to={{pathname:'/search', state:{find: this.state.find, where:this.state.where}}} />
    }
    return (
      <div className="App">
        <MainHeader class='frontpage-header' find={this.state.find} where={this.state.where} onClick={this.handleSearch} onChange={this.handleChange}/>
      </div>
    );
  }
}

export default App;


//<div className="container">
//          <div className="row">
//            {this.renderBusinesses()}
//          </div>
//          <div className="row">
//            {this.renderBusinesses()}
//          </div>
//        </div>