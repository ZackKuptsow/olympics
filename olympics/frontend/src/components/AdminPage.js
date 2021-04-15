import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
	Container,
	Row,
	Col,
	Card,
	Button,
	Collapse,
	Alert
} from 'react-bootstrap';

export default class AdminPage extends Component {
	static defaultProps = {
		votesToSkip: 2,
		playerCanPause: true,
		update: false,
		roomCode: null,
		updateCallback: () => {}
	};
	constructor(props) {
		super(props);
		this.state = {
			playerCanPause: this.props.playerCanPause,
			votesToSkip: this.props.votesToSkip,
			control1Checked: this.props.playerCanPause,
			conrol2Checked: !this.props.playerCanPause,
			successMsg: '',
			errorMsg: ''
		};
		this.roomCode = this.props.match.params.roomCode;
		this.handleVotesChange = this.handleVotesChange.bind(this);
		this.handlePlayerCanPauseChange = this.handlePlayerCanPauseChange.bind(
			this
		);
		this.toggleRadio = this.toggleRadio.bind(this);
		this.handleUpdateRoomButtonPressed = this.handleUpdateRoomButtonPressed.bind(
			this
		);
	}

	handleVotesChange(e) {
		this.setState({
			votesToSkip: e.target.value
		});
	}

	toggleRadio() {
		this.setState({
			control1Checked: !this.control1Checked,
			control2Checked: !this.control2Checked
		});
	}

	handlePlayerCanPauseChange(e) {
		this.setState({
			playerCanPause: e.target.value === 'true' ? true : false
		});
	}

	handleUpdateRoomButtonPressed() {
		const requestOptions = {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				votes_to_skip: this.state.votesToSkip,
				player_can_pause: this.state.playerCanPause,
				code: this.roomCode
			})
		};
		fetch('/api/update-room', requestOptions).then(response => {
			if (response.ok) {
				this.setState({
					successMsg: 'Room updated successfully!'
				});
			} else {
				this.setState({
					errorMsg: 'Error updating room...'
				});
			}
			this.props.updateCallback();
		});
	}

	render() {
		return (
			<Container>
				<Row>
					<Col xs={12}>
						<Card
							className="text-center pt-3"
							style={{ width: '36rem' }}
						>
							<Card.Img
								variant="top"
								src="../../static/images/olympics.png"
								className="m-auto p-5"
							/>
							<Card.Body>
								<Card.Title className="display-3 mt-5">
									Update Room
								</Card.Title>
								<Card.Subtitle className="display-6 text-muted mb-5">
									Step 1
								</Card.Subtitle>
								<form className="text-start">
									<label
										for="playerControlOptions"
										className="h4 text-muted  control-label input-group pb-0 mb-0"
									>
										Player Control of Spotify
									</label>
									<div
										className="btn-group"
										onChange={
											this.handlePlayerCanPauseChange
										}
										required
									>
										<input
											type="radio"
											className="form-check-input"
											name="playerControlOptions"
											id="control1"
											value="true"
											checked={this.state.control2Checked}
											onChange={this.toggleRadio}
										/>
										<label
											htmlFor="control1"
											className="form-check-label"
										>
											Play/Pause
										</label>
										<input
											type="radio"
											className="form-check-input ms-3"
											name="playerControlOptions"
											id="control2"
											value="false"
											checked={this.state.control2Checked}
											onChange={this.toggleRadio}
										/>
										<label
											htmlFor="control2"
											className="form-check-label"
										>
											No Control
										</label>
									</div>
									<hr
										style={{
											color: 'grey',
											background: 'black',
											height: 5
										}}
									/>
									<p className="h4 text-muted pb-0 mb-0">
										Votes to Skip a Song
									</p>
									<input
										required
										type="number"
										id="VotesToSkip"
										className="form-control"
										defaultValue={this.state.votesToSkip}
										min="1"
										onChange={this.handleVotesChange}
									/>
									<Link to={`/room/${this.roomCode}`}>
										<Button
											as="input"
											type="button"
											variant="danger"
											className="float-start my-3"
											value="Back"
											onClick={this.props.handler}
										/>
									</Link>
									<Button
										as="input"
										type="button"
										varaint="secondary"
										className="float-end my-3"
										value="Update Room"
										onClick={
											this.handleUpdateRoomButtonPressed
										}
									/>
								</form>
							</Card.Body>
							<Collapse in={open}>
								<div className="card card-footer">
									{this.state.successMsg != '' ? (
										<Alert variant="success">
											{this.state.successMsg}
										</Alert>
									) : (
										<Alert variant="danger">
											{this.state.dangerMsg}
										</Alert>
									)}
								</div>
							</Collapse>
						</Card>
					</Col>
				</Row>
			</Container>
		);
	}
}
