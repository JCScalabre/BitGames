import React, { Component } from "react";
import { Link } from "react-router-dom";

class Homepage extends Component {
	state = {};

	render() {
		return (
			<div className="container">
				<h3 className="bitgames">BITGAMES</h3>

				<div className="row">
					<div className="col">
						<Link to="/memorytiles">
							<img id="bitgamesimage" src="images/bitgames.png" />
						</Link>
						<div className="col-6">
							<Link to="/memorytiles">
								<button className="btn homebtn btn-primary">
									Play Memory Tiles
								</button>
							</Link>
							<Link to="/leaderboard">
								<button className="btn homebtn btn-primary">
									View Leaderboard
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Homepage;
