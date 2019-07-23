import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';

const ItemCard=({classes,item}) => {
    
    return (
      <Card className={classes.itemcard}>
        <CardActionArea>
        <CardMedia
            className={classes.media}
            image= {item.imageurl}
            title={item.title}
          />
          <CardContent>
            
            {/* <p>{item.created}</p> */}
            <h1>{item.title}</h1>
            {/* map over tags again */}
            {/* <p>{item.tags[0].title}</p> */}
            <p>{item.description}</p>
            
            <Button variant="contained" className={classes.borrowbutton}>
              <span className={classes.buttontext}>Borrow</span>
            </Button>
          </CardContent>
          </CardActionArea>
      </Card>
    );
  }


export default withStyles(styles)(ItemCard);
