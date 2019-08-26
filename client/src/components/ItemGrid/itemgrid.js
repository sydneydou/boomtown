import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import ItemCard from "../ItemCard";
import Container from "@material-ui/core/Container";

const ItemGrid = ({ classes, items }) => {
  return (
    <Container justify="center" spacing={5} xs={12}>
      <Grid justify="center" spacing={5} xs={12}>
        <Grid
          item={true}
          xs={12}
          justify="center"
          className={classes.itemContainer}
          spacing={5}
        >
          {items.map(item => (
            <div className={classes.singleItem} key={item.id}>
              <ItemCard key={item.id} item={item} classes={classes} />
            </div>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default withStyles(styles)(ItemGrid);
