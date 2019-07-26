const { ApolloError } = require("apollo-server-express");

const jwt = require("jsonwebtoken")
const authMutations = require("./auth");

const { DateScalar } = require("../custom-types");

module.exports = app => {
  return {
    //Date: DateScalar,

    Query: {
      viewer(parent, args, context) {
        const user = jwt.decode(context.token, app.get("JWT_SECRET"));
        if (!user) {
          return null;
        } else {
          return user;
        }
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
          const items = await pgResource.getItems(filter);
          console.log(items);
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
          const borrowedItemsForUser = await pgResource.getBorrowedItemsForUser(
            id
          );
          return borrowedItemsForUser;
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    },

    Item: {
      async itemowner({ ownerid }, args, { pgResource }) {
        try {
          const itemowner = await pgResource.getUserById(ownerid);
          console.log(itemowner);
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
      }
    },

    Mutation: {
      ...authMutations(app),
      // -------------------------------
      //image = await image;
      //const user = await jwt.decode(context.token, app.get('JWT_SECRET'));

      async addItem(parent, args, context, info) {
        try {
          const newItem = await context.pgResource.saveNewItem({
            item: args.item,
            image: undefined,
            users: args.user
          });
          return newItem;
        } catch (e) {
          console.log("Unable to add an item");
        }
      }
    }
  };
};
