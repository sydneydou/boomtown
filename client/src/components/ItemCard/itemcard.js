import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import { ViewerContext } from "../../context/ViewerProvider";
import Gravatar from "react-gravatar";
import { Link } from "react-router-dom";
const moment = require("moment");

const ItemCard = ({ classes, item }) => {
  return (
    <ViewerContext.Consumer>
      {({ viewer }) => (
        <Link to={"/profile/" + item.itemowner.id}>
          <Card className={classes.itemcard}>
            <CardActionArea>
              <CardMedia
                src={item.imageurl}
                className={classes.media}
                image={item.imageurl}
                title={item.title}
              />
              <CardContent>
                <div className={classes.itemownerdiv}>
                  <Gravatar
                    className={classes.usericon}
                    email={item.itemowner.email || viewer.email}
                  />
                  <span>
                    <p>{item.itemowner.fullname}</p>
                    <span className={classes.datecard}>
                      {moment(item.created).fromNow()}
                    </span>
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
                <p className={classes.itemdescription}>{item.description}</p>

                <div className={classes.borrow}>
                  <span className={classes.buttext}>Borrow</span>
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      )}
    </ViewerContext.Consumer>
  );
};

export default withStyles(styles)(ItemCard);
