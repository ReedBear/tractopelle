var application_root = __dirname,
  express = require('express'),
  path = require('path'),
  less = require('less'),
  ejs = require('ejs'),
  routesHandler = require('./controllers/RoutesHandler');

var app = express.createServer();

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(application_root, 'public')));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.set('view engine', 'ejs');
});


// Routes
app.get('/', function (req, res) {
  routesHandler.index(req, res);
});


app.listen(4242);