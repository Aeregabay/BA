const router = require("./routes");
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const database = require("./database");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");
const cookieParser = require("cookie-parser");
const secret = "realmadrid";
const cors = require("cors");
const fileUpload = require("express-fileupload");
const SqlString = require("sqlstring");
const next = require("next");
const app = next({ dev: process.env.NODE_ENV !== "production" });
const express = require("express");
const handler = router.getRequestHandler(app);

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
      let sqlSearch = SqlString.format(
        "SELECT username FROM users WHERE username = ?;",
        [req.body.username]
      );
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
            let sql = SqlString.format(
              "INSERT INTO users (username, pw, profile_pic, eth_account, kycKey) VALUES (?, ?, 'icon.png', ?, ?);",
              [username, hash, req.body.userAddress, req.body.kycKey]
            );
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

    //change password or email address
    server.post("/changeData", (req, res) => {
      let type = req.body.type;
      let userId = req.body.userId;
      let oldPassword = req.body.oldPw;
      let newPassword = req.body.newPw;
      let newEmail = req.body.email;

      //if password is being changed
      if (type === "pw") {
        database.connection.query(
          SqlString.format("SELECT pw FROM users WHERE id = ?;", [userId]),
          (err, result) => {
            if (err) {
              console.error(err);
            } else {
              bcrypt.compare(oldPassword, result[0].pw, (err, result2) => {
                if (result2) {
                  bcrypt.hash(newPassword, 10, (err, hash) => {
                    if (err) {
                      console.error(err);
                    } else {
                      console.log(hash);
                      database.connection.query(
                        SqlString.format(
                          "UPDATE users SET pw = ? WHERE id = ?;",
                          [hash, userId]
                        ),
                        (err, result3) => {
                          if (err) {
                            console.error(err);
                          } else {
                            console.log("password changed");
                            res.status(200).json({ success: true });
                          }
                        }
                      );
                    }
                  });
                } else {
                  console.error(err);
                }
              });
            }
          }
        );
      }
      //if email is being changed
      if (type === "email") {
        database.connection.query(
          SqlString.format("UPDATE users SET email = ? WHERE id = ?;", [
            newEmail,
            userId
          ]),
          (err, result) => {
            if (err) {
              console.error(err);
            } else {
              console.log("email changed");
              console.log(result);
              res.status(200).json({ success: true });
            }
          }
        );
      }
    });

    //Login User and check whether login data is in DB
    //if not, rederict to register
    //if yes, redirect to myprofile
    server.post("/login", urlEncodedParser, (req, res) => {
      let sql = SqlString.format(
        "SELECT * FROM users WHERE users.username = ?;",
        [req.body.username]
      );
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
              console.log("password incorrect");
              res.status(200).json({
                success: false,
                password: false
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
        let sql = SqlString.format(
          "SELECT * FROM users WHERE users.username = ?;",
          [username]
        );
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

        //update seller email address in DB
        database.connection.query(
          SqlString.format("UPDATE users SET email = ? WHERE username = ?;", [
            req.body.email,
            username
          ]),
          (err, emailRes) => {
            if (err) {
              console.error(err);
            } else {
              console.log("seller email address inserted");
            }
          }
        );

        //assign multipleOf = 0 for the first object in an inventory
        let multipleOf;
        if (req.body.multipleOf === undefined) {
          multipleOf = 0;
        } else {
          multipleOf = req.body.multipleOf;
        }

        //SQL statement to insert object details into DB, also retrieve the newly created objectId to use later
        let objectSql = SqlString.format(
          "INSERT INTO objects (uid, title, amount, multiple_of, description, price, owner, category, status) VALUES (?,?,?,?,?,?,?,?); SELECT LAST_INSERT_ID();",
          [
            req.body.uid,
            req.body.title,
            req.body.amount,
            multipleOf,
            req.body.description,
            req.body.price,
            username,
            req.body.category,
            req.body.status
          ]
        );

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

        //interval to prevent empty headers to be sent and methods to try and set headers after sending
        let intervalTwo = setInterval(() => {
          if (objectId !== undefined) {
            //TAGS INSERTION BLOCK
            //this block transforms req.body.currentValues into the array we need to
            //insert into the INSERT statement
            let tags = req.body.currentValues;
            let finalTags = tags.split(",");

            //initiate the statement and append the statement for each tag inside the tags array
            //for this, multiple execution has to be enabled in MySQL
            let tagsSql = "";
            for (let i = 0; i < finalTags.length; i++) {
              tagsSql += SqlString.format(
                "INSERT INTO tags (corresp_obj_id, content) VALUES (?, ?);",
                [objectId, finalTags[i]]
              );
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
                  picsSql += SqlString.format(
                    "INSERT INTO pics (corresp_obj_id, name) VALUES (?, ?);",
                    [objectId, picName]
                  );
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
            //if successful, clear interval
            clearInterval(intervalTwo);
          }
        }, 10);
      }
      //interval waiting for the object to be inserted before sending status back to the client
      let interval = setInterval(() => {
        if (objectId !== undefined) {
          //if everything succeeded, send confirmation to client side
          res.status(200).json({
            success: true,
            message: "The object has successfully been inserted into the DB",
            objectId: objectId
          });
          clearInterval(interval);
        }
      }, 50);
    });

    //function to update the owner of an item as soon as it is purchased
    server.post("/purchaseItem", urlEncodedParser, (req, res) => {
      let buyer = req.body.buyer;
      let objectId = req.body.objectId;
      let shippingAddress = req.body.shippingAddress;

      database.connection.query(
        SqlString.format(
          //After updating, retrieve amount of this particular object, if > 1,
          //then all the remaining objects in inventory are now assigned to this one
          "UPDATE objects SET buyer = ?, shippingAddress = ?, status= 'shipping' WHERE id = ?;" +
            "SELECT amount FROM objects WHERE id = ?; SELECT id FROM objects WHERE multiple_of = ?",
          [buyer, shippingAddress, objectId, objectId, objectId]
        ),
        (err, result) => {
          if (err) {
            console.log("The object transfer has failed");
          } else {
            console.log(
              "The object with id " + objectId + " was bought by " + buyer
            );
            //activate next item in inventory, if there is inventory
            //multipleOf of all remaining objects is first set to newly assigned "displayobject", then
            //displayobjects's multipleOf is set = 0 in order to be displayed
            if (result[1][0].amount > 1) {
              database.connection.query(
                SqlString.format(
                  "UPDATE objects SET multiple_of = ? WHERE multiple_of = ?; UPDATE objects SET multiple_of = 0 WHERE id = ?;",
                  [result[2][0].id, objectId, result[2][0].id]
                ),
                (err, updateRes) => {
                  if (err) {
                    console.error(err);
                  } else {
                    console.log("next object is available for sale now");
                  }
                }
              );
            }
          }
          res.status(200).json({ success: true });
        }
      );
    });

    server.post("/deleteItem", urlEncodedParser, (req, res) => {
      let objectId = req.body.id;

      database.connection.query(
        SqlString.format("DELETE FROM objects WHERE id = ?;", [objectId]),
        (err, result) => {
          if (err) {
            console.error(err);
          } else {
            console.log(
              "Object with id " +
                objectId +
                " has successfully been deleted from the DB"
            );
            res.status(200).json({ success: true });
          }
        }
      );
    });

    server.post("/confirmPurchase", urlEncodedParser, (req, res) => {
      let buyer = req.body.buyer;
      let objectId = req.body.objectId;

      database.connection.query(
        SqlString.format(
          "UPDATE objects SET owner = ?, buyer = '', shippingAddress = '', status = 'sold' WHERE id = ?",
          [buyer, objectId]
        ),
        (err, result) => {
          if (err) {
            console.log("The object transfer has failed");
          } else {
            console.log(
              "The object with id " + objectId + " was bought by " + buyer
            );
            res.status(200).json({ success: true });
          }
        }
      );
    });

    //function returns the ethereum addresses of seller and buyer as they are situated on an item page
    server.post("/getEthAccounts", urlEncodedParser, (req, res) => {
      let cookie = req.cookies["x-access-token"];
      let buyer;
      let seller = req.body.seller;
      let buyerAddress;
      let sellerAddress;

      if (cookie) {
        jwt.verify(cookie, secret, (err, decoded) => {
          if (err) {
            console.log("no cookie available");
          } else {
            buyer = decoded.username;

            database.connection.query(
              SqlString.format(
                "SELECT eth_account FROM users WHERE username = ?",
                [buyer]
              ),
              (err, buyerRes) => {
                if (err) {
                  console.log(err);
                  console.log("buyer retrieval has failed");
                } else {
                  buyerAddress = buyerRes[0].eth_account;
                  console.log("buyer retrieval successful");

                  database.connection.query(
                    SqlString.format(
                      "SELECT eth_account, email FROM users WHERE username = ?",
                      [seller]
                    ),
                    (err, sellerRes) => {
                      if (err) {
                        console.log(err);
                        console.log("seller retrieval has failed");
                      } else {
                        sellerAddress = sellerRes[0].eth_account;
                        console.log("seller retrieval successful");

                        res.status(200).json({
                          cookie,
                          username: buyer,
                          buyerAddress: buyerAddress,
                          sellerAddress: sellerAddress,
                          sellerEmail: sellerRes[0].email,
                          success: true
                        });
                      }
                    }
                  );
                }
              }
            );
          }
        });
      }
    });

    //get all users to display on admin page
    server.post("/getUsers", urlEncodedParser, (req, res) => {
      database.connection.query(
        SqlString.format("SELECT * FROM users;"),
        (err, result) => {
          if (err) {
            console.error(err);
          } else {
            res.status(200).json({ success: true, users: result });
          }
        }
      );
    });

    //get single user, all corresponding objects
    server.post("/getUser", urlEncodedParser, (req, res) => {
      let userId = req.body.userId;
      database.connection.query(
        SqlString.format(
          "SELECT id, username, eth_account, email FROM users WHERE id = ?;",
          [userId]
        ),
        (err, result) => {
          if (err) {
            console.error(err);
          } else {
            console.log("user retrieval success");
            if (result.length > 0) {
              let username = result[0].username;
              database.connection.query(
                // check if object is not a multiple of another, hence back in the inventory stack
                SqlString.format(
                  "SELECT * FROM objects WHERE owner = ? AND multiple_of = 0;",
                  [username]
                ),
                (err, objResult) => {
                  if (err) {
                    console.error(err);
                  } else {
                    console.log("objects retrieval success");
                    let objectIds = [];
                    for (let i = 0; i < objResult.length; i++) {
                      objectIds.push(objResult[i].id);
                    }
                    if (objectIds.length < 1) {
                      res.status(200).json({ success: true, user: result[0] });
                    } else {
                      //create multiple statement query for picture retrieval
                      let picsQuery =
                        "SELECT * FROM pics WHERE corresp_obj_id IN (";
                      for (let i = 0; i < objectIds.length; i++) {
                        picsQuery += objectIds[i] + ", ";
                      }
                      picsQuery = picsQuery.slice(0, picsQuery.length - 2);
                      picsQuery += ");";
                      database.connection.query(
                        picsQuery,
                        (err, picsResult) => {
                          if (err) {
                            console.error(err);
                          } else {
                            console.log("pics retrieval success");

                            //alter picture query by replacing "pics" with "tags"
                            tagsQuery = picsQuery.replace("pics", "tags");
                            database.connection.query(
                              tagsQuery,
                              (err, tagsResult) => {
                                if (err) {
                                  console.error(err);
                                } else {
                                  console.log("tags retrieval success");
                                  res.status(200).json({
                                    success: true,
                                    user: result[0],
                                    objects: objResult,
                                    pics: picsResult,
                                    tags: tagsResult
                                  });
                                }
                              }
                            );
                          }
                        }
                      );
                    }
                  }
                }
              );
            } else {
              res.status(200).json({ success: false });
            }
          }
        }
      );
    });

    //decode username from browser cookie
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

    //delete user cookie on logout
    server.post("/deleteCookie", urlEncodedParser, (req, res) => {
      res.clearCookie("x-access-token");
      res.status(200).send({ message: "successful logout" });
    });

    //fetch all tags for a specific item
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
      // only objects that are not multiple of another are returned
      if (req.body.objectIds) {
        objectSql =
          "SELECT * FROM objects WHERE id IN (" +
          req.body.objectIds +
          ") AND multiple_of = 0;";
      } else {
        //select statement for 12 objects from DB to display
        //this is done on browse page startup (without search query)
        objectSql = "SELECT * FROM objects WHERE multiple_of = 0 LIMIT 12;";
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
                //push all tags into returing array
                for (let i = 0; i < tags.length; i++) {
                  resultingTags.push(tags[i]);
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
                  resultingPics.push(pics[i]);
                }
              }
            });
          }
        }
      });
      //interval to prevent status to be sent before sql queries are returned
      //without this, empty arrays are sent to client and headers will be tried to be set
      //after they've been sent, which results in an error
      let interval = setInterval(() => {
        if (
          objectIds !== undefined &&
          objectsToSend !== undefined &&
          resultingTags !== undefined &&
          resultingPics !== undefined
        ) {
          res.status(200).send({
            objectIds,
            objectsToSend,
            resultingTags,
            resultingPics,
            message: "The object retrieval has been successful",
            success: true
          });
          clearInterval(interval);
        }
      }, 50);
    });

    //fetch up to 4 random objects from the DB to display on the homepage
    server.post("/getRandomObjects", urlEncodedParser, (req, res) => {
      let allObjectIds = [];
      let idsToQuery = [];

      //query all object ids to choose from
      database.connection.query(
        SqlString.format("SELECT id FROM objects"),
        (err, objectIds) => {
          if (err) {
            console.error(error);
          } else if (objectIds.length < 1) {
            console.log("there is nothing to display");
          } else {
            for (let i = 0; i < objectIds.length; i++) {
              allObjectIds.push(objectIds[i].id);
            }

            //push up to 4 random objectIds into the idsToQuery array
            //in case there are less than 4 objects in the DB, all of them will be displayed
            while (
              idsToQuery.length < 4 &&
              idsToQuery.length !== allObjectIds.length
            ) {
              let randomId =
                allObjectIds[Math.floor(Math.random() * allObjectIds.length)];
              if (!idsToQuery.includes(randomId)) {
                idsToQuery.push(randomId);
              }
            }
            //only objects that are not a multiple of another are returned
            let query =
              "SELECT * FROM objects WHERE id IN (" +
              idsToQuery +
              ") AND multiple_of = 0;";
            database.connection.query(query, (err, objects) => {
              if (err) {
                console.error(err);
              } else {
                let tagQuery =
                  "SELECT * FROM tags WHERE corresp_obj_id IN (" +
                  idsToQuery +
                  ")";
                database.connection.query(tagQuery, (err, tags) => {
                  if (err) {
                    console.error(err);
                  } else {
                    let pictureQuery =
                      "SELECT * FROM pics WHERE corresp_obj_id IN (" +
                      idsToQuery +
                      ")";
                    database.connection.query(pictureQuery, (err, pictures) => {
                      if (err) {
                        console.error(err);
                      } else {
                        res.status(200).send({
                          success: true,
                          objects,
                          tags,
                          pictures
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        }
      );
    });

    //fetch item information
    server.post("/item", (req, res) => {
      let objectId = req.body.id;

      //check whether object is a multiple of another item, if yes, don't allow access
      database.connection.query(
        SqlString.format("SELECT multiple_of FROM objects WHERE id = ?;", [
          objectId
        ]),
        (err, checkRes) => {
          if (err) {
            console.error(err);
          } else {
            if (checkRes[0].multiple_of !== 0) {
              res.status(200).send({ success: false });
            } else {
              let getObjectSql = SqlString.format(
                "SELECT * FROM objects WHERE id = ?;",
                [objectId]
              );
              let tagSql = SqlString.format(
                "SELECT content FROM tags WHERE corresp_obj_id = ?;",
                [objectId]
              );
              let picSql = SqlString.format(
                "SELECT name FROM pics WHERE corresp_obj_id = ?;",
                [objectId]
              );

              let object;
              let tags = [];
              let pics = [];

              database.connection.query(getObjectSql, (err, resObject) => {
                if (err) {
                  console.log(err);
                  console.log(
                    "The retrieval of object #" + objectId + " has failed."
                  );
                } else if (resObject.length > 0) {
                  object = resObject;
                  database.connection.query(
                    SqlString.format(
                      "SELECT id FROM users WHERE username = ?;",
                      [object[0].owner]
                    ),
                    (err, userResult) => {
                      if (err) {
                        console.error(err);
                      } else {
                        console.log("user id retrieval success");
                        database.connection.query(tagSql, (err, resTags) => {
                          if (err) {
                            console.log(err);
                            console.log(
                              "The retrieval of tags for object #" +
                                objectId +
                                " has failed."
                            );
                          } else {
                            tags = resTags;
                            database.connection.query(
                              picSql,
                              (err, resPics) => {
                                if (err) {
                                  console.log(err);
                                  console.log(
                                    "The retrieval of pics for object #" +
                                      objectId +
                                      " has failed."
                                  );
                                } else {
                                  pics = resPics;
                                  res.status(200).send({
                                    success: true,
                                    object,
                                    tags,
                                    pics,
                                    id: objectId,
                                    sellerId: userResult[0].id
                                  });
                                }
                              }
                            );
                          }
                        });
                      }
                    }
                  );
                } else {
                  res.status(200).json({ success: false });
                }
              });
            }
          }
        }
      );
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

    //register report
    server.post("/report", (req, res) => {
      let reporter = req.body.user;
      let report = req.body.message;
      let id = req.body.id;

      database.connection.query(
        SqlString.format(
          "INSERT INTO reports (content, objectId, reporter) VALUES (?, ?, ?);",
          [report, id, reporter]
        ),
        (err, result) => {
          if (err) {
            console.error(err);
          } else {
            console.log("Report successfully written to DB");
            res.status(200).json({ success: true });
          }
        }
      );
    });

    //fetch reports for admin
    server.post("/getReports", (req, res) => {
      database.connection.query(
        SqlString.format("SELECT * FROM reports"),
        (err, result) => {
          if (err) {
            console.error(err);
          } else {
            console.log("Report successfully written to DB");
            res.status(200).json({ success: true, data: result });
          }
        }
      );
    });

    //delete a report
    server.post("/deleteReport", (req, res) => {
      let id = req.body.reportId;
      database.connection.query(
        SqlString.format("DELETE FROM reports WHERE id = ?;", [id]),
        (err, result) => {
          if (err) {
            console.error(err);
          } else {
            console.log("Report successfully deleted from DB");
            res.status(200).json({ success: true });
          }
        }
      );
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

      //insert picture names into DB and move the files to /static folder
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
      let tagQuery = SqlString.format(
        "DELETE FROM tags WHERE corresp_obj_id = ?;",
        [req.body.id]
      );

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

//unprotected sites check
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

//check for admin rights in order to access admin page
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

//check for login
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
