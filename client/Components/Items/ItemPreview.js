import { Link } from "react-router-dom";
import React from "react";
import AdminItems from "./AdminItems";
import { connect } from "react-redux";
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

const ItemPreview = ({ item, admin }) => {
  const classes = useStyles();
  return (
    <div className="col s12 m6 l4 center-align">
      {!admin ? (
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
      ) : (
        <AdminItems item={item} />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  admin: state.user.currentUser.admin
});
export default connect(mapStateToProps, null)(ItemPreview);
