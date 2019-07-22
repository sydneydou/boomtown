import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const ItemCard=({classes,item}) => {
  console.log(item)
    
    return (
      <Card className={classes.itemcard}>
        <CardContent>
          
          <h1>{item.title}</h1>
          <p>{item.tags[0].title}</p>
          <p>{item.description}</p>
          
          <Button variant="contained" className={classes.button}>
            Borrow
          </Button>
        </CardContent>
      </Card>
    );
  }


export default withStyles(styles)(ItemCard);
