"use strict";
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, Navigation } from 'react-router';
import { createHistory, useBasename } from 'history';

import {Dashboard} from './dashboard.js';
import {ProjectCreate} from './projectCreate';

const history = useBasename(createHistory)({
  basename: '/'
});

render((
  <Router history={history}>
    <Route path="/org/" component={Dashboard}>
      <IndexRoute component={OrgAbout} />
      <Route path="projectCreate" component={ProjectCreate} />
    </Route>
  </Router>
), document.getElementById('org'));