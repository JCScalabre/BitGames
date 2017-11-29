import React, { Component } from "react";
import $ from "jquery";
import BlankGrid from "./BlankGrid";
import SolutionGrid from "./SolutionGrid";
import UserGrid from "./UserGrid";
import Modal from "../Modal";
import API from "../../utils/API";

const grey = "rgb(128, 128, 128)";
const green = "rgb(0, 128, 0)";

class MemoryTiles extends Component {
	state = {
		solution: [
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0
		],
		grid: []
	};

	componentWillMount() {
		// Shuffle our solution grid:
		this.shuffle(this.state.solution);
		// Set up our user input grid:
		this.setUserGrid();
	}

	// Our function that 'shuffles' an array using the Durstenfeld shuffle:
	shuffle = array => {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	};

	// Set up user input grid:
	setUserGrid = () => {
		for (var i = 0; i < 25; i++) {
			this.state.grid.push(0);
		}
	};

	// Our function that changes the color and state of the user input grid when a square is clicked:
	changecolor = event => {
		var color = $(event.target).css("background-color");
		var i = $(event.target).attr("tilenumber");
		if (color === grey) {
			$(event.target).css("background-color", green);
			var newState = this.state.grid;
			newState[i] = 1;
			this.setState({ grid: newState });
		}
		if (color === green) {
			$(event.target).css("background-color", grey);
			var newState2 = this.state.grid;
			newState2[i] = 0;
			this.setState({ grid: newState2 });
		}
	};

	// When the start button is pressed:
	start = event => {
		event.preventDefault();
		$("#blankgrid").css("display", "none");
		$("#solutiongrid").css("display", "block");
		setTimeout(function() {
			$("#solutiongrid").css("display", "none");
			$("#usergrid").css("display", "block");
		}, 5000);
	};

	// When the submit button is pressed:
	submit = event => {
		event.preventDefault();
		var result = 0;
		var name = $("#name").val();
		if (name === "") {
			name = "Anonymous";
		}
		for (var i = 0; i < this.state.solution.length; i++) {
			if (this.state.solution[i] === this.state.grid[i]) {
				result++;
			}
		}
		var objToSendToDB = {};
		objToSendToDB.name = name;
		objToSendToDB.score = result * 100 / 25;
		API.submitScore(objToSendToDB);
		this.setState({ result: result });
	};

	render() {
		return (
			<div className="container">
				<div id="header" className="row">
					<div className="col" id="memorytitle">
						MEMORY TILES
					</div>
				</div>
				<div className="row justify-content-md-center">
					<div className="col cyan instructions">
						<div>
							Instructions: A random pattern will appear for 5 seconds.
							Try your best to memorize it and recreate it. When you're
							ready, press Start to begin!
						</div>
						<button
							id="start"
							className="btn btn-success"
							onClick={this.start}
						>
							Start
						</button>
					</div>
					<div className="col-md-auto">
						<div>
							<BlankGrid />
							<SolutionGrid solution={this.state.solution} />
							<UserGrid
								grid={this.state.grid}
								changecolor={this.changecolor}
							/>
						</div>
					</div>
					<div className="col">
						<form>
							<div className="form-group cyan">
								<label>Enter your name:</label>
								<input className="form-control" id="name" />
							</div>
						</form>
						<button
							id="submit"
							className="btn btn-success"
							data-toggle="modal"
							data-target="#testmodal"
							onClick={this.submit}
						>
							Submit
						</button>
					</div>
				</div>
				<Modal result={this.state.result} />
			</div>
		);
	}
}

export default MemoryTiles;
