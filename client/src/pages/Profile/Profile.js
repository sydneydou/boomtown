import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Gravatar from "react-gravatar";
import CardActionArea from "@material-ui/core/CardActionArea";

const Profile = ({ classes, data }) => {
  return (
    <div className={classes.profilepage}>
      <Card>
        <CardActionArea>
          <CardContent>
            <span className={classes.profileblock}>
              <Gravatar className={classes.usericon} email={data.users.email} />
              <h1 className={classes.username}>{data.users.fullname}</h1>
            </span>
            <p>
              {data.users.items.length} Items shared.{" "}
              {data.users.borrowed.length} Items borrowed
            </p>
            <p>{!data.users.bio ? "No bio found" : data.users.bio}</p>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default withStyles(styles)(Profile);
