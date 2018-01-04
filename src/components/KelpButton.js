import React, { Component } from 'react';
import SearchButton from '../images/cutlery.png'

class KelpButton extends Component {
  render() {
    return (
      <span>
        <button className='searchpage-header-search-button' style={{backgroundColor:'green'}} onClick={this.props.onClick}>
          <img src={SearchButton} alt='Search'/>
        </button>
        <div style={{display:'none'}}>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
        </div>
      </span>
    )
  }
}

export default KelpButton