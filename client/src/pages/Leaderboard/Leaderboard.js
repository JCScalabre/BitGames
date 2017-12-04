import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import moment from "moment";

var today = moment().format("MM DD YY");

class Leaderboard extends Component {
	state = {
		scores: [],
		scoresToRender: []
	};

	componentWillMount() {
		this.getScores();
	}

	// Filter scoresToRender to only contain scores from today:
	today = () => {
		var todayArr = [];
		for (var i = 0; i < this.state.scores.length; i++) {
			if (moment(this.state.scores[i].date).format("MM DD YY") === today) {
				todayArr.push(this.state.scores[i]);
			}
		}
		this.setState({ scoresToRender: todayArr });
	};

	// Filter scoresToRender to only contain scores from the past week
	week = () => {
		var today = moment();
		var arr = [];
		for (var i = 0; i < this.state.scores.length; i++) {
			var b = moment(this.state.scores[i].date);
			var diff = today.diff(b, "days");
			if (diff <= 7) {
				arr.push(this.state.scores[i]);
			}
		}
		this.setState({ scoresToRender: arr });
	};

	// Set scoresToRender state to all of scores DB
	alltime = () => {
		this.setState({ scoresToRender: this.state.scores });
	};

	// Get scores from DB:
	getScores = () => {
		API.getScores().then(res => {
			this.setState({ scores: res.data });
			this.today();
		});
	};

	render() {
		return (
			<div>
				<div className="title">Leaderboard</div>
				<div className="col text-center">
					<div className="btn-group" data-toggle="buttons">
						<label
							onClick={this.today}
							className="btn group btn-primary active"
						>
							<input type="radio" />Today
						</label>
						<label onClick={this.week} className="btn group btn-primary">
							<input type="radio" />This Week
						</label>
						<label
							onClick={this.alltime}
							className="btn group btn-primary"
						>
							<input type="radio" />All Time
						</label>
					</div>
				</div>
				<br />
				<div className="col-6 mx-auto">
					<table className="cyan table table-hover table-dark">
						<thead>
							<tr className="text-center">
								<th scope="col">Rank</th>
								<th scope="col">Name</th>
								<th scope="col">Date</th>
								<th scope="col">Score</th>
							</tr>
						</thead>
						<tbody>
							{this.state.scoresToRender.map((data, i) => {
								return (
									<tr key={i} className="text-center">
										<td>{i + 1}</td>
										<td>{data.name}</td>
										<td>
											{moment(data.date).format("MM/DD/YY - h:mma")}
										</td>
										<td>{data.score}%</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				<div className="col-6 mx-auto text-center">
					<Link to="/">
						<button className="btn btn-primary">Go Home</button>
					</Link>
					<Link to="/memorytiles">
						<button className="btn btn-primary">Play Memory Tiles</button>
					</Link>
				</div>
			</div>
		);
	}
}

export default Leaderboard;
