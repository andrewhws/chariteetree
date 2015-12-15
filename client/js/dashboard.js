"use strict";
var React = require('react');

var Dashboard = exports.Dashboard = React.createClass({
  componentDidMount: function() {
    this.getData();

  },

  getInitialState: function() {
    return {
      orgData: [],
      view: 'about',
    }
  },

  getData: function() {
    $.ajax({
      method: 'GET',
      url: '/dashboard',
      success:function(response){
        this.setState({ orgData: response.data})
      },
      error: function(error){
        console.log(error);
      }
    })
  },

  render: function() {
    if(this.state.view === 'about') {
      return (
        <div>
          <h2>{this.state.orgData.name}</h2>
          <h3>{this.state.orgData.username}</h3>
          <p>{this.state.orgData.about}</p>
          <ul>
        </div>
      )
    }
  }
});

var About = React.createClass({
  render: function() {
    return (
      <div>

      </div>
    );
  }
});
