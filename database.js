var express = require("express");
var mysql = require("mysql");

var database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "mytable",
  multipleStatements: true,
  connectTimeout: 60000
});

database.connect(err => {
  if (err) {
    console.log("Error" + err.message);
  } else {
    console.log("Connected");
  }
});

module.exports.connection = database;
