import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import BusinessCard from './components/BusinessCard'
import KelpButton from './components/KelpButton'
import KelpLogo from './images/kelp_logo_face.png';
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
        <header className="frontpage-header">
          <div className="container align-items-center">
            <div className="row">
              <div className="col-lg-12 justify-content-center">
                <img src={KelpLogo} className="frontpage-header-logo" alt="logo" />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 justify-content-center">
                <input className='frontpage-header-search' value={this.state.find} placeholder='What do you even want?' onChange={(event)=>this.handleChange(event, 'find')}></input>
                <input className='frontpage-header-search' value={this.state.where} placeholder='Type in your zip code' onChange={(event)=>this.handleChange(event, 'where')}></input>
                <KelpButton onClick={this.handleSearch}/>
              </div>
            </div> 
          </div>
        </header>
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