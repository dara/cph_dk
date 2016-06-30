/** @jsx React.DOM */

'use strict'

module.exports = React.createClass({
  onUpdate: function (key, value) {
    this.props.onUpdate(key, value);
  },
  searchUpdated: function (event) {
    this.props.onUpdate('searchTerm', event.target.value);
  },
  timeUpdated: function (event) {
    this.props.onUpdate('time', event.target.value);
  },
  render: function() {
    return (
      <div className="search-form">
        <form>
          <div className="row">
            <div className="col-md-4 text-center">
              <div className="radio">
                <label className="checkbox-inline">
                  <input onChange={this.onUpdate.bind(this, 'direction', 'arrivals')} type="radio" name="optdirection" checked = {this.props.direction == 'arrivals'} /> Arrivals
                </label>
                <label className="checkbox-inline">
                  <input onChange={this.onUpdate.bind(this, 'direction', 'departures')} type="radio" name="optdirection" checked = {this.props.direction == 'departures' }/> Departures
                </label>
              </div>
            </div>

            <div className="col-md-4 text-center">
              <div className="radio">
                <label className="checkbox-inline">
                  <input onChange={this.onUpdate.bind(this, 'date', 'today')} type="radio" name="optdate" checked = {this.props.date == 'today'} /> Today
                </label>
                <label className="checkbox-inline">
                  <input onChange={this.onUpdate.bind(this, 'date', 'tomorrow')} type="radio" name="optdate" checked = {this.props.date == 'tomorrow'} /> Tomorrow
                </label>
                <label className="checkbox-inline">
                  <input onChange={this.onUpdate.bind(this, 'date', 'yesterday')} type="radio" name="optdate" checked = {this.props.date == 'yesterday'} /> Yesterday
                </label>
              </div>
            </div>

            <div className="col-md-4 text-center">
              <select className="time-input" onChange={this.timeUpdated}>
                <option value="all">All</option>
                <option value="0">12:00 AM</option>
                <option value="1">01:00 AM</option>
                <option value="2">02:00 AM</option>
                <option value="3">03:00 AM</option>
                <option value="4">04:00 AM</option>
                <option value="5">05:00 AM</option>
                <option value="6">06:00 AM</option>
                <option value="7">07:00 AM</option>
                <option value="8">08:00 AM</option>
                <option value="9">09:00 AM</option>
                <option value="10">10:00 AM</option>
                <option value="11">11:00 AM</option>
                <option value="12">12:00 PM</option>
                <option value="13">01:00 PM</option>
                <option value="14">02:00 PM</option>
                <option value="15">03:00 PM</option>
                <option value="16">04:00 PM</option>
                <option value="17">05:00 PM</option>
                <option value="18">06:00 PM</option>
                <option value="19">07:00 PM</option>
                <option value="20">08:00 PM</option>
                <option value="21">09:00 PM</option>
                <option value="22">10:00 PM</option>
                <option value="23">11:00 PM</option>
              </select>
            </div>
          </div>
          <input className="form-control search-input" onChange={this.searchUpdated} placeholder="Search for flight number, airline or city" />
        </form>
      </div>
    );
  },
});
