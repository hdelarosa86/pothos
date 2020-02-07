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
    maxWidth: 350
  },
  media: {
    height: 300
  }
});

const AdminItems = ({ item }) => {
  const classes = useStyles();
  return (
    <Card id="itemPreviewCard" className={classes.card}>
      <CardActionArea>
        <CardMedia className={classes.media} image={item.imageUrl} />
        <CardContent>
          <Typography>{item.name}</Typography>
        </CardContent>
      </CardActionArea>
      <button>Edit</button>
      <button>Delete</button>
    </Card>
  );
};

export default AdminItems;
