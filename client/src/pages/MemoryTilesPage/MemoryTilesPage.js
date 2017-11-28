import React, { Component } from "react";
import MemoryTiles from "../../components/MemoryTiles";
import { Link } from "react-router-dom";

class MemoryTilesPage extends Component {
	state = {
		
	};

	render() {
		return (
			<div>
			<Link to="/"><button className="btn btn-primary">Go Home</button></Link>
			<Link to="/leaderboard"><button className="btn btn-primary">Go To Leaderboard</button></Link>
			<h3>Memory Tiles</h3>
			<h5>Instructions: A random pattern will appear for 5 seconds. Try your best to memorize it and recreate it. When you're ready, press Start to begin!</h5>
			<MemoryTiles/>
			</div>
			);
	}
}

export default MemoryTilesPage;
