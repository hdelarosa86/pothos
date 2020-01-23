const cookieRouter = require("express").Router();

cookieRouter.use("/login", require("./login"));

cookieRouter.use((req, res, next) => {
  const err = new Error("Route not found");
  console.error(err);
  err.status = 404;
  next(err);
});

module.exports = cookieRouter;
