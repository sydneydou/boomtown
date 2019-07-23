import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import ShareItemForm from "../../components/ShareItemForm";
import ShareItemPreview from "../../components/ShareItemPreview/ShareItemPreview";

const Share = ({ classes, tags }) => {
  return (
    <div className={classes.sharePages}>
      <ShareItemPreview  classes={classes} />
      <ShareItemForm
        tags={tags}
        classes={classes}
        className={classes.shareform}
      />
    </div>
  );
};

export default withStyles(styles)(Share);
