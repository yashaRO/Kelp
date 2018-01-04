import React, { Component } from 'react';

class CardList extends Component {
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

  renderBody = () => {
    let hours = this.props.tbodyData[0]
    let today = new Date().getDay()
    let dOw = ['Sun','Mon','Tues','Wed','Thur','Fri','Sat']
    let dOWHours = this._batchParseTime(hours.open)
    let isOpen = hours.is_open_now ? 'isOpen' : 'isClosed'
    console.log(dOWHours)
    return dOWHours.map((day, i) => {
      return (
        <tr className={ i === today ? isOpen : ''} key={i} style={{}}>
          <th>{day}</th>
          <td>{dOWHours[i] || 'Closed'}</td>
        </tr>
      )
    })
  }

  render() {
    console.log(this.props.theadData)
    console.log(this.props.tbodyData)
    let {theadData} = this.props

    return (
      <div className="card" style={{width: "100%"}}>
        <table className='table'>
          <thead>
            <tr>
              {theadData.map((data, i) => <th key={i}>{data}</th>)}
            </tr>
          </thead>
          <tbody>
            {this.renderBody()}
          </tbody>
        </table>
      </div>

    )
  }    
}

export default CardList;