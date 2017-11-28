import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import MemoryTilesPage from "./pages/MemoryTilesPage";
import "./App.css";

const App = () => (
	<Router>
		<div>
			<Route exact path="/" component={Homepage} />
			<Route exact path="/MemoryTiles" component={MemoryTilesPage} />
		</div>
	</Router>
);

export default App;
