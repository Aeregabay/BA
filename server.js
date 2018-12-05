const next = require("next");
const router = require("./routes");
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handler = router.getRequestHandler(app);
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
const SqlString = require("sqlstring");

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
              "INSERT INTO users (username, pw, profile_pic, eth_account) VALUES ('" +
              username +
              "', '" +
              hash +
              "', '" +
              "icon.png" +
              "', '" +
              req.body.userAddress +
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
                      .createHash("sha256")
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
                      .createHash("sha256")
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
    server.get("/", (req, res, next) => {
      res.redirect("/index");
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
      //create objectId variable to write SQL response into it
      let objectId;
      //cookie check, again, user is blocked from client side if not logged in
      //therefore error check on server side not necessary
      let cookie = req.cookies["x-access-token"];
      if (cookie) {
        let decoded = jwtDecode(cookie);
        let username = decoded.username;

        //SQL statement to insert object details into DB
        let objectSql =
          "INSERT INTO objects (title, description, price, owner, category, status) VALUES ('" +
          req.body.title +
          "', " +
          SqlString.escape(req.body.description) +
          ", " +
          SqlString.escape(req.body.price) +
          ", '" +
          username +
          "', '" +
          req.body.category +
          "', '" +
          req.body.status +
          "'); SELECT LAST_INSERT_ID();";

        //write object to DB
        database.connection.query(objectSql, (err, objectResult) => {
          //if query fails
          if (err) {
            console.log("The object insertion has failed");
            console.log(err);
          } else {
            console.log("object success");
            objectId = objectResult[0].insertId;
          }
        });

        //statement to get back ObjectId that we need for
        // statements below (tags corresponding to an object)
        let objectIdSql =
          "SELECT id FROM objects WHERE title = '" +
          req.body.title +
          "' AND description = " +
          SqlString.escape(req.body.description) +
          " AND price = " +
          SqlString.escape(req.body.price) +
          " AND owner = '" +
          username +
          "' AND category = '" +
          req.body.category +
          "' AND status = '" +
          req.body.status +
          "'";

        // //SQL query to obtain objectId
        // database.connection.query(objectIdSql, (err, objectIdResult) => {
        //   //if query fails
        //   if (err) {
        //     console.log("The objectIdSearch has failed");
        //     console.log(err);
        //   } else {
        //     //set objectIt to query result
        //     objectId = objectIdResult[0].id;
        //     console.log("objectId retrieval success");

        //     //TAGS INSERTION BLOCK
        //     //this block transforms req.body.currentValues into the array we need to
        //     //insert into the INSERT statement
        //     let tags = req.body.currentValues;
        //     let finalTags = tags.split(",");

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
            //create pics array to write req.files into it (pics from client side)
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
                  pics[i].mv(
                    "static/" + username + "_" + pics[i].name,
                    function(err) {
                      if (err) {
                        return res.status(500).send(err);
                      }
                    }
                  );
                }
              }
            });
          }
        });
        //   }
        // });
      }
      let interval = setInterval(() => {
        if (objectId !== undefined) {
          res.status(200).json({
            success: true,
            message: "The object has successfully been inserted into the DB",
            objectId: objectId
          });
          console.log(objectId);
          clearInterval(interval);
        }
      }, 50);
      // console.log(objectResult[0].insertId);
      //if everything succeeded, send confirmation to client side
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

    //get objects from DB to display in /browse page for ItemList component
    server.post("/getObjects", urlEncodedParser, (req, res) => {
      let objectSql;

      //if function is called to update objects (with search query)
      if (req.body.objectIds) {
        objectSql =
          "SELECT * FROM objects WHERE id IN (" + req.body.objectIds + ")";
      } else {
        //select statement for 10 objects from DB to display
        //this is done on browse page startup (without search query)
        objectSql = "SELECT * FROM objects LIMIT 12;";
      }

      //arrays to return in the final statement
      let objectIds = [];
      let resultingTags = [];
      let resultingPics = [];
      let objectsToSend = [];

      //actually fetch objects from DB
      database.connection.query(objectSql, (err, objects) => {
        if (err) {
          console.log("The object retrieval from the DB has failed");
        } else {
          //create objectsId array that we need to fetch the corresponding tags and pics
          for (let i = 0; i < objects.length; i++) {
            objectIds.push(objects[i].id);
          }
          //set query result to local variable to return in the end
          objectsToSend = objects;

          //multiple execution statement for fetching all tags corresponding to a certain item
          for (let i = 0; i < objectIds.length; i++) {
            let correspTags =
              "SELECT * FROM tags WHERE corresp_obj_id = '" +
              objectIds[i] +
              "';";

            //execute statement above
            database.connection.query(correspTags, (err, tags) => {
              if (err) {
                console.log("The tags retrieval from the DB has failed");
              } else {
                //create tag objects to send to client, loop because multiple tags per objectId
                for (let i = 0; i < tags.length; i++) {
                  let tag = [
                    {
                      id: tags[i].id,
                      corresp_obj_id: tags[i].corresp_obj_id,
                      content: tags[i].content
                    }
                  ];
                  //push created tags to array that we return to the client
                  resultingTags.push(tag);
                }
              }
            });
          }

          //exactly the same procedure for pics retrieval (see tag retrieval)
          for (i = 0; i < objectIds.length; i++) {
            let correspPics =
              "SELECT * FROM pics WHERE corresp_obj_id = '" +
              objectIds[i] +
              "';";
            database.connection.query(correspPics, (err, pics) => {
              if (err) {
                console.log("The pics retrieval from the DB has failed");
              } else {
                for (let i = 0; i < pics.length; i++) {
                  let pic = [
                    {
                      id: pics[i].id,
                      corresp_obj_id: pics[i].corresp_obj_id,
                      name: pics[i].name
                    }
                  ];
                  resultingPics.push(pic);
                }
              }
            });
          }
        }
      });
      //timeout to prevent status to be sent before sql queries are returned
      //without this, empty arrays are sent to client and headers will be tried to be set
      //after they've been sent, which results in an error
      setTimeout(function() {
        res.status(200).send({
          objectIds,
          objectsToSend,
          resultingTags,
          resultingPics,
          message: "The object retrieval has been successful",
          success: true
        });
      }, 50);
    });

    server.post("/item", (req, res) => {
      let objectId = req.body.id;
      let getObjectSql = "SELECT * FROM objects WHERE id ='" + objectId + "';";
      let tagSql =
        "SELECT content FROM tags WHERE corresp_obj_id ='" + objectId + "';";
      let picSql =
        "SELECT name FROM pics WHERE corresp_obj_id ='" + objectId + "';";
      let object;
      let tags = [];
      let pics = [];

      database.connection.query(getObjectSql, (err, resObject) => {
        if (err) {
          console.log(err);
          console.log("The retrieval of object #" + objectId + " has failed.");
        } else {
          object = resObject;
          database.connection.query(tagSql, (err, resTags) => {
            if (err) {
              console.log(err);
              console.log(
                "The retrieval of tags for object #" + objectId + " has failed."
              );
            } else {
              tags = resTags;
              database.connection.query(picSql, (err, resPics) => {
                if (err) {
                  console.log(err);
                  console.log(
                    "The retrieval of pics for object #" +
                      objectId +
                      " has failed."
                  );
                } else {
                  pics = resPics;
                  res
                    .status(200)
                    .send({ success: true, object, tags, pics, id: objectId });
                }
              });
            }
          });
        }
      });
    });

    //delete picture from DB
    server.post("/deletePicture", (req, res) => {
      let picture = req.body.picture;
      let query = SqlString.format("DELETE FROM pics WHERE name = ?", [
        picture
      ]);

      database.connection.query(query, (err, result) => {
        if (err) {
          console.log(err);
          console.log("picture deleting has failed");
        } else {
          console.log("picture deleting sucessful");
          res.status(200).send({ success: true });
        }
      });
    });

    //add new pictures to DB after item edit
    server.post("/addNewPictures", (req, res) => {
      let username = req.body.username;
      let objectId = req.body.objectId;
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

      database.connection.query(picsSql, (err, result) => {
        if (err) {
          console.log(
            "there was an error while inserting the pictures into the DB"
          );
        } else {
          console.log("the picture insertion into the DB was successful");

          for (let i = 0; i < pics.length; i++) {
            pics[i].mv("static/" + username + "_" + pics[i].name, function(
              err
            ) {
              if (err) {
                return res.status(500).send(err);
              }
            });
          }
        }
      });
      res.status(200).send({ success: true });
    });
    //updates items in the DB
    server.post("/updateContent", (req, res) => {
      let query = SqlString.format(
        "UPDATE objects SET title = ?, description = ?, price = ?, category = ? WHERE id = ?",
        [
          req.body.title,
          req.body.description,
          req.body.price,
          req.body.category,
          req.body.id
        ]
      );
      database.connection.query(query, (err, result) => {
        if (err) {
          console.log("updating of object failed");
        } else {
          console.log(
            "update of object with id " + req.body.id + " has been successful"
          );
        }
      });

      //removes old tags to avoid duplicates
      let tagQuery =
        "DELETE FROM tags WHERE corresp_obj_id = '" + req.body.id + "';";

      //adds new tags to the tags table
      for (let i = 0; i < req.body.tags[0].length; i++) {
        tagQuery += SqlString.format(
          "INSERT INTO tags (corresp_obj_id, content) VALUES (?, ?);",
          [req.body.id, req.body.tags[0][i]]
        );
      }
      database.connection.query(tagQuery, (err, tagResult) => {
        if (err) {
          console.log("tag updating failed");
          console.log(err);
        } else {
          console.log("tag updating success");
        }
      });
      res.status(200).send({ success: true });
    });

    //searchterm entry on browse page
    server.post("/search", (req, res) => {
      //take query from client and split into single terms to search individually
      let searchQuery = req.body.query;
      let terms = searchQuery.split(" ");

      //escape the content of the terms (to prevent apostrophes from breaking the sql query)
      //remove the apostrophes around the term after escaping
      for (let i = 0; i < terms.length; i++) {
        terms[i] = SqlString.escape(terms[i]);
        terms[i] = terms[i].substring(1, terms[i].length - 1);
      }

      //array of objectIds to return in the end
      let objectIds = [];

      //look for each term in all the object titles
      //if any title contains the term, the objects id is added to the array
      for (let i = 0; i < terms.length; i++) {
        let titleTerm =
          "SELECT id FROM objects WHERE title LIKE '%" + terms[i] + "%'";
        database.connection.query(titleTerm, (err, titleResult) => {
          if (err) {
            console.log("Term search in objects/title failed");
            console.log(err);
          } else {
            for (let i = 0; i < titleResult.length; i++) {
              objectIds.push(titleResult[i].id);
            }
          }
        });

        //If any tag corresponds or contains the term, it's corresponding object id
        //will be added
        let tagTerm =
          "SELECT corresp_obj_id FROM tags WHERE content LIKE '%" +
          terms[i] +
          "%'";
        database.connection.query(tagTerm, (err, tagResult) => {
          if (err) {
            console.log("Term search in objects/tags failed");
            console.log(err);
          } else {
            for (let i = 0; i < tagResult.length; i++) {
              objectIds.push(tagResult[i].corresp_obj_id);
            }
          }
        });

        //if any object description contains the search term it's object id will be added
        let descriptionTerm =
          "SELECT id FROM objects WHERE description LIKE '%" + terms[i] + "%'";
        database.connection.query(descriptionTerm, (err, descriptionResult) => {
          if (err) {
            console.log("Term search in objects/title failed");
            console.log(err);
          } else {
            for (let i = 0; i < descriptionResult.length; i++) {
              objectIds.push(descriptionResult[i].id);
            }
          }
        });

        //same thing for categories that contain the term
        let categoryTerm =
          "SELECT id FROM objects WHERE category LIKE '%" + terms[i] + "%'";
        database.connection.query(categoryTerm, (err, categoryResult) => {
          if (err) {
            console.log("Term search in objects/title failed");
            console.log(err);
          } else {
            for (let i = 0; i < categoryResult.length; i++) {
              objectIds.push(categoryResult[i].id);
            }
            //this is called as soon as all the terms have been searched for
            if (i === terms.length - 1) {
              //create unique Set of ids (removing duplicates from objectIds)
              let uniqueIds = new Set(objectIds);
              res.status(200).send({ success: true, ids: uniqueIds });
            }
          }
        });
      }
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
        ["/login", "/browse", "/index", "/register", "/_next", "/item/:id"],
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
