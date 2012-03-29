/**
 * Server configuration
 */
var serverConf = require('./config/config');

/**
 * @objects Dependecies
 *
 * @class app
 * @desc Represents the node server
 * @type {Object}
 *
 * @module connect
 * @module express
 * @module fs
 * @module io
 */
var app
    , connect = require("connect")
    , express = require("express")
    , fs      = require("fs")
    , url     = require("url");

/**
 * @object path
 * @desc The default path to the static files for the server
 * @type {String}
 */
var path = __dirname;

/**
 * Configuration for express
 */
var server = module.exports = express.createServer();
server.listen(serverConf.port, null);

/**
 * @class sio
 * @desc Starts the web sockets for the server
 * @param {Object} port
 */
var sio = new require('./lib/socket-server.js')(server);

server.configure(function(){
  server.set("views", path + "/views");
  server.set("view options", { layout: false });
  server.use(connect.bodyParser());
  server.use(express.cookieParser());
  server.use(express.session({secret: "sh44FSFEIPANVPOEANVh5h55h66h7h7x01hhh!"}));
  server.use(connect.static(path + "/public"));
  server.use(server.router);
});

/**
 * Configuration for the server errors
 */
server.error(function(err, req, res, next){
  if (err instanceof NotFound) {
    res.render("404.jade", {});
  } else {
    res.render("500.jade", {});
  }
});

/**
 * Blank route so visiting server in HTTP will result in blank screen, otherwise you get a "cannot GET /" error
 */
server.get("/", function(req, res) {
  res.render("blah.jade");
});

/**
 * Display message to server console that the server is now ready to be listened to
 */
console.log('Running in '+(process.env.NODE_ENV || 'development')+' mode @ '+serverConf.uri);