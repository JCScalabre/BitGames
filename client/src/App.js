import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import MemoryTilesPage from "./pages/MemoryTilesPage";
import Leaderboard from "./pages/Leaderboard";
import FlappyBird from "./pages/FlappyBird"
import "./App.css";

const App = () => (
	<Router>
		<div>
			<Route exact path="/" component={Homepage} />
			<Route exact path="/memorytiles" component={MemoryTilesPage} />
			<Route exact path="/leaderboard" component={Leaderboard} />
			<Route exact path="/flappybird" component={FlappyBird} />
		</div>
	</Router>
);

export default App;
