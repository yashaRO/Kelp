import React, { Component } from 'react';
import KelpLogo from './images/Kelp_Logo.png';
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
        <div className="frontpage-card-gallery">
          <div className="card" style={{width: '20rem'}}>
            <img className="card-img-top" src={KelpLogo} alt="Card image cap" />
            <div className="card-body">
              <h4 className="card-title">Card title</h4>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div><div className="card" style={{width: '20rem'}}>
          <img className="card-img-top" src={KelpLogo} alt="Card image cap" />
          <div className="card-body">
            <h4 className="card-title">Card title</h4>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
          </div><div className="card" style={{width: '20rem'}}>
          <img className="card-img-top" src={KelpLogo} alt="Card image cap" />
          <div className="card-body">
            <h4 className="card-title">Card title</h4>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
