import React, { Component } from "react";
import Share from "./Share";
import { ALL_TAGS_QUERY } from "../../apollo/queries";
//import FullScreenLoader from '../../components/FullScreenLoader';
import { Query } from "react-apollo";

class ShareContainer extends Component {
  render() {
    
    return (
      <Query query={ALL_TAGS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return <Share tags={data.tags} />;
        }}
      </Query>
    );
  }
}

export default ShareContainer;
