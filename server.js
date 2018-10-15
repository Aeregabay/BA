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
const jwtDecode = require("jwt-decode");
const cookieParser = require("cookie-parser");
const secret = "realmadrid";
const cors = require("cors");

app
  .prepare()
  .then(() => {
    const server = express();

    //Register Data (probably not used in future) in DB
    server.use(bodyParser.text());
    server.use(bodyParser.json());
    server.use(cors());
    server.use(cookieParser());
    //protect the pages that should not be available if user is not logged in

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
          //hash password before writing to DB
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
          //if user doesn't exist
        } else if (result.length == 0) {
          console.log("Username or password were incorrect");
          res.status(200).json({
            success: false,
            userExists: false
          });
          //if user exists and result has length property
        } else if (result.length) {
          console.log("user exists");
          bcrypt.compare(req.body.password, result[0].pw, (err, result2) => {
            //if passwords match
            if (result2) {
              //if person logging in has admin privileges
              if (result[0].admin === 1) {
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
                  adminToken: adminToken,
                  admin: 1
                });
                //if person logging in has no admin privileges
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
                  token: userToken,
                  admin: 0
                });
              }
              //if passwords don't match
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

    server.post("/myprofile", urlEncodedParser, (req, res) => {
      let cookie = req.cookies["x-access-token"];
      let decoded = jwtDecode(cookie);
      let username = decoded.username;
      let sql = "SELECT * FROM users WHERE users.username = '" + username + "'";
      database.connection.query(sql, (err, result) => {
        //if query fails
        if (err) {
          console.log("This really shouldn't happen, no username found");
          console.log(err);
        } else {
          res.status(200).json({
            success: true,
            userData: result
          });
        }
      });
    });

    server.post("/getCookie", urlEncodedParser, (req, res) => {
      let cookie = req.cookies["x-access-token"];
      let username;

      if (cookie) {
        jwt.verify(cookie, secret, (err, decoded) => {
          if (err) {
            console.log("no cookie available");
          } else {
            username = decoded.username;
            res.status(200).json({ cookie, username, success: true });
          }
        });
      }
    });

    server.post("/deleteCookie", urlEncodedParser, (req, res) => {
      res.cookie("x-access-token");
      res.status(200).send({ message: "successful logout" });
    });

    server.get("/admin", hasAdminRights, (req, res) => {
      const token = req.cookies["x-access-token"];
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          res.redirect("/error");
        }
        if (decoded.admin[0] === false) {
          console.log(decoded);
          res.redirect("/error");
        } else {
          return next();
        }
      });
    });

    server.get("*", (req, res) => {
      return handler(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log("Listening on Localhost:3000");
    });

    //protect all pages exept the ones below from access without login
    server.use(
      unless(
        ["/login", "/browse", "/index", "/register", "/_next"],
        (req, res, next) => {
          const token = req.cookies["x-access-token"];
          console.log(token);
          if (token) {
            jwt.verify(token, secret, (err, decoded) => {
              if (err) {
                console.log(err);
              } else {
                req.decoded = decoded;
                next();
              }
            });
          } else {
            console.log("You have to be logged in to view this page");
            console.log("You are now being redirected to the login page");
            res.redirect("/login");
          }
        }
      )
    );
  })

  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

function unless(paths, middleware) {
  return function(req, res, next) {
    let isHave = false;
    paths.forEach(path => {
      if (path === req.path || req.path.includes(path)) {
        isHave = true;
        return;
      }
    });
    if (isHave) {
      return next();
    } else {
      return middleware(req, res, next);
    }
  };
}

function hasAdminRights(req, res, next) {
  const token = req.cookies["x-access-token"];
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.log(err);
      } else {
        if (decoded.admin === false) {
          res.redirect("/error");
        } else {
          return next();
        }
      }
    });
  }
}
