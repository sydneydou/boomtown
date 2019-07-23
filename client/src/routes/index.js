import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import ItemsContainer from "../pages/Items"
import ProfileContainer from "../pages/Profile"
import ShareContainer from "../pages/Share"
import Header from "../components/Header"
import HomeContainer from "../pages/Home"

export default () => (
  <Fragment>
    
      <Header />
      <Switch>
        
      <Route path="/items" component={ItemsContainer} />
      <Redirect from="/allitems" to="/items" />
      <Route path="/profile" component={ProfileContainer} />
      <Route path="/profile/:userid" exact component={ProfileContainer} />
      <Route path="/share" component={ShareContainer} />
      <Route path="/welcome" component={HomeContainer} />

      </Switch>
  </Fragment>
);
