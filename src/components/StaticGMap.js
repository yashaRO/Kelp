import React, { Component } from 'react';

class StaticGMap extends Component {
  render() {
    
    let apiKey = 'AIzaSyByynRDUc_o6syfblD66jQlnEzIB8dRWTM'
    let { coordinates, zoom, size, color, center} = this.props
    
    center = center || [coordinates.latitude, coordinates.longitude].toString()
    zoom = zoom || 15
    size = size || '250x250'
    color = color || 'red'
    
    let url = `https://maps.googleapis.com/maps/api/staticmap?center=${center}&zoom=${zoom}&size=${size}&maptype=roadmap&markers=color:${color}%7C${center}&key=${apiKey}`
    
    if (coordinates == undefined) {
      return false
    }
    return <img className="card-img-top" src={url} alt="Card image cap"/>
  }    
}

export default StaticGMap;