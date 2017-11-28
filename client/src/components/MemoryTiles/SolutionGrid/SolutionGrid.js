import React from "react";

const SolutionGrid = props => (
	<div>
		<div id="solutiongrid" className="grid">
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
