import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import moment from "moment";

class Leaderboard extends Component {
	state = {
		scores: []
	};

	componentWillMount() {
		this.getScores();
	}

	getScores = () => {
		API.getScores().then(res => {
			for (var i = 0; i < res.data.length; i++) {
				res.data[i].date = moment(res.data[i].date).format("MM/DD/YY - h:mma")
			}
			this.setState({ scores: res.data });
		});
	};

	render() {
		return (
			<div>
				<div className="title">Leaderboard</div>
				<div className="col-6 mx-auto text-center">
					<Link to="/">
						<button className="btn btn-primary">Go Home</button>
					</Link>
					<Link to="/memorytiles">
						<button className="btn btn-primary">
							Play Memory Tiles
						</button>
					</Link>
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
							{this.state.scores.map((score, i) => {
								return (
									<tr key={i} className="text-center">
										<td>{i + 1}</td>
										<td>{score.name}</td>
										<td>{score.date}</td>
										<td>{score.score}%</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default Leaderboard;
