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
 *
 * @object port
 * @desc Holds the value of the port the server runs on
 * @type {String}
 */
var app
    , connect = require("connect")
    , express = require("express")
    , fs      = require("fs")
    , io      = require("socket.io")
    , port    = (process.env.PORT || 8081)
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
var server = express.createServer();
server.configure(function(){
    server.set("views", path + "/views");
    server.set("view options", { layout: false });
    server.use(connect.bodyParser());
    server.use(express.cookieParser());
    server.use(express.session({secret: "sh44FSFEIPANVPOEANVh5h55h66h7h7x01hhh!"}));
    server.use(connect.static(path + "/static"));
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
 * @method app.listen()
 * @desc Starts the node server
 * @param {Object} port
 */
server.listen(port);

/**
 * @class sio
 * @desc Starts the web sockets for the server
 * @param {Object} port
 */
var sio = io.listen(server);

/**
 * @namespace sio.sockets
 * @desc Starts the node server
 */
sio.sockets.on("connection", function(socket) {
  console.log("Client Connected");

  /**
   * @method socket.on()
   * @desc 
   */
  socket.on("message", function(data) {
    socket.broadcast.emit("server_message", data);
    socket.emit("server_message", data);
  });
  socket.on("disconnect", function() {
    console.log("Client Disconnected.");
  });

  socket.on("api", function(request) {
    var controller = request.controller;
    var action = request.action;
    
    require("./controllers/" + controller).setup(action, socket);
  });
});

/**
 * Display message to server console that the server is now ready to be listened to
 */
console.log("Jukebox's server is now listening at: http://0.0.0.0:" + port);