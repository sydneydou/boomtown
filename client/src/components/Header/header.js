import React, { Component } from 'react';
import styles from './styles';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import logo from '../../images/boomtown.svg';
const Header = ({classes}) => {
    
    return (
        <div className={classes.header}>
           <a href='#'> <img className={classes.logo} src={logo} /> </a>

        <Button variant="contained" className={classes.sharebutton}>
            <span className={classes.sharetext}>Share Something</span>
        </Button>
           
        </div>
    );
};

export default withStyles(styles)(Header);