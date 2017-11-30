import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import moment from "moment";
var today = moment().format("MM DD YY");

class Leaderboard extends Component {
	state = {
		scores: []
	};

	componentWillMount() {
		this.getScores();
	}

	today = () => {
		var date1 = this.state.scores[0].date
		date1 = moment(date1).format("MM DD YY")
		console.log(today)
		console.log(date1)
		if (today === date1) {
			console.log("That is today")
		}
	}

	getScores = () => {
		API.getScores().then(res => {
			// This for loop formats our date
			// for (var i = 0; i < res.data.length; i++) {
			// 	res.data[i].date = moment(res.data[i].date).format(
			// 		"MM/DD/YY - h:mma"
			// 	);
			// }
			this.setState({ scores: res.data });
		});
	};

	render() {
		return (
			<div>
				<div className="title">Leaderboard</div>
				<div className="col text-center">
					<div className="btn-group" data-toggle="buttons">
						<label onClick={this.today} className="btn group btn-primary">
							<input
								type="radio"
							/>Today
						</label>
						<label className="btn group btn-primary active">
							<input
								type="radio"
							/>This Week
						</label>
						<label className="btn group btn-primary">
							<input
								type="radio"
							/>All Time
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
							{this.state.scores.map((data, i) => {
								return (
									<tr key={i} className="text-center">
										<td>{i + 1}</td>
										<td>{data.name}</td>
										<td>{moment(data.date).format("MM/DD/YY - h:mma")}</td>
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
