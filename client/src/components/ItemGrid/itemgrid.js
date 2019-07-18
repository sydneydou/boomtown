import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AccountForm from '../../components/AccountForm';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const ItemGrid = ({ classes, items}) => {
  
  return (
    <Grid container spacing={2}>
    
      <Grid item xs={12} justify="center">
        <Grid container >
         

          {/* <ItemCard /> */}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(ItemGrid);
