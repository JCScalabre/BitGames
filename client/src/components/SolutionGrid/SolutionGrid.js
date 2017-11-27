import React from "react";
import "./SolutionGrid.css";

const SolutionGrid = props => (
	<div>
		<h3>Solution Grid:</h3>
		<div id="solutiongrid">
			{props.solution.map((number, i) => {
				if (number === 0) {
					return (
						<div
							className="grey square"
							tilenumber={i}
							key={i}
							onClick={props.changecolor}
						/>
					);
				}

				return (
					<div
						className="green square"
						tilenumber={i}
						key={i}
						onClick={props.changecolor}
					/>
				);
			})}
		</div>
	</div>
);

export default SolutionGrid;
