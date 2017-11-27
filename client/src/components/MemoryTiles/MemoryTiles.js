import React, { Component } from "react";
import $ from "jquery";
import SolutionGrid from "../SolutionGrid";
import UserGrid from "../UserGrid";
import "./MemoryTiles.css";
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
		this.setGrid();
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
	setGrid = () => {
		for (var i = 0; i < 25; i++) {
			this.state.grid.push(0);
		}
	};

	// Our function that changes the color and state of the user input grid.
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

	submit = event => {
		event.preventDefault();
		var result = 0;
		var name = $("#name").val();
		for (var i = 0; i < this.state.solution.length; i++) {
			if (this.state.solution[i] === this.state.grid[i]) {
				result++;
			}
		}
		var obj = {};
		obj.name = name;
		obj.score = result;
		API.submitScore(obj);
		alert("You scored " + result + " out of 25")
	}

	render () {
		return (
			<div>
				<SolutionGrid
					solution={this.state.solution}
				/>
				<UserGrid
					grid={this.state.grid}
					changecolor={this.changecolor}
				/>
				<br/>
				<form>
					<div className="form-group">
						<label>Enter your name:</label>
						<input className="form-control" id="name"/>
					</div>
				</form>
				<button onClick={this.submit}>Submit</button>
			</div>
			)
	}

}

export default MemoryTiles;