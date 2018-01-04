import React, { Component } from 'react';
import KelpLogo from '../images/kelp_logo_face.png'
import KelpButton from './KelpButton'

class MainHeader extends Component {
  render() {
    return (
      <header className={this.props.class || ''}>
        <div className="container" style={{height:'100%'}}>
          <div className="row align-items-center" style={{height:'100%'}}>
            <div className="col-lg-12 justify-content-center">
              <img src={KelpLogo} className="searchpage-header-logo" alt="logo" />
              <input className='searchpage-header-search' value={this.props.find} placeholder='What do you even want?' onChange={(e) => this.props.onChange(e, 'find')} />
              <input className='searchpage-header-search' value={this.props.where} placeholder='Type in your zip code' onChange={(e) => this.props.onChange(e, 'where')} />
              <KelpButton onClick={this.props.onClick}/>
            </div>
          </div>
        </div>
      </header>
    )
  }    
}

export default MainHeader;