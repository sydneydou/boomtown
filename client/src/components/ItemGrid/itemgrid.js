import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AccountForm from "../AccountForm";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import ItemCard from "../ItemCard";

const ItemGrid = ({ classes, items }) => {
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        justify="center"
        className={classes.itemContainer}
        spacing={5}
      >
        {items.map(item => (
          <div className={classes.singleItem}>
          <ItemCard item={item} classes={classes} />
           </div>
        ))}
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(ItemGrid);
