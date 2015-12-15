//display list of areas of focus
import React from 'react';
import { Link } from 'react-router';
import { TagContainer, Tag } from './tag_container.js';
import { CausesInfo } from './causesinfo.js';

var Browse = exports.Browse = React.createClass({

  componentDidMount: function () {
    $('.scrollspy').scrollSpy();
  },

  addCriteria: function (e) {
    var tags = this.props.searchCriteria;
    if (this.props.searchCriteria.indexOf(e.target.title) === -1) {
      tags.push(e.target.title);
    }
    this.props.updateSearchCriteria(tags);
  },

  handleSearchSubmit: function (e) {
    e.preventDefault();
    var searchText = this.props.searchCriteria.join(" ");
    console.log("Browse:searchText/searchText:",searchText);
    this.props.handleSearchButton(searchText);
  },

  render: function() {
    return (
      <div>
        <div className="center flow-text">
          <h3>Find causes you care about the most</h3>
        </div>

        <div className="row">
          <div className="col s12 m2 l2">
            <div className="center-align pinned" style={{maxWidth: "16%", zIndex: "100"}}>
              <button
                className="btn waves-effect waves-light"
                type="submit"
                name="action"
                onClick={this.handleSearchSubmit}
              >
                Submit Search
                <i className="material-icons left">search</i>
              </button>
              <h6>Search Criterion</h6>
              <TagContainer
                searchCriteria={this.props.searchCriteria}
                removeBrowseTag={this.props.removeBrowseTag}
              />
            </div>
          </div>

          {/*Causes*/}
          <Causes addCriteria={this.addCriteria} />

          {/*ScrollSpy*/}
          <ScrollSpyListItems />
        </div>
      </div>
    );
  }
});

var Causes = React.createClass({
  render: function () {
    var causeCards = CausesInfo.map(function (cause, index) {
      return (
        <Cause
          key={index}
          causeID={cause.id}
          tags={cause.tags}
          causeTitle={cause.title}
          causeImage={cause.img}
          causeSubcauses={cause.subcauses}
          addCriteria={this.props.addCriteria}
        />
      );
    }.bind(this));
    return(
      <div className="col s9 push-s3 m8 push-m2 l8 push-l2">
        <div className="row">
          {causeCards}
        </div>
      </div>
    );
  }
});

var Cause = React.createClass({
  render: function () {
    var causeCardReveals = this.props.causeSubcauses.map(function (subcause, index) {
      return (
        <CauseCriteria
          key={index}
          title={subcause.title}
          tags={subcause.tags}
          addCriteria={this.props.addCriteria}
        />
      );
      }.bind(this));

    return (
      <div id={this.props.causeID} className="col s12 m6 l6 section scrollspy">
        <div className="cardx hoverable">
          <div className="card-image waves-effect waves-block waves-light">
            <img className="image activator" src={this.props.causeImage} />
            <span className="card-title activator white-text shadow"
            >{this.props.causeTitle}</span>
          </div>
          <div className="card-reveal #f5f5f5 grey lighten-4">
            <span className="card-title grey-text text-darken-4 hand" title={this.props.tags} onClick={this.props.addCriteria}>{this.props.causeTitle}</span>
            <form action="#">
              {causeCardReveals}
            </form>
          </div>
        </div>
      </div>
    );
  }
});

var CauseCriteria = React.createClass({
  render: function () {
    return(
      <div
        className="hand"
        title={this.props.tags}
        onClick={this.props.addCriteria}
      >
        {this.props.title}
      </div>
    );
  }
});

var CauseCriteriaCB = React.createClass({
  render: function () {
    return(
      <p>
        <input type="checkbox" title={this.props.tags} onCheck={this.props.addCriteria}/>
        <label htmlFor="test5">{this.props.title}</label>
      </p>
    );
  }
});

var ScrollSpyListItems = React.createClass({
  render: function () {
    var items = CausesInfo.map(function (cause, index) {
      return <li key={index}>
        <a href={"#" + cause.id}>
          {cause.title}
        </a>
      </li>
    });
    return(
    <div className="col hide-on-small-only m2 push-m2 l2 push-l2">
      <div className="toc-wrapper pinned" >
        <ul className="section table-of-contents">
          {items}
        </ul>
      </div>
    </div>
    );
  }
});
