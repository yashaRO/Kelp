import React, { Component } from 'react';
import firebase from 'firebase'
import { Redirect } from 'react-router-dom';
import axios from 'axios'
import MainHeader from './components/MainHeader'
import CardList from './components/CardList'
import StaticGMap from './components/StaticGMap'
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
  
  renderRadios = (amount) => {
    let arr = new Array(amount).fill(true)
    return arr.map((radio, i) => {
      let j = ++i
      return (
        <div className="radio" key={i}>
          <label>
            <input className='review-radio' type="radio" value={'kelp-rating-' + j} checked={this.state.kelpRating === ("kelp-rating-" + j)} onChange={(e) => this.setState({ kelpRating: e.target.value })} required/>
            {j}
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

  render() {

    if (this.state.err) {
      return <Redirect to ='/search' />
    }

    if (!this.state.dataLoaded) {
      return <div></div>
    }

    return (
      <div className="App">
        <MainHeader class='searchpage-header' find={this.state.find} where={this.state.where} onClick={this.handleFilter} onChange={this.handleChange} />
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
                <CardList theadData={['Days','Hours']} tbodyData={this.state.businessData.hours} />
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
                <StaticGMap coordinates={this.state.businessData.coordinates} />
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