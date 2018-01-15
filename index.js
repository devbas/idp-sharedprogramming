var express = require('express');
var path = require('path');
var logger = require('morgan'); 
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var pug = require('pug');
var APIRouter = require('./app/server/api');
var config = require('./app/server/config.json');
var io = require('socket.io')();

var app = express(); 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(logger('dev')); 
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.set('view engine', 'pug');

app.use('/api', APIRouter); 

if(app.get('env') === 'development') {
  app.use(express.static(path.join(__dirname, './app/client/build')));

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'app/client/build', 'index.html'));
  })
} else {
  app.use(express.static(path.join(__dirname, './app/client/build')));

  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'app/client/build', 'index.html'));
  })
}

app.use(express.static(path.join(__dirname, './app/client/')));

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log('err: ', err); 
  // render the error page
  res.status(err.status || 500);
  res.send('error');
}); 

app.disable('x-powered-by');

var ioPort = 8002;
io.listen(ioPort);
console.log('Socket listening on port: ', ioPort)

io.on('connection', (client) => {
  client.on('subscribeToEditor', (editorValue) => {
    client.broadcast.emit('newValue', editorValue);
  });

  client.on('registerCursor', () => {
    console.log('lits register this');
    cursorId = Math.random().toString(36).substring(2, 15) // Generate unique cursor hash
    client.emit('assignedCursorId', cursorId);
  })
  
  client.on('updateCursor', (cursor) => {
    console.log('update following cursor: ', cursor)
    client.broadcast.emit('cursorUpdate', { cursorId: cursor.cursorId, position: cursor.position })
  })
  
});

var port = 8001; 

app.listen(port, () => {
  console.log('Server is running on http://localhost:', port);
});