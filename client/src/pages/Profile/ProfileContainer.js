import React, { Component } from 'react';
import Profile from './Profile';
import {ViewerContext }from "../../context/ViewerProvider";
// import FullScreenLoader from '../../components/FullScreenLoader';
// import { Query } from 'react-apollo';
// import {  } from '../../apollo/queries';

class ProfileContainer extends Component {
  render() {
    return (
      <ViewerContext.Consumer>
      {({viewer})=>(
        <Profile />
      )}
      </ViewerContext.Consumer>
    );
  }
}

export default ProfileContainer;
