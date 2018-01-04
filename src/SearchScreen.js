import React, { Component } from 'react';
import BusinessCard from './components/BusinessCard'
import KelpButton from './components/KelpButton'
import MainHeader from './components/MainHeader'
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
    var where, find;
    if (typeof(this.props.location.state) == 'undefined') {
      where = '77009'
      find= 'food'
      this.setState({
        where: '77009',
        find: 'food'
      })
    } else {
      if (typeof(this.props.location.state.where) == 'undefined') {
        this.setState({where:'77009'})
      }
      if (typeof(this.props.location.state.find) == 'undefined') {
        this.setState({find:'food'})
      }
    }

  }

  componentDidMount = () => {
    fetch('/api/search', {method: 'POST', headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }, body: JSON.stringify({term: this.state.find, location: this.state.where})})
      .then((res)=> res.json())
      .then((resJson) => {
      this.setState({
        businessesData: resJson.hasOwnProperty('businesses') ? resJson : {businesses:[]},
        dataLoaded: true,
        lastSearchQuery: [this.state.find, this.state.where]
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

    fetch('/api/search', {method: 'POST', headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }, body: JSON.stringify({term: this.state.find, price:field, location: this.state.where})})
      .then((res)=> res.json())
      .then((resJson) => {
      this.setState({
        businessesData: resJson.hasOwnProperty('businesses') ? resJson : {businesses:[]},
        dataLoaded: true,
        lastButtonPressed: field,
        lastSearchQuery: [this.state.find, this.state.where]
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
        <MainHeader class='searchpage-header' find={this.state.find} where={this.state.where} onClick={this.handleFilter} onChange={this.handleChange}/>
        <div className="searchpage-results-header">
          <div className="container">
            <div className="row">
              <div className="col-lg-12" style={{fontSize:'30px'}}>Showing <span className='wdyw'>{this.state.lastSearchQuery[0].toUpperCase()}</span> in <span className='wdywzip'>{this.state.lastSearchQuery[1]}</span></div>
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
          </div>
        </div>
      </div>
    );
  }
}

export default SearchScreen;
