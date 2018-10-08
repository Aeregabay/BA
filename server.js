const next = require("next");
const routes = require("./routes");
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handler = routes.getRequestHandler(app);

const express = require("express");
app
  .prepare()
  .then(() => {
    const server = express();
    server.listen(3000, err => {
      if (err) throw err;
      console.log("Listening on Localhost:3000");
    });
    server.get("*", (req, res) => {
      return handler(req, res);
    });
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });
