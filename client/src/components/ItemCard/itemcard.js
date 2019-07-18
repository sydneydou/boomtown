import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';


const ItemCard=({classes,item}) => {
    
    return (
      <Card className={classes.itemcard}>
        <CardContent>
          <h1>{item.title}</h1>
          <p>{item.description}</p>
        </CardContent>
      </Card>
    );
  }


export default withStyles(styles)(ItemCard);
