const router = require("express").Router();
const axios = require("axios");
const chalk = require("chalk");
const { User } = require("../db/index");
require("dotenv").config();

router.get("/github/login", (req, res, next) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

router.get("/github/callback", (req, res, next) => {
  const { code } = req.query;

  axios
    .post(
      `https://github.com/login/oauth/access_token?code=${code}&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`,
      {},
      {
        headers: {
          Accept: "application/json"
        }
      }
    )
    .then(res => {
      return User.create({
        github_access_token: res.data.access_token
      });
    })
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      console.log(chalk.red("Error authenticating with Github."));
      console.error(err);
    });
});

module.exports = router;
