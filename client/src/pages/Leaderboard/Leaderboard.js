import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";

class Leaderboard extends Component {
	state = {
		scores: []
	};

	componentWillMount() {
		this.getScores();
	}

	getScores = () => {
		API.getScores().then(res => {
			this.setState({ scores: res.data });
		});
	};

	render() {
		return (
			<div>
				<div className="title">Leaderboard</div>
				<Link to="/">
					<button className="btn btn-primary">Go Home</button>
				</Link>
				<Link to="/memorytiles">
					<button className="btn btn-primary">Go To Memory Tiles</button>
				</Link>
				<br/><br/>
				<div className="cyan">Leaderboard Table:</div>
				{this.state.scores.map((score, i) => {
					return (
						<div className="cyan" key={i}>Name: {score.name} || Score: {score.score}% || Date: {score.date}</div>
						)
				})}
			</div>
		);
	}
}

export default Leaderboard;
