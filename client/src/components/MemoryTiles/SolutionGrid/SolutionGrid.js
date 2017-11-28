import React from "react";

const SolutionGrid = props => (
	<div>
		<h3>Solution Grid (Will be shown for 5s after the Start button is pressed):</h3>
		<div className="grid">
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
