"use strict";
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, Navigation } from 'react-router';
import { createHistory, useBasename } from 'history';

/*local imports*/
import {Browse} from './browsePage.js';
import {Footer} from './footer.js';
import {Navbar} from './navbar.js';
import {Search} from './search.js';
import {Project} from './project.js';
import {ProjectCreate} from './projectCreate.js';
import {Upload} from './upload.js';
import {Signup} from './signup.js';
import {Login} from './login.js';
import {organization} from './organizationpage.js';

const history = useBasename(createHistory)({
  basename: '/'
});

const App = React.createClass({

  getInitialState: function () {
    return {
      searchText: "",
      searchCriteria: [],
      searchResults: [],
      projectId: "",
      orgId: "",
      currentOrganization: null
    };
  },
  updateSearchCriteria: function(tags) {
    this.setState({
      searchCriteria: tags
    })
  },

  navigateToSearchPage: function () {
    this.props.history.pushState(null, `/search`);
  },

  navigateToOrganizationPage: function () {
    this.props.history.pushState(null, `/organization`);
  },

  updateInput: function (searchText) {
    this.setState({
      searchText: searchText
    });
  },

  removeBrowseTag: function(tagName) {
    var searchCriteria = this.state.searchCriteria.slice();
    var tagIdx = searchCriteria.indexOf(tagName);
    searchCriteria.splice(tagIdx, 1);
    this.setState({
      searchCriteria: searchCriteria
    });
  },

  removeSearchTag: function(tagName) {
    var searchCriteria = this.state.searchCriteria.slice();
    var tagIdx = searchCriteria.indexOf(tagName);
    searchCriteria.splice(tagIdx, 1);
    this.setState({
      searchText: searchCriteria.join(" "),
      searchCriteria: searchCriteria
    });
    var self = this;
    var i = setInterval(function () {
      if (searchCriteria === self.state.searchCriteria) {
        clearInterval(i);
        console.log("App/rST/self.state.searchCriteria:",self.state.searchCriteria);
        console.log("App/rST/self.state.searchText:",self.state.searchText);
        self.handleSearchSubmit();
      }
    }, 100);
  },

  handleSearchButton: function (searchText) {
    console.log("App/hSS/searchText:",searchText);
    this.setState({
      searchText: searchText
    });
    var self = this;
    var i = setInterval(function () {
      if (searchText === self.state.searchText) {
        clearInterval(i);
        console.log("App/hSS/this.state.searchText:",self.state.searchText);
        self.handleSearchSubmit();
      }
    }, 100);
  },

  handleSearchSubmit: function () {
    var searchCriteria = this.state.searchText.split(" ");
    console.log("App/hSS/: searchCriteria",searchCriteria);
    $.ajax({
      url: "/post_search",
      // dataType: 'json',
      method: "Post",
      data: {aofs: searchCriteria},
      success: function (data) {
        this.setState({
          searchText: this.state.searchText,
          searchCriteria: searchCriteria,
          searchResults: data.results
        });
        this.navigateToSearchPage();
        // console.log('Testing success time. Inside of success to AJAX')
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(xhr, status, err.toString());
      }.bind(this)
    })
  },

  getProject: function(projectId) {
    this.setState({
      projectId: projectId
    });
    var self = this;
    var i = setInterval(function () {
      if (projectId === self.state.projectId) {
        clearInterval(i);
        console.log("App/gP/this.state.projectId:",self.state.projectId);
        self.props.history.pushState(null, `/project`);
      }
    }, 100);
  },

  setOrganization: function(org){
    this.setState({
      searchText: this.state.searchText,
      searchCriteria: this.state.searchCriteria,
      searchResults: this.state.searchResults,
      projectId: this.state.projectId,
      orgId: this.state.orgId,
      currentOrganization: org
    });
    this.navigateToOrganizationPage();
  },

  render: function () {
    return (
      <div>
        <Navbar
          searchText={this.state.searchText}
          updateInput={this.updateInput}
          handleSearchSubmit={this.handleSearchSubmit}/>
        {React.cloneElement(this.props.children,
          {
            searchText: this.state.searchText,
            searchCriteria: this.state.searchCriteria,
            searchResults: this.state.searchResults,
            projectId: this.state.projectId,
            handleSearchButton: this.handleSearchButton,
            handleSearchSubmit: this.handleSearchSubmit,
            updateSearchCriteria: this.updateSearchCriteria,
            removeBrowseTag: this.removeBrowseTag,
            removeSearchTag: this.removeSearchTag,
            getProject: this.getProject,
            setOrganization: this.setOrganization,
            currentOrganization: this.state.currentOrganization
          }
        )}
      </div>
    );
  }
});

