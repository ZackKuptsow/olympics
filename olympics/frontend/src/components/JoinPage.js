import React, { Component } from 'react';
import {
	Button,
	Card,
	Container,
	Row,
	Col,
	Form,
	FormControl
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class JoinPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			roomCode: '',
			error: ''
		};
		this._handleTextFieldChange = this._handleTextFieldChange.bind(this);
		this._roomButtonPressed = this._roomButtonPressed.bind(this);
	}

	render() {
		const isError = this.state.error;
		let errMsg;
		if (this.state.error) {
			errMsg = (
				<Form.Text className="text-danger ms-2">
					{this.state.error}
				</Form.Text>
			);
		}
		return (
			<Container>
				<Row>
					<Col xs={12} className="align-items-center">
						<Card>
							<Card.Body>
								<Card.Title className="text-center">
									Join a Room
								</Card.Title>
								<Form>
									<Form.Control
										type="text"
										placeholder="Enter a Room Code"
										value={this.state.roomCode}
										onChange={this._handleTextFieldChange}
									/>
									<div>{errMsg}</div>
									<Link to="/">
										<Button
											variant="btn btn-danger"
											as="input"
											type="button"
											className="float-start my-3"
											value="Back"
										/>
									</Link>
									<Button
										variant="btn btn-primary"
										as="input"
										type="button"
										className="float-end my-3"
										value="Enter Room"
										onClick={this._roomButtonPressed}
									/>
								</Form>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		);
	}

	_handleTextFieldChange(e) {
		this.setState({
			roomCode: e.target.value
		});
	}

	_roomButtonPressed() {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				code: this.state.roomCode
			})
		};
		fetch('/api/join-room', requestOptions)
			.then(response => {
				if (response.ok) {
					this.props.history.push(`/room/${this.state.roomCode}`);
				} else {
					this.setState({
						error: 'Room not found.'
					});
				}
			})
			.catch(error => {
				console.log(error);
			});
	}
}
