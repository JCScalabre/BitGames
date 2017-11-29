const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var month = new Date().getMonth()+1;
var day = new Date().getDate();
var year = new Date().getFullYear();
var fulldate = month + " / " + day + " / " + year;
console.log(fulldate);

const scoreSchema = new Schema({
  name: { type: String, default: "Anonymous" },
  score: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const Score = mongoose.model("Score", scoreSchema);

module.exports = Score;
