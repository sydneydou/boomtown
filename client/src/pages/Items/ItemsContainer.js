import React, { Component } from 'react';
import Items from './Items';
//import FullScreenLoader from '../../components/FullScreenLoader';
import { Query } from 'react-apollo';
import gql from "graphql-tag";
 import { ALL_ITEMS_QUERY, ALL_TAGS_QUERY } from '../../apollo/queries';


class ItemsContainer extends Component {

  render() {
    //can you have two queries?
    return(
      <div>
    <Query query={ALL_ITEMS_QUERY} variables={{filter:1}}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;
      return <Items items={data.items} />
    }}
    </Query>
      {/* <Query query={ALL_TAGS_QUERY} >
      {({ loading, error, data }) => {
        console.log(data);
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        return <Items itemTag={data.itemTag} />
      }}
      </Query> */}
      </div>
    )
  }
}
  
  export default ItemsContainer;
