import React, { Component } from "react";
import MemoryTiles from "../../components/MemoryTiles";
import { Link } from "react-router-dom";

class MemoryTilesPage extends Component {
	state = {
		
	};

	render() {
		return (
			<div>
			<Link to="/"><button>Go Home Button</button></Link>
			<Link to="/leaderboard"><button>Go To Leaderboard Button</button></Link>
			<h3>Memory Tiles Page:</h3>
			<MemoryTiles/>
			</div>
			);
	}
}

export default MemoryTilesPage;
