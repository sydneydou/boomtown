import React, { Component } from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import logo from "../../images/boomtown.svg";
import { Mutation } from "react-apollo";
import { LOGOUT_MUTATION } from "../../apollo/queries";
import { Link } from "react-router-dom";
import Icon from '@material-ui/core/Icon';
import client from "../../apollo";
const Header = ({ classes }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  return (
    <Mutation
      mutation={LOGOUT_MUTATION}
      onCompleted={() => client.resetStore()}
    >
      {logout => (
        <div className={classes.header}>
          <Link to="/welcome">
            <img className={classes.logo} src={logo} />{" "}
          </Link>
          <div className={classes.header}>
            <Link to="/share">
              
              <h4 className={classes.sharetext}>Share Something</h4>
            </Link>
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link to="/profile">Profile</Link>
              </MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      )}
    </Mutation>
  );
};

export default withStyles(styles)(Header);