var Index = React.createClass({
  componentDidMount: function () {
    $('.parallax').parallax();
    $(".button-collapse").sideNav();
  },

  render: function() {
    return(
      <div>

        {/*Parallax*/}
        <div className="parallax-container">
          <div className="parallax">
            <img src="https://c1.staticflickr.com/5/4142/4931601202_92f9bb7152_b.jpg" />
          </div>
          <div className="caption center-align shadow-white">
            <h3>See the lives changed by your donation!</h3>
            <h5 className="light grey-text text-lighten-3 shadow">Follow the impact of your money</h5>
          </div>
        </div>

        <div className="section white">
          <div className="row container">

          </div>
          <p className="grey-text text-darken-3 lighten-3">
                    </p>
            <div className="row">

            <div className="col s4">
            <i className="material-icons">flash_on</i>
              Whatever plaid four loko, pabst roof party bitters irony williamsburg twee. Franzen lomo gentrify schlitz twee authentic migas brooklyn. Four dollar toast banh mi crucifix, mlkshk aesthetic chartreuse yuccie disrupt PBR&B knausgaard hella tofu vegan ramps. Neutra affogato sriracha ugh photo booth. Before they sold out keytar taxidermy, aesthetic raw denim truffaut austin readymade semiotics salvia brunch mumblecore celiac kickstarter. Marfa hashtag kogi whatever, heirloom schlitz ramps four dollar toast kickstarter portland vegan cliche +1 occupy. Before they sold out roof party cred neutra church-key, truffaut chillwave farm-to-table marfa cold-pressed.
            </div>
            <div className="col s4">
              Aesthetic tumblr lomo, banh mi squid williamsburg typewriter blog plaid. Wayfarers blue bottle chillwave direct trade plaid semiotics, bespoke skateboard authentic kombucha sustainable flannel deep v. Sustainable craft beer bicycle rights ramps kombucha poutine. Listicle bushwick hella normcore. Irony austin paleo, street art iPhone venmo PBR&B meggings readymade 3 wolf moon. Four dollar toast portland echo park marfa, blog distillery keytar. Migas organic health goth affogato cornhole, leggings cold-pressed put a bird on it keytar sriracha pinterest wayfarers.
            </div>
            <div className="col s4">
              Knausgaard PBR&B organic, pickled skateboard etsy freegan vice green juice tacos. Small batch YOLO gluten-free humblebrag etsy skateboard. Freegan normcore selvage stumptown williamsburg pinterest marfa. 90's ramps aesthetic, cliche farm-to-table kickstarter narwhal YOLO whatever small batch mustache. Schlitz mlkshk yr, etsy craft beer keffiyeh single-origin coffee. XOXO kickstarter flannel, fingerstache PBR&B tousled wayfarers kale chips ramps kitsch craft beer. Blue bottle put a bird on it deep v DIY, four loko retro distillery.
            </div>

            </div>

        </div>

        <div className="parallax-container">
          <div className="parallax">
            <img src="https://c2.staticflickr.com/6/5477/10570079866_b622f2a732_b.jpg" />
          </div>
        </div>

        {/*Footer*/}
        <Upload />
        <Footer />
      </div>
    );
  }
});

render((
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
      <Route path="Login" component={Login} />
      <Route path="Signup" component={Signup} />
      <Route path="browse" component={Browse} />
      <Route path="search" component={Search} />
      <Route path="project" component={Project} />
    </Route>
  </Router>
), document.getElementById('app'));
