import React, { Component } from 'react';
import BusinessCard from './components/BusinessCard'
import KelpLogo from './images/kelp_logo_face.png';
import KelpButton from './components/KelpButton'
import './App.css';

class SearchScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      businessesData: {},
      dataLoaded: false,
      find: 'food',
      where: '77009',
      lastSearchQuery: null,
      lastButtonPressed: null
    }
  }
  
  componentWillMount = () => {
    if (typeof(this.props.location.state) == 'undefined') {
      this.setState({
        where: '77009'
      })
    }
    else {
      this.setState({
        where: this.props.location.state.where
      })
    }
  }

  componentDidMount = () => {
    fetch('http://localhost:3007/api/search', {method: 'POST', headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }, body: JSON.stringify({location: this.state.where})})
      .then((res)=> res.json())
      .then((resJson) => {
      this.setState({
        businessesData: resJson.hasOwnProperty('businesses') ? resJson : {businesses:[]},
        dataLoaded: true,
        lastSearchQuery: this.state.where
      });

      console.log(resJson)
    })
  }

  handleChange = (e, field) => {
    let obj = {}
    obj[field] = e.target.value
    this.setState(obj)
  }

  handleFilter = (e, field) => {
    var field = field || null
    
    fetch('http://localhost:3007/api/search', {method: 'POST', headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }, body: JSON.stringify({price:field, location: this.state.where})})
      .then((res)=> res.json())
      .then((resJson) => {
      this.setState({
        businessesData: resJson.hasOwnProperty('businesses') ? resJson : {businesses:[]},
        dataLoaded: true,
        lastButtonPressed: field,
        lastSearchQuery: this.state.where
      });

      console.log(resJson)
    })
  }
  
  renderPriceFilterButtons = () => {
    let arr = [['1','$'],['2','$$'],['3','$$$'],['4','$$$$']]
    return arr.map((item, i) => {
      return <button className={this.state.lastButtonPressed === item[0] ? 'buttonPressed' : ''} key={i} onClick={(event) => this.handleFilter(event,item[0])}>{item[1]}</button>
    })
  }

  renderBusiness = (start, finish) => {
    //    let arr = new Array(3).fill(true)
    //    
    //    return arr.map((x,i) => {
    //      return <BusinessCard key={i} imgSrc={KelpLogo}/>
    //    }) 
    if (!this.state.dataLoaded) {
      return false
    }
    //state.businessData is actually an object with more data. It has an array in .businesses
    return this.state.businessesData.businesses.map((biz,i) => {
      return <BusinessCard key={biz.id} bizData={biz} />
    })
  }

  render() {
    if (!this.state.dataLoaded) {
      return <div></div>
    }
    return (
      <div className="App">
        <header className="searchpage-header">
          <div className="container" style={{height:'100%'}}>
            <div className="row align-items-center" style={{height:'100%'}}>
              <div className="col-lg-12 justify-content-center">
                <img src={KelpLogo} className="searchpage-header-logo" alt="logo" />
                <input className='searchpage-header-search' value={this.state.find} placeholder='What do you even want?' onChange={(event)=>this.handleChange(event, 'find')} disabled></input>
                <input className='searchpage-header-search' value={this.state.where} placeholder='Type in your zip code' onChange={(event)=>this.handleChange(event, 'where')}></input>
                <KelpButton onClick={this.handleFilter}/>
              </div>
            </div>
          </div>
        </header>
        <div className="searchpage-results-header">
          <div className="container">
            <div className="row">
              <div className="col-lg-12" style={{fontSize:'30px'}}>Showing <span className='wdyw'>{this.state.find.toUpperCase()}</span> in <span className='wdywzip'>{this.state.lastSearchQuery}</span></div>
            </div>
            <div className="row" style={{marginTop:'20px'}}>
              <div className="col-lg-12">
                <div className='searchpage-results-price-buttons'>
                  {this.renderPriceFilterButtons()}
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
                  {this.renderBusiness()}
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

export default SearchScreen;
