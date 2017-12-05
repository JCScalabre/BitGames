import React, { Component } from "react";
import $ from "jquery";
import BlankGrid from "./BlankGrid";
import SolutionGrid from "./SolutionGrid";
import UserGrid from "./UserGrid";
import Modal from "react-responsive-modal";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import socket from "../Socket/Socket.js";
import moment from "moment";

// Set up our two colors:
const grey = "rgb(80, 80, 80)";
const cyan = "rgb(0, 194, 255)";

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
		grid: [],
		modalIsOpen: false,
		gameisrunning: false,
		canbesubmitted: false,
		timeremaining: 5
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
			$(event.target).css("background-color", cyan);
			var newState = this.state.grid;
			newState[i] = 1;
			this.setState({ grid: newState });
		}
		if (color === cyan) {
			$(event.target).css("background-color", grey);
			var newState2 = this.state.grid;
			newState2[i] = 0;
			this.setState({ grid: newState2 });
		}
	};

	// Our countdown function, which counts down from 5 to 0
	timeremaining = () => {
		var that = this;
		var time = this.state.timeremaining;
		var timerId = setInterval(function() {
			time--;
			that.setState({ timeremaining: time });
			if (time === 0) {
				clearInterval(timerId);
			}
		}, 1000);
	};

	// When the start button is pressed:
	start = event => {
		event.preventDefault();
		if (this.state.gameisrunning === false) {
			this.timeremaining();
			this.setState({ gameisrunning: true });
			$("#blankgrid").css("display", "none");
			$("#solutiongrid").css("display", "block");
			setTimeout(this.timeup, 5000);
		}
	};

	// When time is up:
	timeup = () => {
		this.setState({ canbesubmitted: true });
		$("#solutiongrid").css("display", "none");
		$("#usergrid").css("display", "block");
	};

	// When the form is submitted:
	handleSubmit = event => {
		event.preventDefault();
		if (this.state.canbesubmitted) {
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
			var objToSend = {};
			objToSend.name = name;
			objToSend.score = result * 100 / 25;
			// objToSend.score = 70;
			objToSend.date = moment();
			API.submitScore(objToSend);
			socket.emit("score", objToSend)
			this.setState({ result: result });
			this.openModal();
		}
	};

	// Reset our game :
	reset = () => {
		this.shuffle(this.state.solution);
		this.setState({ timeremaining: 5 })
		this.setState({ gameisrunning: false });
		this.setState({ canbesubmitted: false });
		$("#blankgrid").css("display", "block");
		$("#usergrid").css("display", "none");
		$(".usersquare").css("background-color", grey);
	};

	openModal = () => {
		this.setState({ modalIsOpen: true });
	};

	closeModal = () => {
		this.setState({ modalIsOpen: false });
		this.reset();
	};

	render() {
		return (
			<div className="container">
				<div id="header" className="row">
					<div className="col title">MEMORY TILES</div>
				</div>
				<div className="row justify-content-md-center">
					<div className="col instructions">
						<div className="cyan">
							Instructions: <br /> A random pattern will appear for 5
							seconds. Try your best to memorize it and recreate it. When
							you're ready, press Start to begin!
						</div>
						<div className="row justify-content-md-center">
							<button
								id="start"
								className="btn btn-primary"
								onClick={this.start}
							>
								Start
							</button>
						</div>
						<div className="row justify-content-md-center">
							<div className="cyan">
								<i
									className="fa fa-hourglass-half"
									aria-hidden="true"
								/>
								Time remaining:{" "}
								<span id="timeremaining">
									{this.state.timeremaining}
								</span>
							</div>
						</div>
					</div>
					<div className="col-md-auto text-center">
						<BlankGrid />
						<SolutionGrid solution={this.state.solution} />
						<UserGrid
							grid={this.state.grid}
							changecolor={this.changecolor}
						/>
						<br />
						<Link to="/">
							<button className="btn btn-primary">
								<i className="fa fa-home" aria-hidden="true" />Home
							</button>
						</Link>
						<Link to="/chat">
							<button className="btn btn-primary">
								<i className="fa fa-comments" aria-hidden="true" />
								Chat
							</button>
						</Link>
						<Link to="/leaderboard">
							<button className="btn btn-primary">
								<i className="fa fa-star" aria-hidden="true" />Leaderboard
							</button>
						</Link>
					</div>
					<div className="col">
						<form onSubmit={this.handleSubmit}>
							<div className="form-group cyan">
								<label>Enter your name:</label>
								<p id="leaveblank">
									(or leave blank to submit your score anonymously)
								</p>
								<input
									autoComplete="off"
									className="form-control"
									id="name"
									type="text"
								/>
							</div>
							<button type="submit" className="btn btn-primary">
								Submit
							</button>
						</form>
					</div>
				</div>
				<Modal
					open={this.state.modalIsOpen}
					little
					showCloseIcon={false}
					closeOnEsc={false}
					closeOnOverlayClick={false}
					onClose={this.closeModal}
					classNames={{ modal: "modal-content" }}
				>
					<h2>Congrats!</h2>
					<p>
						You scored {this.state.result * 100 / 25}% ({
							this.state.result
						}{" "}
						out of 25 correct).
					</p>
					<div className="row">
						<button onClick={this.closeModal} className="btn btn-primary">
							Play Again
						</button>
						<Link to="/leaderboard">
							<button
								onClick={this.closeModal}
								className="btn btn-primary"
							>
								View Leaderboard
							</button>
						</Link>
					</div>
				</Modal>
			</div>
		);
	}
}

export default MemoryTiles;
