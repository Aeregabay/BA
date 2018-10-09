const next = require("next");
const routes = require("./routes");
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handler = routes.getRequestHandler(app);
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const database = require("./database");

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
    server.use(bodyParser.text());
    server.use(bodyParser.json());
    server.post("/register", urlEncodedParser, (req, res) => {
      console.log(req.body.username);
      let sql =
        "INSERT INTO users (username, pw) VALUES ('" +
        req.body.username +
        "', '" +
        req.body.password +
        "')";

      database.connection.query(sql, (err, result) => {
        if (err) {
          console.log("Query Error");
          console.log(err);
        } else {
          console.log("Query executed, values inserted into 'Users'");
          res.status(200).json({ success: true });
        }
      });
    });
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });
