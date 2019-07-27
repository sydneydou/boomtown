import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

const FullScreenLoader = ({classes}) => {
  return (
    <div display='flex'>
      <CircularProgress height='10em'/>
      <p>"For it is in giving that we recieve."</p>
    </div>
  );
};

export default withStyles(styles)(FullScreenLoader);
