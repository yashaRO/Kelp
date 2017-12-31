import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BusinessCard extends Component {
  render() {
    let { bizData } = this.props
    let id = bizData.id
    let imgSrc = bizData.image_url || '';
    let title = bizData.name || "No Title"
    let address1 = bizData.location.display_address[0] || "No text"
    let address2 = bizData.location.display_address[1] || "No text"
    let phone = bizData.display_phone || "No Number"
    let price = bizData.price || 'N/A';
    let foodType = bizData.categories[0].title || 'N/A';
    let reviews = bizData.review_count ? bizData.review_count + ' reviews' : 'No reviews'


    return (

      <div className='col-lg-3'>
        <Link to={'/business/' + id}>
          <div className="card card-kelp" style={{}}>
            <img className="card-img-top card-image-top-kelp" src={imgSrc} alt="Kelp Logo" />
            <div className="card-body card-body-kelp">
              <div className="container">
                <div className="row justify-content-center">
                  <p className="card-title card-title-kelp">{title}</p>
                </div>
                <div className='row'>
                  <div className="container col-lg-6">
                    <div className="row">
                      <p className="card-text card-text-kelp">{price + ' * ' + foodType}</p>
                    </div>
                    <div className="row">
                      <p className="card-text i-stars i-stars-temp"></p>
                    </div>
                    <div className="row">
                      <p className="card-text card-text-kelp">{reviews}</p>
                    </div>
                  </div>
                  <div className="container col-lg-6">
                    <div className="row">
                      <p className="card-text card-text-kelp">{address1}</p>
                    </div>
                    <div className="row">
                      <p className="card-text card-text-kelp">{address2}</p>
                    </div>
                    <div className="row">
                      <p className="card-text card-text-kelp">{phone}</p>
                    </div>
                  </div>
                </div>
              </div> 
            </div>
          </div>
        </Link>
      </div>

    )
  }    
}


export default BusinessCard;
