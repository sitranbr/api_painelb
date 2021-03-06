var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const fs = require("fs");

var routes = require("./routes/index");
var users = require("./routes/users");
var apiRoutes = require("./routes/api");

var app = express();

app.engine("html", require("ejs").renderFile);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));

app.use(bodyParser.urlencoded({
  limit: "1000mb",
  extended: false
}));
app.use(bodyParser.json({limit: "1000mb"}));


app.use(cookieParser());


//app.use("/", routes);
app.use("/users", users);
app.use("/api", apiRoutes);

app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});



//app.listen(3000, () => console.log('Server ready'))

module.exports = app;
