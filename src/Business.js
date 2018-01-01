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
      kelpRating: '',
      find: '',
      where: ''
    }
  }

  componentDidMount = () => {
    let { params } = this.props.match;
    fetch('http://localhost:3007/business/' + params.id)
      .then((res)=> res.json())
      .then((resJson) => {
      this.setState({
        businessData: resJson.id === params.id ? resJson : {},
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
          <div className='row justify-content-center'>
            <div className="col-lg-3">
              <div className="card" style={{width: "100%"}}>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Cras justo odio</li>
                  <li className="list-group-item">Dapibus ac facilisis in</li>
                  <li className="list-group-item">Vestibulum at eros</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="card" style={{width: "100%"}}>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Cras justo odio</li>
                  <li className="list-group-item">Dapibus ac facilisis in</li>
                  <li className="list-group-item">Vestibulum at eros</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="card" style={{width: "100%"}}>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Cras justo odio</li>
                  <li className="list-group-item">Dapibus ac facilisis in</li>
                  <li className="list-group-item">Vestibulum at eros</li>
                </ul>
              </div>
            </div>
          </div>
          <div className='leave-review-section row justify-content-center'>
            <form onSubmit={this.handleReviewSubmit}>
              <div className="row justify-content-center">
                <input type="radio" value='kelp-rating-1' checked={this.state.kelpRating === "kelp-rating-1"} onChange={(e) => this.setState({ kelpRating: e.target.value })}/>
                <input type="radio" value='kelp-rating-2' checked={this.state.kelpRating === "kelp-rating-2"} onChange={(e) => this.setState({ kelpRating: e.target.value })}/>
                <input type="radio" value='kelp-rating-3' checked={this.state.kelpRating === "kelp-rating-3"} onChange={(e) => this.setState({ kelpRating: e.target.value })}/>
                <input type="radio" value='kelp-rating-4' checked={this.state.kelpRating === "kelp-rating-4"} onChange={(e) => this.setState({ kelpRating: e.target.value })}/>
                <input type="radio" value='kelp-rating-5' checked={this.state.kelpRating === "kelp-rating-5"} onChange={(e) => this.setState({ kelpRating: e.target.value })}/>
              </div>
              <div className="row justify-content-center">
                <input value={this.state.reviewComment} />
              </div>
              <div className="row justify-content-center">
                <input type='submit' value='submit' />
              </div>              
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Business;
