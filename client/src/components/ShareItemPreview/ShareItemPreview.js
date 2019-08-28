import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import { connect } from "react-redux";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";

const ShareItemPreview = ({ shareItemPreview, classes }) => {
  return (
    <div className={classes.itempreview}>
      <ItemCard item={shareItemPreview} />
    </div>
  );
};

const mapStateToProps = ({ shareItemPreview }) => {
  return {
    shareItemPreview
  };
};

export default connect(mapStateToProps)(withStyles(styles)(ShareItemPreview));
