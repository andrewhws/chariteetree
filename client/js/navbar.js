"use strict";
var React = require('react');
import { Link } from 'react-router';
import { Login } from './login.js';
import { Signup } from './signup.js';

var Navbar = exports.Navbar = React.createClass({
  updateInput: function (e) {
    //console.log("value",e.target.value);
    this.props.updateInput(e.target.value);
  },

  clearInput: function (e) {
    //console.log("value",e.target.value);
    this.props.updateInput("");
  },

  handleSearchSubmit: function (e) {
    e.preventDefault();
    this.props.handleSearchSubmit();
  },

  componentDidMount: function () {
    $('.modal-trigger').leanModal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: 0, // Opacity of modal background
        in_duration: 300, // Transition in duration
        out_duration: 200, // Transition out duration
        //ready: function() { alert('Ready'); }, // Callback for Modal open
        //complete: function() { alert('Closed'); } // Callback for Modal close
      }
    );
  },

  render: function () {
    return (
      <div>
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper grey lighten-5">
              <Link to="/" className="brand-logo black-text">Charity Tree</Link>
              <a href="#" data-activates="mobile-demo" className="button-collapse black-text"><i className="material-icons">menu</i></a>
              <ul className="right hide-on-med-and-down">
                <li>
                  <form onSubmit={this.handleSearchSubmit}>
                    <div className="input-field black-text">
                    <input
                        id="search"
                        type="search"
                        placeholder="Search..."
                        value={this.props.searchText}
                        onChange={this.updateInput}
                        required />
                      <label htmlFor="search" ><i className="material-icons black-text" >search</i></label>
                      {this.props.searchText ? <i className="material-icons black-text" onClick={this.clearInput}>close</i> : "" }
                    </div>
                  </form>
                </li>

                {/*Login/Signup Modal*/}
                {/*<li><a className="waves-effect waves-light btn-flat modal-trigger" href="#modal1">Login/Signup</a></li>
                <div id="modal1" className="modal row center-align">
                  <div className="modal-content col s12 m6">
                    <h4 className="black-text">Login</h4>
                    <p>A bunch of text</p>
                    <Login />
                  </div>
                  <div className="modal-content col s12 m6">
                    <h4 className="black-text">Signup</h4>
                    <p>A bunch of text</p>
                    <Signup />
                  </div>
                  <div className="modal-footer">
                    <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
                  </div>
                </div>*/}

                <li><Link className="waves-effect waves-light black-text" to="/login">Login</Link></li>
                <li><Link className="waves-effect waves-light black-text" to="/signup">Signup</Link></li>
                <li><Link className="waves-effect waves-light black-text" to="/browse">Browse Categories</Link></li>
              </ul>

              {/*Side Navigation*/}
              <ul className="side-nav" id="mobile-demo">
                <li>
                  <form onSubmit={this.handleSearchSubmit}>
                    <div className="input-field black-text">
                      <input
                        id="search"
                        type="search"
                        placeholder="Search..."
                        value={this.props.searchText}
                        onChange={this.updateInput}
                        required />
                      <label htmlFor="search" ><i className="material-icons black-text" >search</i></label>
                      {this.props.searchText ? <i className="material-icons black-text" onClick={this.clearInput}>close</i> : "" }
                    </div>
                  </form>
                </li>
                <li><Link className="waves-effect waves-light" to="/login">Login</Link></li>
                <li><Link className="waves-effect waves-light" to="/signup">Signup</Link></li>
                <li><Link className="waves-effect waves-light" to="/browse">Browse Categories</Link></li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
});
