/*const http = require('http');
const fs = require('fs');
const hostname = '127.0.0.1';
const port =3000;

fs.readFile('Tutorial01/index.html',function(err,html){
	if(err){
		throw err;
	}

	const server = http.createServer(function(req,res){
	console.log(req.url);
	res.statusCode =200;
	res.setHeader('Content-type','text/html');
	res.write(html);
	res.end();
	});

	server.listen(port,hostname,function(){
		console.log('server started at'+ port);
	});

})*/

/*var express = require('express');
var app = express();
var path = require('path');

//app.use('/', express.static(__dirname + '/Tutorial01'));

app.get('/', function(req, res) {
	debugger;
	console.log(req.url);
	console.log('dirnam'+__dirname)

    res.sendFile(path.join(__dirname + '/Tutorial01'));
});

app.listen(3000, function(){

	console.log('Listening to port 3000')
}); */



var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var routes = require('./routes/index');
var app = express();



/*HTML view engine */
app.set('views', path.join(__dirname, './Tutorial01'));
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);

app.set('port',process.env.PORT || 3000);
/*Static folder where we put client side codes*/
app.use(express.static(path.join(__dirname, 'Tutorial01')));



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



app.get('/',function(req,res){
	res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/login.html',function(req,res){
	res.sendFile(path.join(__dirname + '/login.html'));
});



/*Routes*/
//routes(app);
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(app.get('port'),function(){

	console.log('started..')
})

// catch 404 and forward to error handler
module.exports = app;

