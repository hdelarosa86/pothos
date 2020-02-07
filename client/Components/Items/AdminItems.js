import { Link } from "react-router-dom";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Button,
  CardContent
} from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    maxWidth: 350,
    margin: "20px 0 20px"
  },
  media: {
    height: 300
  }
});

const AdminItems = ({ item }) => {
  const classes = useStyles();
  return (
    <div className="admin-item">
      <Card id="itemPreviewCard" className={classes.card}>
        <Link to={`/shop/${item.id}`}>
          <CardActionArea>
            <CardMedia className={classes.media} image={item.imageUrl} />
            <CardContent>
              <Typography>{item.name}</Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        <button className="edit">Edit</button>
        <br />
        <button className="delete">Delete</button>
      </Card>
    </div>
  );
};

export default AdminItems;
