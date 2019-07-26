import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Gravatar from "react-gravatar";
import CardActionArea from "@material-ui/core/CardActionArea";
import ItemGrid from "../../components/ItemGrid";

const Profile = ({ classes, data }) => {
  return (
    <div className={classes.profilepage}>
      <Card className={classes.profilecard}>
        <CardActionArea>
          <CardContent>
            <span className={classes.profileblock}>
              <Gravatar className={classes.usericon} email={data.users.email} />
              <h1 className={classes.username}>{data.users.fullname}</h1>
            </span>
            <p className={classes.profileitemcount}>
              {data.users.items.length} Items shared.{" "}
              {data.users.borrowed.length} Items borrowed
            </p>
            <p className={classes.profilebio}>
              {!data.users.bio ? "No bio found" : data.users.bio}
            </p>
          </CardContent>
        </CardActionArea>
      </Card>

      <div >
        {data.users.items.length > 0 ? <h1 className={classes.sharedprofile}> Shared Items </h1> : null}
      </div>

      <ItemGrid items={data.users.items} />
    </div>
  );
};

export default withStyles(styles)(Profile);
