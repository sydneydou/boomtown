import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import ItemsContainer from "../pages/Items"
import ProfileContainer from "../pages/Profile"
import ShareContainer from "../pages/Share"
import HomeContainer from "../pages/Home"

export default () => (
  <Fragment>
    {/* @TODO: Add your menu component here */}

      <Switch>
      {/**
       * @TODO: Define routes here for: /items, /profile, /profile/:userid, and /share
       *
       * Provide a wildcard redirect to /items for any undefined route using <Redirect />.
       *
       * Later, we'll add logic to send users to one set of routes if they're logged in,
       * or only view the /welcome page if they are not.
       */}

      <Route path="/items" component={ItemsContainer} />
      <Redirect from="/allitems" to="/items" />
      <Route path="/profile" component={ProfileContainer} />
      <Route path="/profile/:userid" exact component={ProfileContainer} />
      <Route path="/share" component={ShareContainer} />
      <Route path="/welcome" component={HomeContainer} />

      </Switch>
  </Fragment>
);
