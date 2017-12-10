var express = require('express');
var path = require('path');

var index = require('./routes/index');
var movies = require('./routes/movies');
var app = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var bodyParser = require('body-parser'); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('html', require('ejs').renderFile);

// Set Static Folder
//app.use(express.static(path.join(__dirname, '../front-end/dist')));
app.use(express.static(path.join(__dirname, 'client')));

app.use('/', index);
app.use('/api', movies);

app.listen(3000, function(){
    console.log('Server started on port '+3000);
});
