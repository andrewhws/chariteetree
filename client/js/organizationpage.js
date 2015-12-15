"use strict";
var React = require('react');

var Organization = exports.Organization = React.createClass({

  dummyOrgdata : {
  name: "3HO Foundation",
  address: "6 Narayan Court, Espanola, New Mexico 87532, USA",
  about: "The Mission of 3HO is to uplift humanity through the technologies of Kundalini Yoga, meditation and conscious living. Addressing one of the greatest problems facing the world today, substance abuse and addictions, 3HO SuperHealth, which includes the practice of Kundalini Yoga, meditation, vegetarian diet, offers an effective, evidence-based and time-proven rehabilitation and treatment programme. Programs have operated successfully in the United States since 1973 and in India.",
  signup_date: "11/11/2014",
  areas_of_focus: ["Counseling", "Education", "Rehabilitation", "Drug Treatment", "Human Rights", "Women's Issues", "Health", "Addiction"]
  // profile_img: {
  //   data: Buffer,
  //   contentType: String
  // }
  // media: [ObjectId],
  // projects: [{ type: ObjectId, ref: 'Project' }],//does this have past and curr
  // endorsements: [{ type: ObjectId, ref: 'Donor' }]
},

  projects:{
  past:[{
    org: "Test Project Org",
    info: "Info testing part",
    start_date: "new years",
    end_date: "halloween",
    status: "Pending",
    areas_of_focus: [],
    amount: {
      goal: 3000,
      current:1500
    }
  },{
    org: "Test Project Org",
    info: "Info testing part",
    start_date: "new years",
    end_date: "halloween",
    status: "Pending",
    areas_of_focus: [],
    amount: {
      goal: 3000,
      current:1500
    }
  },{
    org: "Test Project Org",
    info: "Info testing part",
    start_date: "new years",
    end_date: "halloween",
    status: "Pending",
    areas_of_focus: [],
    amount: {
      goal: 3000,
      current:1500
    }}],
  current: [{
    org: "Test Project Org",
    info: "Info testing part",
    start_date: "new years",
    end_date: "halloween",
    status: "Pending",
    areas_of_focus: [],
    amount: {
      goal: 3000,
      current:1500
    }},{
    org: "Test Project Org",
    info: "Info testing part",
    start_date: "new years",
    end_date: "halloween",
    status: "Pending",
    areas_of_focus: [],
    amount: {
      goal: 3000,
      current:1500
    }},{
    org: "Test Project Org",
    info: "Info testing part",
    start_date: "new years",
    end_date: "halloween",
    status: "Pending",
    areas_of_focus: [],
    amount: {
      goal: 3000,
      current:1500
    }}]
},

  componentWillMount: function(){
    console.log('Insideof orgpage logging current org', this.props.currentOrganization);
  },

  render: function() {

    var pastProject = this.projects.past.map(function(project, index){
    return(
      <div>
        <div>the org is {project.org}</div>
        <div>the info is {project.info}</div>
        <div>this is the start_date {project.start_date}</div>
        <div>the end_date {project.end_date}</div>
      </div>
      );
  });


    var currentProjects = this.projects.current.map(function(project, index){
    return(
      <div>
        <div>the org is {project.org}</div>
        <div>the info is {project.info}</div>
        <div>this is the start_date {project.start_date}</div>
        <div>the end_date {project.end_date}</div>
      </div>
      );
  });

    return (
      <div>
          <h1>This is a new organization</h1>
          <div>
          <h2>org id is {this.props.currentOrganization._id}</h2>
          </div>

          <div>
          <h2>address is {this.props.currentOrganization.address}</h2>
          </div>

          <div>
            <h2>about is {this.props.currentOrganization.about}</h2>
          </div>

          <div>
            <h2>Our currrent Projects are {currentProjects}</h2>
          </div>

          <div>
           <div>Our Past Projects {pastProject}</div>
          </div>
      </div>
    );
  }
});

