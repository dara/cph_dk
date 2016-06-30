/** @jsx React.DOM */

'use strict'

var $ = require('jquery'),
  Form = require('./Form'),
  Table = require('./Table'),
  apiUrl = 'https://cph-dk-api.herokuapp.com/api/v1/search?',
  searchInput = require('react-search-input'),
  SEARCHABLE_KEYS = ['from', 'to', 'airline', 'flight_number'];

var cols = [
  { key: 'timestamp', label: 'Timestamp' },
  { key: 'scheduled_time', label: 'Time' },
  { key: 'flight_number', label: 'Flight No' },
  { key: 'airline', label: 'Airline' },
  { key: 'from', label: 'From' },
  { key: 'to', label: 'To' },
  // { key: 'delayed_time', label: 'Delayed Time' },
  // { key: 'gate', label: 'Gate' },
  // { key: 'status', label: 'Status' }
];

module.exports = React.createClass({
  getFlights: function() {
    $.ajax({
      url: apiUrl + 'date=' + this.state.date + '&direction=' + this.state.direction,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: [], direction: 'arrivals', date: 'today', time: 'all', searchTerm: ''};
  },
  componentDidMount: function() {
    this.getFlights();
  },
  onUpdate: function(key, value) {
    var state = this.state;
    state[key] = value;
    this.setState(state, this.getFlights);
  },
  render: function() {
    var data = this.state.data.filter(
      searchInput.createFilter(this.state.searchTerm, SEARCHABLE_KEYS)
    );
    
    // time filter
    if (this.state.time !== 'all') {
      var a = new Date(), b = new Date();

      a.setUTCHours(this.state.time);
      a.setUTCMinutes(0);
      a.setUTCSeconds(0);
      a.setUTCMilliseconds(0);

      b.setUTCHours(parseInt(this.state.time) + 1);
      b.setUTCMinutes(0);
      b.setUTCSeconds(0);
      b.setUTCMilliseconds(0);

      switch(this.state.date) {
        case 'tomorrow':
          a.setDate(a.getDate() + 1);
          b.setDate(b.getDate() + 1);
          break;
        case 'yesterday':
          a.setDate(a.getDate() - 1);
          b.setDate(b.getDate() - 1);
          break;
        default:
          break;
      }

      var t1 = a / 1000, t2 = b / 1000;

      data = data.filter(function(row) {
        return row.timestamp >= t1 && row.timestamp < t2;
      });
    }

    return (
      <div>
        <Form onUpdate={this.onUpdate} direction={this.state.direction} date={this.state.date} />
        <Table cols={cols} data={data} />
      </div>
      );
  }
});
