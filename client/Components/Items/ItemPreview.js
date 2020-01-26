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
    <div className="col s4 center-align">
      <Card id="itemPreviewCard" className={classes.card}>
        <Link to={`/shop/${item.id}`}>
          <CardActionArea>
            <CardMedia className={classes.media} image={item.imageUrl} />
            <CardContent>
              <Typography>
                {item.name}
                <p>VIEW PLANT</p>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    </div>
  );
};

export default ItemPreview;
