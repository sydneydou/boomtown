// this file is responsible for firing sql queries
function tagsQueryString(tags, itemid, result) {
  /**
   * Challenge:
   * This function is more than a little complicated.
   *  - Can you refactor it to be simpler / more readable?
   */
  const length = tags.length;
  return length === 0
    ? `${result};`
    : tags.shift() &&
    tagsQueryString(
      tags,
      itemid,
      `${result}($${tags.length + 1}, ${itemid})${length === 1 ? '' : ','}`
    );
}

module.exports = postgres => {
  return {
    async createUser({ fullname, email, password }) {
      const newUserInsert = {
        text: '', // @TODO: Authentication - Server
        values: [fullname, email, password]
      };
      try {
        const users = await postgres.query(newUserInsert);
        return users.rows[0];
      } catch (e) {
        switch (true) {
          case /users_fullname_key/.test(e.message):
            throw 'An account with this username already exists.';
          case /users_email_key/.test(e.message):
            throw 'An account with this email already exists.';
          default:
            throw 'There was a problem creating your account.';
        }
      }
    },
    async getUserAndPasswordForVerification(email) {
      const findUserQuery = {
        text: '', // @TODO: Authentication - Server
        values: [email]
      };
      try {
        const users = await postgres.query(findUserQuery);
        if (!users) throw 'User was not found.';
        return users.rows[0];
      } catch (e) {
        throw 'User was not found.';
      }
    },
    async getUserById(id) {
      const findUserQuery = {
        text: 'SELECT * FROM users WHERE id = $1 LIMIT 1',
        values: [id]
      };
      try {
        const users = await postgres.query(findUserQuery);
        return users.rows[0];
      } catch (e) {
        throw "User not found";
      }
    },
    async getBorrower(id) {
      const findUserQuery = {
        text: 'SELECT * FROM users WHERE id = $1 LIMIT 1',
        values: [id]
      };
      try {
        const users = await postgres.query(findUserQuery);
        return users.rows[0];
      } catch (e) {
        throw "User not found";
      }
    },
    async getItems(idToOmit) {
      const items = await postgres.query({
        text: `SELECT * FROM items WHERE itemowner != $1`,
        values: idToOmit ? [idToOmit] : []
      });
      return items.rows;
    },
    async getItemsForUser(id) {
      const items = await postgres.query({
        text: `SELECT * FROM items where ownerid=$1`,
        values: [id]
      });
      return items.rows;
    },
    async getBorrowedItemsForUser(id) {
      const items = await postgres.query({
        text: `SELECT *
        FROM items
        WHERE borrowerid =$1`,
        values: [id]
      });
      return items.rows;
    },
    async getTags() {
      const tags = await postgres.query({
        text: `SELECT * FROM tags`
      });
      return tags.rows;
    },
    async getTagsForItem(id) {
      const tagsQuery = {
        text: `SELECT
        id,
        title
        FROM tags
        INNER JOIN itemtags
        ON tags.id=itemtags.tagid
        WHERE itemtags.itemid = $1;`,
        values: [id]
      };

      const tags = await postgres.query(tagsQuery);
      return tags.rows;
    },
    async saveNewItem({ item, image, users }) {

      try {
        return new Promise((resolve, reject) => {

          postgres.connect((err, client, done) => {
            try {
              // Begin postgres transaction
              client.query('BEGIN', async err => {
                const { title, description, tags } = item;

                const insertQuery = {
                  text: `INSERT INTO items (title,description,ownerid) values ($1, $2, 1) RETURNING *`,
                  values: [title, description]
                };

                const newItem = await postgres.query(insertQuery);

                const tagsId = tags.map(tag => tag.id);
                const newItemId = newItem.rows[0].id;

                console.log(tagsId[0]);
                console.log(newItemId);

                const newItemTag = await postgres.query({
                  text: `INSERT INTO itemtags (tagid,itemid) values ${tagsQueryString(
                    tags,
                    newItemId,
                    ' '
                  )}`,
                  values: tagsId
                })



                // const newItemTag= {
                //   text:`INSERT INTO itemtags (itemid, tagid) values ($1, $2)`
                // }




                // Insert tags
                // @TODO
                // -------------------------------

                // Commit the entire transaction!
                client.query('COMMIT', err => {
                  if (err) {
                    throw err;
                  }
                  // release the client back to the pool
                  done();
                  // Uncomment this resolve statement when you're ready!
                  resolve(newItem.rows[0])
                  resolve(newItemTag)
                  // -------------------------------
                });
              });
            } catch (e) {
              // Something went wrong
              client.query('ROLLBACK', err => {
                if (err) {
                  throw err;
                }
                // release the client back to the pool
                done();
              });
              switch (true) {
                default:
                  throw e;
              }
            }
          });
        });
      }
      catch (e) {
        console.log(e);
      }
    }
  };
};
