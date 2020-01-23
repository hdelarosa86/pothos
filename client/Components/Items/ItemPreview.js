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

const ItemPreview = ({ item }) => {
  const classes = useStyles();
  return (
    <Card id="itemPreviewCard" className={classes.card}>
      <CardActionArea>
        <CardMedia className={classes.media} image={item.imageUrl} />
        <CardContent>
          <Typography>{item.name}</Typography>
        </CardContent>
      </CardActionArea>
      {/* <Link to={`/item/${item.id}`}>VIEW PLANT</Link> */}
    </Card>
  );
};

export default ItemPreview;
