import React from "react";

const UserGrid = props => (
	<div>
		<h3>User Input Grid (Will be shown after the solution is hidden)(Is clickable):</h3>
		<div className="grid">
			{props.grid.map((number, i) => {
				return (
					<div
						className="grey square"
						tilenumber={i}
						key={i}
						onClick={props.changecolor}
					/>
				);
			})}
		</div>
	</div>
);

export default UserGrid;
