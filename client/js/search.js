"use strict";
var React = require('react');
import { Link } from 'react-router';
import { TagContainer, Tag } from './tag_container.js';


var Search = exports.Search = React.createClass({
  render: function () {
    console.log("Search Props: ", this.props);
    return (
      <div>
        <div className="row">
          <div className="col s12 m8 push-m4">
            <h5 className="center-align">Projects</h5>
            <h6>Search Tags</h6>
            <div style={{minHeight: '25px'}}>
              <TagContainer
                searchCriteria={this.props.searchCriteria}
                removeSearchTag={this.props.removeSearchTag}/>
            </div>
            <ProjectResults
              searchResultsProjects={this.props.searchResults.projects}
              getProject={this.props.getProject}/>
          </div>
          <div className="col s12 m4 pull-m8">
            <h5 className="center-align">Organizations</h5>
            <OrganizationResults
              searchResultOrgs={this.props.searchResults.orgs}
              setOrganization={this.props.setOrganization}
              searchResultOrgs={this.props.searchResults.orgs}/>
          </div>
        </div>
      </div>
    );
  }
});

var OrganizationResults = React.createClass({

  testClick: function(e){
    e.preventDefault();
    console.log('inside of testClick');
    console.log('e.target.value is',e.target.value);
  },

  componentWillMount: function(){
    console.log(this.props.searchResultOrgs[0])
  },

  render: function () {
    if (this.props.searchResultOrgs) {
      var org = this.props.searchResultOrgs.map(function(organization, index){
        return (
          <Organization
            key={index}
            org={organization}
            setOrganization={this.props.setOrganization}/>
        )
      }.bind(this));
    }
    return(
      <div>
        <div>
          <h6>Organization Results</h6>
          <div className="collection hoverable">
            {org ? org : "No results to display"}
          </div>
        </div>
      </div>
    );
  }
});

var Organization = React.createClass({

  setOrganization: function() {
    this.props.setOrganization(this.props.org);
  },

  render: function () {
    var img = (this.props.org.img) ? "data:image/jpeg;base64," + this.props.org.img
        : "http://previews.123rf.com/images/kritchanut/kritchanut1406/kritchanut140600093/29213195-Male-silhouette-avatar-profile-picture-Stock-Vector-profile.jpg";
    return( <div className="org-card" onClick={this.setOrganization}>
        <div className="collection-item avatar">
          <img className="image circle" src={img} />
          <span className="title right-align"><h4>{this.props.org.name}</h4></span>
          <p>{this.props.org.about}</p>
        </div>
      </div>
    );
  }
});

var ProjectResults = React.createClass({
  render: function () {
    console.log("ProjectResults/render/this.props.searchResultsProjects:",this.props.searchResultsProjects);
    if (this.props.searchResultsProjects) {
      var projects = this.props.searchResultsProjects.map(function (project, index) {
        return (
          <Project
            key={index}
            title={project.title}
            info={project.info}
            areas_of_focus={project.areas_of_focus}
            projectId={project._id}
            getProject={this.props.getProject}/>
        );
      }.bind(this));
    } else {
      return (
        <div>
          No results to display
        </div>
      );
    }
    return(
      <div className="row">
        <div className="col s12 m6 l4">
          <h6>Project Search Results</h6>
          {projects}
        </div>
      </div>
    );
  }

});

var Project = React.createClass({

  getProject: function() {
    this.props.getProject(this.props.projectId);
  },


  render: function () {

    return (
      <div className="card hoverable">
        <div className="card-image">
          <img src="http://worldofgoodethiopia.org/yahoo_site_admin/assets/images/30050052.182123348_std.jpg"/>
              <span className="card-title shadow">
                {this.props.title}
              </span>
        </div>
        <div className="card-content">

          <h6>{this.props.areas_of_focus}</h6>
          <div className="truncate">
            {this.props.info}
          </div>
        </div>
        <div className="card-action">
          <p>
            <button className="waves-effect waves-light" onClick={this.getProject}>Read more...</button>
          </p>

        </div>
      </div>
    );
  }
});
