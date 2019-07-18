import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AccountForm from '../../components/AccountForm';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ItemCard from '../ItemCard'

const ItemGrid = ({ classes, items}) => {
  
  return (
    <Grid container spacing={2}>
      
        {items.map(item => (
          <Grid item xs={12} justify="center">
           <ItemCard item={item}/>
           </Grid>
        ))}
      
    </Grid>
  );
};

export default withStyles(styles)(ItemGrid);
