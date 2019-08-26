import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import ItemGrid from "../../components/ItemGrid";

const Items = ({ classes, items }) => {
  return <ItemGrid items={items} />;
};

export default withStyles(styles)(Items);
