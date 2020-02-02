const cookieRouter = require("express").Router();
const express = require("express");
const app = express();
const { User, Session, Order } = require("../db/index");
const chalk = require("chalk");
const moment = require("moment");
require("dotenv").config();

const COOKIE_NAME = "sessionId";

cookieRouter.use((req, res, next) => {
  if (!req.cookies[COOKIE_NAME]) {
    Session.create()
      .then(session => {
        res.cookie([COOKIE_NAME], session.id);
        Order.create({ sessionId: session.id })
        next();
      })
      .catch(err => {
        console.log(chalk.redBright("Could not create Session cookie"));
        console.error(
          new Error(chalk.redBright(`${err} Could not create Session cookie`))
        );
        res.redirect("/error");
      });
  } else {
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
  }
});

cookieRouter.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({
    where: {
      email,
      password
    }
  })
    .then(user => {
      if (!user) {
        res.sendStatus(401);
        console.error(new Error(chalk.red(`User not Found ${res.statusCode}`)));
      } else {
        res
          .status(200)
          .cookie("sessionId", user.id, {
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
    res.status(201).redirect("/");
  } else {
    res.status(401).redirect("/");
  }
});

cookieRouter.get("/verifyUser", (req, res, next) => {
  if (req.loggedIn) {
    res.send(req.user);
  } else {
    res.send({ id: "guest", firstName: "Guest" });
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
