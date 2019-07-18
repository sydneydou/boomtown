import React, { Component } from 'react';
import Items from './Items';
//import FullScreenLoader from '../../components/FullScreenLoader';
import { Query } from 'react-apollo';
import gql from "graphql-tag";
 import { ALL_ITEMS_QUERY } from '../../apollo/queries';


class ItemsContainer extends Component {

  render() {
    return(
    <Query query={ALL_ITEMS_QUERY}>
    {({ loading, error, data }) => {
      console.log(data.items);
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;
      return <Items items={data.items} />
    }}
    </Query>
    )
  }
}
  
  export default ItemsContainer;
