import React, { Component } from "react";
import Profile from "./Profile";
import { ViewerContext } from "../../context/ViewerProvider";
import FullScreenLoader from "../../components/FullScreenLoader";
import { Query } from "react-apollo";
import { ALL_USER_ITEMS_QUERY } from "../../apollo/queries";

class ProfileContainer extends Component {
  render() {
    return (
      <ViewerContext.Consumer>
        {({ viewer }) => (
          <Query
            query={ALL_USER_ITEMS_QUERY}
            variables={{ id: this.props.match.params.userid || viewer.id }}
            fetchPolicy="network-only"
          >
            {({ loading, error, data }) => {
              if (loading) return <FullScreenLoader />;

              if (error) return `Error! ${error.message}`;
              return <Profile data={data} />;
            }}
          </Query>
        )}
      </ViewerContext.Consumer>
    );
  }
}

export default ProfileContainer;
