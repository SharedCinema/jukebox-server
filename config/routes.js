/**
 * @route .get("/")
 * @desc The default route
 */
server.get('/', function(req, res) {
  res.render('index.jade', {});
});

/**
 * @route .get("/:controller")
 * @desc Calls a controller's default method (index)
 * @param controller
 */
server.get('/:controller', function(req, res) {
  console.log(url.pathname);

  var controller = require("../controllers/" + name);
  controller.setup(server);

  res.render('index.jade', {});
});

/**
 * @route .get("/")
 * @desc The default route
 */
server.get('/:controller/:action', function(req, res) {
  res.render('index.jade', {});
});

//A Route for Creating a 500 Error (Useful to keep around)
server.get('/500', function(req, res) {
    throw new Error('This is a 500 Error');
});

//The 404 Route (ALWAYS Keep this as the last route)
server.get('/*', function(req, res) {
    throw new NotFound;
});

function NotFound(msg) {
    this.name = 'NotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}