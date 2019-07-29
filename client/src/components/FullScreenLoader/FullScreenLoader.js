import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import { makeStyles } from '@material-ui/core/styles';

const FullScreenLoader = ({}) => {
  return (
    <div >
      <CircularProgress height='10em'/>
      <p>"For it is in giving that we recieve."</p>
    </div>
  );
};

export default withStyles(styles)(FullScreenLoader);
