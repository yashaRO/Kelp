import React, { Component } from 'react';
import KelpLogo from './images/kelp_logo_face.png';
import SearchButton from './images/cutlery.png'
import './App.css';

class Business extends Component {
  constructor() {
    super()
    this.state = {
      businessData: {},
      dataLoaded: false,
      find: '',
      where: ''
    }
  }
  
  componentDidMount = () => {
    fetch('http://localhost:3007/business/' + this.props.match.params.id)
      .then((res)=> res.json())
      .then((resJson) => {
      this.setState({
        businessData: resJson.hasOwnProperty('businesses') ? resJson : {businesses:[]},
        dataLoaded: true
      });
      
      console.log(resJson)
    })
  }

  handleChange = (e, field) => {
    let obj = {}
    obj[field] = e.target.value
    this.setState(obj)
  }

  render() {
    if (!this.state.dataLoaded) {
      return <div></div>
    }
    return (
      <div className="App">
        <header className="searchpage-header">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 justify-content-center">
                <img src={KelpLogo} className="searchpage-header-logo" alt="logo" />
                <input className='searchpage-header-search' value={this.state.find} placeholder='What do you even want?' onChange={(event)=>this.handleChange(event, 'find')}></input>
                <input className='searchpage-header-search' value={this.state.where} placeholder='Type in your zip code' onChange={(event)=>this.handleChange(event, 'where')}></input>
                <button className='searchpage-header-search-button' style={{backgroundColor:'green'}}><img src={SearchButton} alt='Search'/></button>
                <div style={{display:'none'}}>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
              </div>
            </div>
          </div>
        </header>
        <div className="searchpage-results-header">
          <div className="container">
            <div className="row">
              <div className="col-lg-9">The Best Restaurants near blah blah</div>
              <div className="col-lg-3"> Showing Blah</div>
            </div>
            <div className="row">
              <div className="col-lg-12">Houston Tx > Restaurants</div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className='searchpage-results-price-buttons'>
                  <button>$</button>
                  <button>$$</button>
                  <button>$$$</button>
                  <button>$$$$</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className='row'>
            <div className="col-lg-12 col-sm-12">
              <div className="container">
               <div className="row">
                
                </div>
              </div>
            </div>
            <div className="d-lg-none d-sm-none">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Special title treatment</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Business;
