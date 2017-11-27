import React from "react";
import "./UserGrid.css";

const UserGrid = props => (
	<div>
		<h3>User Input Grid:</h3>
		<div id="usergrid">
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
