const apiRouter = require("express").Router();

// API ROUTES
//API ROUTES GO HERE//

apiRouter.use("/items", require("./items"));
apiRouter.use("/users", require("./users"));
apiRouter.use("/carts", require("./carts"));
apiRouter.use("/cart-items", require("./cartItems"));
apiRouter.use("/payment", require("./payment"));

apiRouter.use((req, res, next) => {
  const err = new Error("API route not found");
  console.error(err);
  err.status = 404;
  next(err);
});

module.exports = apiRouter;
