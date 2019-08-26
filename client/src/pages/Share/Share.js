import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import ShareItemForm from "../../components/ShareItemForm";
import ShareItemPreview from "../../components/ShareItemPreview/ShareItemPreview";
import PropTypes from "prop-types";

const Share = ({ classes, tags }) => {
  return (
    <div className={classes.sharePages}>
      <ShareItemPreview />
      <ShareItemForm tags={tags} />
    </div>
  );
};

Share.propTypes = {
  tags: PropTypes.object.isRequired
};

export default withStyles(styles)(Share);
