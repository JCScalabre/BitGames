import React, { Component } from "react";
import { Link } from "react-router-dom";

class Homepage extends Component {
	state = {};

	render() {
		return (
			<div>
				<h3>Welcome to BitGames!</h3>
				<Link to="/memorytiles"><button>Go To Memory Tiles</button></Link>
				<Link to="/leaderboard"><button>Go To Leaderboard</button></Link>
			</div>
		);
	}
}

export default Homepage;
