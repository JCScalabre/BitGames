import React from "react";

const UserGrid = props => (
	<div>
		<div id="usergrid" className="grid">
			{props.grid.map((number, i) => {
				return (
					<div
						className="grey usersquare square"
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
