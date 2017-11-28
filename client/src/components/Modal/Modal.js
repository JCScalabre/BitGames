import React from "react";
// import { Link } from "react-router-dom";

const Modal = props => (
	<div id="testmodal" className="modal fade">
		<div className="modal-dialog" role="document">
			<div className="modal-content">
				<div className="modal-header">
					<h5 className="modal-title">Congrats!</h5>
					<button
						type="button"
						className="close"
						data-dismiss="modal"
						aria-label="Close"
					>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div className="modal-body">
					<p>You scored {props.result*100/25}% ({props.result} out of 25).</p>
				</div>
				<div className="modal-footer">
					<a type="button" href="/leaderboard" className="btn btn-primary">
						View Leaderboard
					</a>
					<a type="button" href="/memorytiles" className="btn btn-primary">
						Play Again
					</a>
				</div>
			</div>
		</div>
	</div>
);

export default Modal;
