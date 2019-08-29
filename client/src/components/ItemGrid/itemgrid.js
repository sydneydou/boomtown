import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import ItemCard from "../ItemCard";

const ItemGrid = ({ classes, items }) => {
  return (
    <Grid container justify="left" className={classes.itemContainer}>
      {items.map(item => (
        <Grid item className={classes.singleItem} xs={4} key={item.id}>
          <ItemCard item={item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default withStyles(styles)(ItemGrid);
