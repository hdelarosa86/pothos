const cookieRouter = require("express").Router();
const express = require("express");
const app = express();
const { User } = require("../db/index");
const chalk = require("chalk");
const moment = require("moment");
const passport = require("passport");

cookieRouter.use((req, res, next) => {
  if (req.cookies.sessionId) {
    User.findByPk(req.cookies.sessionId)
      .then(user => {
        if (user) {
          req.loggedIn = true;
          req.user = user;
          next();
        } else {
          next();
        }
      })
      .catch(err => {
        console.error(err);
        next();
      });
  } else {
    next();
  }
});

cookieRouter.post("/login", (req, res, next) => {
  User.findOne({
    where: req.body
  })
    .then(user => {
      if (!user) {
        res.sendStatus(401);
        console.error(new Error(chalk.red(`User not Found ${res.statusCode}`)));
      } else {
        req.session.userId = user.id;
        req.loggedIn = true;
        res
          .status(200)
          .cookie("sessionId", req.session.userId, {
            path: "*",
            expires: moment
              .utc()
              .add(1, "years")
              .toDate()
          })
          .send(user);
      }
    })
    .catch(next);
});

cookieRouter.post("/logout", (req, res, next) => {
  if (req.loggedIn) {
    req.loggedIn = false;
    req.user = null;
    res.clearCookie("sessionId", { path: "/" });
    res.clearCookie("connect.sid", { path: "/" });
    res.end();
  } else {
    console.log("hitting route here");
    res.status(401).redirect("/");
  }
});

cookieRouter.get("/verifyUser", (req, res, next) => {
  if (req.cookies.sessionId) {
    res.send(req.user);
  } else {
    res.send({ id: "guest", firstName: "Guest" });
    //next();
    //Need to come up with a better else res.send
    //this is just a placeholder for the Redux Store
  }
});

app.use((req, res, next) => {
  const err = new Error("Route not found");
  console.error(err);
  err.status = 404;
  next(err);
});

module.exports = cookieRouter;
