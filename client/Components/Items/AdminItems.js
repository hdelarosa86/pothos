import { Link } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import { deleteItemThenFetchAll } from "../../Redux/Items/actions/items.actions";
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

const AdminItems = ({ item, deleteItem }) => {
  const classes = useStyles();

  // const handleOnClickDelete = (e, id) => {
  //   console.log("here: ", id);
  //   e.preventDefault();
  //   deleteItem(id)
  //     .then(() => {
  //       console.log("Success");
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  // };
  return (
    <div className="admin-item">
      <Card id="itemPreviewCard" className={classes.card}>
        <Link to={`/admin/shop/${item.id}`}>
          <CardActionArea>
            <CardMedia className={classes.media} image={item.imageUrl} />
            <CardContent>
              <Typography>{item.name}</Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        <Link to={`/admin/item/${item.id}/update`}>
          <button className="edit">Edit</button>
        </Link>
        <br />
        {/* <button
          className="delete"
          onClick={e => handleOnClickDelete(e, item.id)}
        >
          Delete
        </button> */}
      </Card>
    </div>
  );
};

deleteItemThenFetchAll;
const mapDispatchToProps = dispatch => {
  return {
    deleteItem: item => dispatch(deleteItemThenFetchAll(item))
  };
};
const mapStateToProps = state => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AdminItems);
