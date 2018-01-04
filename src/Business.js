import React, { Component } from 'react';
import firebase from 'firebase'
import { Redirect } from 'react-router-dom';
import axios from 'axios'
import KelpLogo from './images/kelp_logo_face.png';
import SearchButton from './images/cutlery.png'
import './App.css';


class Business extends Component {
  constructor() {
    super()
    this.state = {
      businessData: {},
      dataLoaded: false,
      kelpRating: null,
      reviewComment: '',
      recentReviews: [],
      find: '',
      where: '',
      err: false
    }
  }

  componentDidMount = () => {
    let { params } = this.props.match;
    //  //fetch acts like a complete POS with this route if param is 'search'. Had to use axios
    axios.get('/api/business/' + params.id)
      .then((res) => {
      this.setState({
        businessData: res.data.id === params.id ? res.data : {},
        dataLoaded: true
      });
      console.log(res.data)
    }).catch((err) => this.setState({err: true}))

    let db = firebase.database()
    db.ref(params.id + '/reviews').once('value', (ss) => {
      let arr = []
      ss.forEach((css) => {
        if (arr.length >= 2) {return false}
        arr.push(css.val())
      })
      this.setState({
        recentReviews: arr
      })
    })

  }
  // converts military time
  _parseTime = (x) => {
    let converted = '';
    let mod = parseInt(x, 10) < 1200 ? ' am' : ' pm';
    let arr = x.match(/\d{2}/g);
    if (arr.length < 2) {
      return false;
    }
    //if hour is 0 then change to 12, if hour is 1200-2300 subtract 12.
    converted += !parseInt(arr[0], 10)
      ? '12:'
    : parseInt(arr[0], 10) >= 13 
      ? parseInt(arr[0], 10) - 12 + ':'
    : parseInt(arr[0], 10) + ':';

    converted += parseInt(arr[1], 10) < 10 ? '0' + parseInt(arr[1], 10) : parseInt(arr[1], 10);
    return converted + mod;
  }

  //runs batch parseTime on schedule/hours
  _batchParseTime = (batch) => {
    let arr = new Array(7).fill(false)
    batch.forEach((obj)=> {
      if (arr[obj.day]) {
        arr[obj.day].push(this._parseTime(obj.start) + ' - ' + this._parseTime(obj.end))
        return true;
      }
      arr[obj.day] = [this._parseTime(obj.start) + ' - ' +  this._parseTime(obj.end)]
      return true
    })
    return arr
  }

  handleChange = (e, field) => {
    let obj = {}
    obj[field] = e.target.value
    this.setState(obj)
  }

  handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!this.state.kelpRating) {return false}

    let { params } = this.props.match;
    let db = firebase.database()
    db.ref(params.id +'/reviews').push({
      rating: this.state.kelpRating,
      review: this.state.reviewComment
    })
  }

  renderSchedule = () => {
    let { hours } = this.state.businessData
    let today = new Date().getDay()
    let dOw = ['Sun','Mon','Tues','Wed','Thur','Fri','Sat']
    let dOWHours = this._batchParseTime(hours[0].open)
    let isOpen = hours[0].is_open_now ? 'isOpen' : 'isClosed'
    return dOw.map((day,i) => {
      return (
        <tr className={ i === today ? isOpen : ''} key={i} style={{}}>
          <th>{day}</th>
          <td>{dOWHours[i] || 'Closed'}</td>
        </tr>
      )
    })
  }
  renderRadios = (amount) => {
    let arr = new Array(amount).fill(true)
    return arr.map((radio, i) => {
      let j = ++i
      return (
        <div className="radio">
          <label>
            <input className='review-radio' type="radio" value={'kelp-rating-' + j} checked={this.state.kelpRating === ("kelp-rating-" + j)} onChange={(e) => this.setState({ kelpRating: e.target.value })} required/>
            {i + 1}
          </label>
        </div>
      )
    })
  }

  renderReviews = () => {
    return this.state.recentReviews.map((review, i) => {
      return <li key={i} className="list-group-item">{review.review}</li>
    })
  }

  renderImages = () => {
    let { photos } = this.state.businessData
    return photos.map((image, i) => {
      return (
        <div className='col' key={i}>
          <img className='bizPageHeaderImg' src={image} />
        </div>
      )
    })
  }

  renderMap = () => {
    let { coordinates } = this.state.businessData
    let center = [coordinates.latitude, coordinates.longitude].toString() // [lat, long]
    let zoom = 15
    let size = '250x250'
    let color = 'red'
    let apiKey = 'AIzaSyByynRDUc_o6syfblD66jQlnEzIB8dRWTM'
    let url = `https://maps.googleapis.com/maps/api/staticmap?center=${center}&zoom=${zoom}&size=${size}&maptype=roadmap&markers=color:${color}%7C${center}&key=${apiKey}`

    return <img className="card-img-top" src={url} alt="Card image cap"/>
  }

  render() {

    if (this.state.err) {
      return <Redirect to ='/search' />
    }

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
                <input className='searchpage-header-search' value={this.state.where} placeholder='Type in your zip code' onChange={(event)=>this.handleChange(event, 'where')} disabled></input>
                <button className='searchpage-header-search-button' style={{backgroundColor:'green'}}><img src={SearchButton} alt='Search'/></button>
                <div style={{display:'none'}}>Icons made by <a href="http://www.freepik.com" rel='noopener noreferrer' title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" rel='noopener noreferrer'title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" rel='noopener noreferrer' title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
              </div>
            </div>
          </div>
        </header>
        <div className="bizPage-header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <h1>{this.state.businessData.name}</h1>
              </div>
            </div>
            <div className="row align-items-center">
              {this.renderImages()}
            </div>
          </div>
        </div>
        <div className="container" style={{margin:'10px auto'}}>
          <div className='row justify-content-center'>
            <div className="col-lg-3">
              <div className="card" style={{width: "100%"}}>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Day</th>
                      <th>Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.renderSchedule()}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-lg-3" style={{}}>
              <div className="card" style={{width: "100%"}}>
                <div className="card-header">
                  Latest Kelp Reviews
                </div>
                <ul className="list-group list-group-flush">
                  {this.renderReviews()}
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="card" style={{width: "100%"}}>
                {this.renderMap()}
                <div className="card-body">
                  <h6 className="card-title" style={{fontWeight:'bold', margin:'0'}}>{this.state.businessData.location.address1}</h6>
                </div>
              </div>
            </div>
          </div>
          <div className='leave-review-section row justify-content-center'>
            <form className='form-group' onSubmit={(e) => this.handleReviewSubmit(e)}>
              <div className="row justify-content-center">
                {this.renderRadios(5)}
              </div>
              <div className="row justify-content-center">
                <textarea className='review-textarea' onChange={(e)=> this.handleChange(e, 'reviewComment')} value={this.state.reviewComment} required/>
              </div>
              <div className="row justify-content-center">
                <input type='submit' value='submit' style={{borderColor:'limegreen',backgroundColor: 'limegreen', borderRadius:'5px'}}/>
              </div>              
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Business;