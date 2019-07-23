import React, { Component } from "react";
import styles from "./styles";
import Icon from "@material-ui/core/Icon";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import logo from "../../images/boomtown.svg";
const Header = ({ classes }) => {
  return (
    <div className={classes.header}>
      <a href="#">
        {" "}
        <img className={classes.logo} src={logo} />{" "}
      </a>

      <h4 className={classes.sharetext}>Share Something</h4>
    </div>
  );
};

export default withStyles(styles)(Header);
