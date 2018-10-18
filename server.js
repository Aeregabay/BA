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
const fileUpload = require("express-fileupload");

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(bodyParser.text());
    server.use(bodyParser.json());
    server.use(cors());
    server.use(cookieParser());
    server.use(fileUpload());

    //Register Data (probably not used in future) in DB
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

    //catch request to admin page and check whether user has adminrights or not
    server.get("/admin", hasAdminRights, (req, res, next) => {
      return next();
    });
    //catch requests to myprofile, sell and settings page and check whether user is logged in or not
    server.get("/myprofile", isLoggedIn, (req, res, next) => {
      return next();
    });
    server.get("/sell", isLoggedIn, (req, res, next) => {
      return next();
    });
    server.get("/settings", isLoggedIn, (req, res, next) => {
      return next();
    });

    //My Profile page request
    server.post("/myprofile", urlEncodedParser, (req, res) => {
      //check if cookie is available
      let cookie = req.cookies["x-access-token"];
      //if available, decode username and fetch data from DB
      if (cookie) {
        let decoded = jwtDecode(cookie);
        let username = decoded.username;
        let sql =
          "SELECT * FROM users WHERE users.username = '" + username + "'";
        database.connection.query(sql, (err, result) => {
          //This error should not be reached, since the user would already be blocked from
          //accessing the my profile page on the client side, if he is not logged in
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
      }
    });

    //insert object details into DB (different tables)
    server.post("/sell", urlEncodedParser, (req, res) => {
      //cookie check, again, user is blocked from client side if not logged in
      //therefore error check on server side not necessary
      let cookie = req.cookies["x-access-token"];
      if (cookie) {
        let decoded = jwtDecode(cookie);
        let username = decoded.username;

        //SQL statement to insert object details into DB
        let objectSql =
          "INSERT INTO objects (title, description, price, owner, category) VALUES ('" +
          req.body.title +
          "', '" +
          req.body.description +
          "', '" +
          req.body.price +
          "', '" +
          username +
          "', '" +
          req.body.category +
          "')";

        //write object to DB
        database.connection.query(objectSql, (err, objectResult) => {
          //if query fails
          if (err) {
            console.log("The object insertion has failed");
            console.log(err);
          } else {
            console.log("object success");
          }
        });

        //statement to get back ObjectId that we need for
        // statements below (tags corresponding to an object)
        let objectIdSql =
          "SELECT id FROM objects WHERE title = '" +
          req.body.title +
          "' AND description = '" +
          req.body.description +
          "' AND price = '" +
          req.body.price +
          "' AND owner = '" +
          username +
          "' AND category = '" +
          req.body.category +
          "'";

        //create objectId variable to write SQL response into it
        let objectId;

        //SQL query to obtain objectId
        database.connection.query(objectIdSql, (err, objectIdResult) => {
          //if query fails
          if (err) {
            console.log("The objectIdSearch has failed");
            console.log(err);
          } else {
            //set objectIt to query result
            objectId = objectIdResult[0].id;
            console.log("objectId retrieval success");

            //TAGS INSERTION BLOCK
            //this block transforms req.body.currentValues into the array we need to
            //insert into the INSERT statement
            let tags = req.body.currentValues;
            let finalTags = tags.split(",");

            //initiate the statement and append the statement for each tag inside the tags array
            //for this, multiple execution has to be enabled in MySQL
            let tagsSql = "";
            for (let i = 0; i < finalTags.length; i++) {
              tagsSql +=
                "INSERT INTO tags (corresp_obj_id, content) VALUES ('" +
                objectId +
                "', '" +
                finalTags[i] +
                "');";
            }

            //actual insertion of tags to DB
            database.connection.query(tagsSql, (err, tagsResult) => {
              //if query fails
              if (err) {
                console.log("The tags insertion has failed");
                console.log(err);
              } else {
                console.log("tag insertion success");

                //PICS INSERTION BLOCK
                //create pics array to write req.files.currentValues into it (tags from client side)
                let pics = [];
                let picKeys = Object.keys(req.files);

                picKeys.forEach(function(key) {
                  pics.push(req.files[key]);
                });
                //Just like with the tags, create concattenated SQL statement to insert each pic
                //in pics array into DB
                let picsSql = "";
                for (let i = 0; i < pics.length; i++) {
                  let picName = username + "_" + pics[i].name;
                  picsSql +=
                    "INSERT INTO pics (corresp_obj_id, name) VALUES ('" +
                    objectId +
                    "', '" +
                    picName +
                    "');";
                }
                //actual SQL query to insert pics into DB
                database.connection.query(picsSql, (err, picsResult) => {
                  //if query fails
                  if (err) {
                    console.log("The pics insertion has failed");
                    console.log(err);
                  } else {
                    console.log("Pic insertion success");

                    //if successfully inserted into DB, move Pics to local static folder
                    for (let i = 0; i < pics.length; i++) {
                      pics[i].mv("static/" + pics[i].name, function(err) {
                        if (err) {
                          return res.status(500).send(err);
                        }
                      });
                    }
                  }
                });
              }
            });
          }
        });
      }
      //if everything succeeded, send confirmation to client side
      res.status(200).json({
        success: true,
        message: "The object has successfully been inserted into the DB"
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
      res.clearCookie("x-access-token");
      res.status(200).send({ message: "successful logout" });
    });

    server.post("/getTags", urlEncodedParser, (req, res) => {
      let tagSql = "SELECT content FROM tags;";

      database.connection.query(tagSql, (err, result) => {
        if (err) {
          console.log("The tag retrieval was not successful..." + err);
        } else {
          res.status(200).json({
            success: true,
            tags: result
          });
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
  } else {
    res.redirect("/error");
  }
}

function isLoggedIn(req, res, next) {
  const token = req.cookies["x-access-token"];
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.log(err);
      } else {
        if (!decoded.username) {
          res.redirect("/error");
        } else {
          return next();
        }
      }
    });
  } else {
    res.redirect("/error");
  }
}
