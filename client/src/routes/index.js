import React, { Fragment } from "react";
import { Redirect, Route, Switch } from "react-router";
import ItemsContainer from "../pages/Items";
import ProfileContainer from "../pages/Profile";
import ShareContainer from "../pages/Share";
import Header from "../components/Header";
import HomeContainer from "../pages/Home";
import { ViewerContext } from "../context/ViewerProvider";
import PRoute from "../components/PrivateRoute";
import FullScreenLoader from "../components/FullScreenLoader";

export default () => (
  <Fragment>
    <ViewerContext.Consumer>
      {({ viewer, loading }) => {
        if (loading) return <FullScreenLoader />;

        if (!viewer) {
          return (
            <Switch>
              <Route path="/welcome" component={HomeContainer} />
              <Redirect from="*" to="/welcome" />
            </Switch>
          );
        }
        return (
          <Fragment>
            <Header />
            <Switch>
              <PRoute path="/items" component={ItemsContainer} />
              <PRoute exact path="/profile" component={ProfileContainer} />
              <PRoute
                exact
                path="/profile/:userid"
                component={ProfileContainer}
              />
              <PRoute path="/share" component={ShareContainer} />
              <Redirect from="*" to="/items" />
            </Switch>
          </Fragment>
        );
      }}
    </ViewerContext.Consumer>
  </Fragment>
);
