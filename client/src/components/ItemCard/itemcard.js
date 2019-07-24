import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import {ViewerContext }from "../../context/ViewerProvider";
import Gravatar from 'react-gravatar';
// import Moment from 'react-moment'

const ItemCard = ({ classes, item }) => {
  console.log(item)
  return (
    <ViewerContext.Consumer>
      {({viewer})=>(
    <Card className={classes.itemcard}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={item.imageurl}
          title={item.title}
        />
        <CardContent>
          <div className={classes.itemownerdiv}>
        <Gravatar 
            className= {classes.usericon}
            email={item.itemowner.email || viewer.email } />
            <span>
            <p>{item.itemowner.fullname} </p>
            {/* <Moment>{item.created}</Moment> */}
              </span>
            </div>
          <h1 className={classes.itemtitle}>{item.title}</h1>
          {item.tags.map(tag => {
            return (
              <p className={classes.tagTitle} key={tag.id}>
                {tag.title}
              </p>
            );
          })}
          <p>{item.description}</p>

          <Button variant="contained" className={classes.borrowbutton}>
            <span className={classes.buttontext}>Borrow</span>
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
      )}
    </ViewerContext.Consumer>
  );
};

export default withStyles(styles)(ItemCard);
