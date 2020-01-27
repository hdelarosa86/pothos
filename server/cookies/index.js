//const cookieRouter = require("express").Router();
const express = require("express");
const app = express();
const { User } = require("../db/index");
const chalk = require("chalk");
const moment = require("moment");

//cookieRouter.use(require("./login"));
//cookieRouter.use("/logout", require("./logout"));

app.use((req, res, next) => {
  if (req.cookies.id) {
    User.findByPk(req.cookies.id)
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

app.get("/login/verifyUser", (req, res, next) => {
  console.log("hitting verify user route");
  if (req.loggedIn) {
    res.send(req.user);
  } else {
    res.send({ id: "guest", firstName: "Guest" });
    //Need to come up with a better else res.send
    //this is just a placeholder for the Redux Store
  }
});

// app.post("/logout", (req, res, next) => {
//   if (req.loggedIn) {
//     req.loggedIn = false;
//     req.user = null;
//     res.clearCookie("id", { path: "/" });
//     res.end();
//   } else {
//     res.sendStatus(401);
//   }
// });

app.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({
    where: {
      email,
      password
    }
  })
    .then(user => {
      if (!user) {
        res.status(401);
        console.error(new Error(chalk.red(`User not Found ${res.statusCode}`)));
        // res.send("User Not Found");
        res.sendStatus(401);
      } else {
        return res
          .status(202)
          .cookie("id", user.id, {
            path: "*",
            expires: moment
              .utc()
              .add(1, "day")
              .toDate()
          })
          .send(user);
      }
    })
    .catch(err => {
      res.status(500);
      console.error(err);
      next();
    });
});






app.use((req, res, next) => {
  const err = new Error("Route not found");
  console.error(err);
  err.status = 404;
  next(err);
});

// cookieRouter.use((req, res, next) => {
//   const err = new Error("Route not found");
//   console.error(err);
//   err.status = 404;
//   next(err);
// });

module.exports = app;
