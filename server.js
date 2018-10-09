const next = require("next");
const routes = require("./routes");
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handler = routes.getRequestHandler(app);
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const database = require("./database");
const bcrypt = require("bcrypt");
const express = require("express");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const secret = "realmadrid";

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

    //Register Data (probably not used in future) in DB
    server.use(bodyParser.text());
    server.use(bodyParser.json());
    server.post("/register", urlEncodedParser, (req, res) => {
      //check whether username already exists in DB
      let sqlSearch =
        "SELECT username FROM users WHERE username = '" +
        req.body.username +
        "'";
      database.connection.query(sqlSearch, (err, result) => {
        //if query fails
        if (err) {
          console.log("Query Error");
          console.log(err);
          //if username already exists
        } else if (result.length) {
          console.log("Username already exists, please choose another one.");
          res
            .status(400)
            .json({ success: false, message: "Username aleady exists in DB" });
          //if username can be used, write to DB
        } else {
          var username = req.body.username;
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            let sql =
              "INSERT INTO users (username, pw) VALUES ('" +
              username +
              "', '" +
              hash +
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
        }
      });
    });

    //Login User and check whether login data is in DB
    //if not, rederict to register
    //if yes, redirect to myprofile
    server.post("/login", urlEncodedParser, (req, res) => {
      let sql =
        "SELECT * FROM users WHERE users.username = '" +
        req.body.username +
        "'";

      database.connection.query(sql, (err, result) => {
        //if query fails
        if (err) {
          console.log("Username entered incorrectly, please try again");
          console.log(err);
          //if user exists and result has length property
        } else if (result.length) {
          console.log("user exists");
          bcrypt.compare(req.body.password, result[0].pw, (err, result2) => {
            if (result2) {
              if (result[0].admin == 1) {
                let adminToken = jwt.sign(
                  {
                    username: req.body.username,
                    admin: true,
                    xsrfToken: crypto
                      .createHash("md5")
                      .update(req.body.username)
                      .digest("hex")
                  },
                  secret,
                  {
                    expiresIn: 60 * 60
                  }
                );
                res.status(200).json({
                  success: true,
                  message: "Here is your admin Token",
                  adminToken: adminToken
                });
              } else {
                let userToken = jwt.sign(
                  {
                    username: req.body.username,
                    admin: false,
                    xsrfToken: crypto
                      .createHash("md5")
                      .update(req.body.username)
                      .digest("hex")
                  },
                  secret,
                  {
                    expiresIn: 60 * 60
                  }
                );
                res.status(200).json({
                  success: true,
                  message: "Here is your user Token",
                  token: userToken
                });
              }
            } else {
              console.log(err);
              res.status(400).json({
                success: false,
                message: "The password was incorrect"
              });
            }
          });
        }
      });
    });
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });
