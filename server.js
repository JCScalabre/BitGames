const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = require("./models");
var http = require('http').Server(app);
var io = require('socket.io')(http);


// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/BitGames",
  {
    useMongoClient: true
  }
);

// Routes
app.post("/api/scores", (req, res) => {
	// get the posted object
	var score = req.body
	// call Article.create
	db.Score.create(score)
	// then return some json (success | error)
	.then(() => {
		res.json(score)
	})
	.catch((err) => {
		res.json(err)
	})
})

app.get("/api/scores", (req, res) => {
	db.Score.find().sort({ score: -1 })
	.then(scores => res.json(scores))
})

app.get("/flappybird", (req, res) => {
	res.sendFile(__dirname + "/flappybird.html")
})

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on("test", function(name) {
  	console.log("name: " + name)
  })
  socket.on("score", function(score) {
  	console.log(score)
  	io.emit("score", score)
  })
  socket.on("message", function(message) {
    console.log(message)
    io.emit("message", message)
  })
});

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// app.listen(PORT, function() {
//   console.log(`🌎 ==> Server now on port ${PORT}!`);
// });

http.listen(PORT, function(){
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});