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

<<<<<<< HEAD
// No início do arquivo
/* const Redis = require('ioredis');

// Configuração do cliente Redis
const redis = new Redis({
  host: process.env.CACHE_SERVER
});

// Middleware de cache para rotas GET
const cacheMiddleware = (req, res, next) => {
  if (req.method !== 'GET') {
    return next();
  }

  const cacheKey = `cache:${req.originalUrl}`;

  redis.get(cacheKey, (err, cachedData) => {
    if (err) {
      return next(err);
    }

    if (cachedData) {
      res.setHeader('X-Cache', 'HIT');
      res.send(JSON.parse(cachedData));
    } else {
      res.originalSend = res.send;
      res.send = (data) => {
        redis.set(cacheKey, data, 'EX', 60); // Cache por 60 segundos
        res.setHeader('X-Cache', 'MISS');
        res.originalSend(data);
      };
      next();
    }
  });
};

// Use o middleware de cache no aplicativo
app.use(cacheMiddleware);
 */

=======
>>>>>>> c1959a6322be6b65e152ee4e7785755463667ed1


//app.listen(3000, () => console.log('Server ready'))

module.exports = app;
