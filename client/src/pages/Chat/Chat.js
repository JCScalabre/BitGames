import React, { Component } from "react";
import $ from "jquery";
// import { Link } from "react-router-dom";
// import API from "../../utils/API";
// import moment from "moment";
import Modal from "react-responsive-modal";
import "./Chat.css";

const io = require("socket.io-client");
const socket = io();

// var today = moment().format("MM DD YY");

class Chat extends Component {
	state = {
		modalIsOpen: true
	};

	componentWillMount() {}

	componentDidMount() {
		socket.on("message", message => {
			var contents = message.message;
			var name = message.name;
			var messagetoappend = `<div class='chatmsg'> ${name}: ${
				contents
			} </div>`;
			$("#chatbg").append(messagetoappend);
			var scrollHeight = $("#chatbg")[0].scrollHeight;
			$("#chatbg").scrollTop(scrollHeight);
		});
	}

	handleNameSubmit = event => {
		event.preventDefault();
		this.closeModal();
		this.setState({ name: $("#chatname").val() });
	};

	handleMsgSubmit = event => {
		event.preventDefault();
		this.setState({ message: $("#message").val() });
		let ObjToEmit = {};
		ObjToEmit.name = this.state.name;
		ObjToEmit.message = $("#message").val();
		socket.emit("message", ObjToEmit);
		$("#message").val("");
	};

	openModal = () => {
		this.setState({ modalIsOpen: true });
	};

	closeModal = () => {
		this.setState({ modalIsOpen: false });
	};

	render() {
		return (
			<div>
				<div className="title">Chat</div>
				<div className="container">
					<div id="chatbg" className="col">
					</div>
					<div id="messagebar" className="col cyan">
						<form onSubmit={this.handleMsgSubmit}>
							<div className="input-group">
								<input
									autoComplete="off"
									className="form-control"
									id="message"
									type="text"
								/>
								<span className="input-group-btn">
									<button
										id="messagesend"
										className="btn btn-primary"
										type="submit"
									>
										Send
									</button>
								</span>
							</div>
						</form>
					</div>
				</div>
				<Modal
					open={this.state.modalIsOpen}
					onClose={this.closeModal}
					little
					showCloseIcon={false}
					closeOnEsc={false}
					closeOnOverlayClick={false}
					classNames={{ modal: "name-modal" }}
				>
					<h2>Please enter your name to continue</h2>
					<form onSubmit={this.handleNameSubmit}>
						<div id="nameinput" className="input-group">
							<input
								autoComplete="off"
								className="form-control"
								id="chatname"
								type="text"
							/>
							<span className="input-group-btn">
								<button
									id="chatnamebtn"
									className="btn btn-primary"
									type="submit"
								>
									Submit
								</button>
							</span>
						</div>
					</form>
				</Modal>
			</div>
		);
	}
}

export default Chat;
