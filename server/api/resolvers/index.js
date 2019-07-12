
const { ApolloError } = require('apollo-server-express');

// @TODO: Uncomment these lines later when we add auth
// const jwt = require("jsonwebtoken")
// const authMutations = require("./auth")
// -------------------------------
const { DateScalar } = require('../custom-types');

module.exports = app => {
  return {
    //Date: DateScalar,

    Query: {
      viewer() {
        return null;
      },
      async users(parent, { id }, { pgResource }, info) {
        try {
          const user = await pgResource.getUserById(id);
          return user;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async items(parent, { filter }, { pgResource }, info) {
        try {
          const items = await pgResource.getItemsForUser(filter);
          return items;
        } catch (e) {
          throw new ApolloError(e);
        }
      },


      async tags(parent, args, { pgResource }, info) {
        try {
          const tags = await pgResource.getTags();
          return tags;
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    },

    User: {
      async items({ id }, args, { pgResource }, info) {

        try {
          const getItemsForUser = await pgResource.getItemsForUser(id);
          return getItemsForUser;
        } catch (e) {
          throw new ApolloError(e);
        }

      },
      async borrowed({ id }, args, { pgResource }, info) {

        try {
          const borrowedItemsForUser = await pgResource.getBorrowedItemsForUser(id);
          return borrowedItemsForUser;
        } catch (e) {
          throw new ApolloError(e);
        }

      }
    },

    Item: {
      async itemowner({ id }, args, { pgResource }) {
        try {
          const itemowner = await pgResource.getUserById(id);
          return itemowner;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async tags({ id }, args, { pgResource }) {
        try {
          const itemtags = await pgResource.getTagsForItem(id);
          return itemtags;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async borrower({ id }, args, { pgResource }) {
        try {
          const itemborrower = await pgResource.getBorrower(id);
          return itemborrower;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
    },

    Mutation: {
      // @TODO: Uncomment this later when we add auth
      // ...authMutations(app),
      // -------------------------------

        /**
         *  @TODO: Destructuring
         *
         *  The 'args' and 'context' parameters of this resolver can be destructured
         *  to make things more readable and avoid duplication.
         *
         *  When you're finished with this resolver, destructure all necessary
         *  parameters in all of your resolver functions.
         *
         *  Again, you may look at the user resolver for an example of what
         *  destructuring should look like.
         */

        //image = await image;
        //const user = await jwt.decode(context.token, app.get('JWT_SECRET'));


      async addItem(parent, args, context, info) {

        try {
          const user = "Sydney";
          const newItem = await context.pgResource.saveNewItem(
            {
              item: args.item,
              image: undefined,
              users: user
            }
          );
          return newItem;
        } catch (e) {
          console.log("Unable to add an item");
        }
      }


    }
  };
};
