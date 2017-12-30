import React, { Component } from 'react';
import BusinessCard from './components/BusinessCard'
import KelpLogo from './images/kelp_logo_face.png';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      find: '',
      where: ''
    }
  }

  ping = () => {
    fetch('http://localhost:3007/ping').then((response) => response.json()).then((resJson)=> console.log(resJson)).catch((err)=>console.log(err, 'Server offline'))
  }

  handleChange = (e, field) => {
    let obj = {}
    obj[field] = e.target.value
    this.setState(obj)
  }

  renderBusinesses = () => {
    let arr = new Array(3).fill(true)
    
    return arr.map((x,i) => {
      return <BusinessCard key={i} imgSrc={KelpLogo}/>
    })    
  }

  render() {
    return (
      <div className="App">
        <header className="frontpage-header">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 justify-content-center">
                <img src={KelpLogo} className="frontpage-header-logo" alt="logo" />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 justify-content-center">
                <input className='frontpage-header-search' value={this.state.find} placeholder='What do you even want?' onChange={(event)=>this.handleChange(event, 'find')}></input>
                <input className='frontpage-header-search' value={this.state.where} placeholder='Type in your zip code' onChange={(event)=>this.handleChange(event, 'where')}></input>
                <button>Ok</button>
              </div>
            </div> 
          </div>
        </header>
        <div className="container">
          <div className="row">
            {this.renderBusinesses()}
          </div>
          <div className="row">
            {this.renderBusinesses()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
