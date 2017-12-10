var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/moviedb', {useMongoClient: true});
//mongoose.connect('mongodb://mongobreeze:applewater915@ds115085.mlab.com:15085/movie_db', {useMongoClient: true});
mongoose.connect('mongodb://localhost/moviedb', {useMongoClient: true});

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
	var movieSchema = new mongoose.Schema({
	  	name: String,
		description: String,
		imgPath: String,
		duration: Number,
		genre: Array,
		language: String,
		mpaaRating: Object,
		userRating: String
	});
	var Movie = mongoose.model('Movie', movieSchema);

	// Get all movies
	router.get('/movies', function(req, res, next){
	    Movie.find(function(err, movies){
	       	if(err){
	            res.send(err);
	        }
	        res.json(movies);
	    });
	});

	// Get Single movie
	router.get('/movie/:id', function(req, res, next){
		var the_id = mongoose.Types.ObjectId(req.params.id);
	    Movie.findOne({_id: the_id}, function(err, movie){
	        if(err){
	            res.send(err);
	        }
	        res.json(movie);
	    });
	});

	//Add New or Save Movie
	router.post('/movie', function(req, res, next){
	    var movie = req.body;
	    if(!movie.title || !movie.duration){
	        res.status(400);
	        res.json({
	            "error": "Bad Data"
	        });
	    } else {
	        Movie.save(function(err, movie){
	            if(err){
	                res.send(err);
	            }
	            res.json(movie);
	        });
	    }
	});

	//Update Movie
	router.put('/movie/:id', function(req, res){
	    var newMovie = req.body;
		var updMovie = {};
		console.dir("new mov " + newMovie);
	    updMovie.name = newMovie.title;
	    updMovie.description = newMovie.description;
	    updMovie.imgPath = newMovie.imgPath;
	    //updMovie.genre = newMovie.genre;
	    updMovie.language = newMovie.language;
	    //updMovie.mpaaRating = newMovie.mpaaRating;
	    updMovie.userRating = newMovie.userrating;
		console.dir(updMovie.name + " | " + updMovie.userRating);
		
	    if(!updMovie.name){
	        res.status(400);
	        res.json({
	            "error": "Bad Data"
	        });
	    } else {
	    	var the_id = mongoose.Types.ObjectId(req.params.id);
	        Movie.findByIdAndUpdate({_id: the_id}, {$set: updMovie}, function(err, movie) {
	        	if(err){
	            	res.send(err);
	        	}
	        	res.json(movie);
	    	});
	    }
	});

	// Delete movie
	router.delete('/movie/:id', function(req, res, next){
		var the_id = mongoose.Types.ObjectId(req.params.id);
	    Movie.findOne({_id: the_id}, function(err, movie){
	    	movie.remove(function (err) {
	    		if(err){
	            	res.send(err);
	        	}
	    	})
	        console.log("movie deleted successfully");
	    });
	});


});

module.exports = router;
