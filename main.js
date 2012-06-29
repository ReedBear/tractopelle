var application_root = __dirname,
  express = require('express'),
  fs = require("fs"),
  path = require('path'),
  less = require('less'),
  ejs = require('ejs'),
  routesHandler = require('./controllers/RoutesHandler');

var app = express.createServer();

// App Configuration
app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.set('view engine', 'ejs');
});


app.configure('development', function() {
  app.use(express.static(path.join(application_root, 'public')));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
  var oneYear = 31557600000;
  app.use(express.static(path.join(application_root, 'public'), { maxAge: oneYear }));
  app.use(express.errorHandler());
});


// Less
app.get("*.less", function(req, res) {
  var path = __dirname + req.url;
  fs.readFile(path, "utf8", function(err, data) {
    if (err) throw err;
    less.render(data, function(err, css) {
      if (err) throw err;
      res.header("Content-type", "text/css");
      res.send(css);
    });
  });
});

// Routes
app.get('/', function (req, res) {
  routesHandler.index(req, res);
});


app.listen(4242);