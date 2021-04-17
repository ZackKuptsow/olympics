import React, { Component } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import BracketGuestView from './BracketGuestView';

export default class BracketPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isHost: false,
			teamNames: [],
			events: [],
			eventToSubmit: '',
			isTableAOpen: true,
			isTableBOpen: false
		};
		this.roomCode = this.props.match.params.roomCode;
		this.renderCreateEvent = this.renderCreateEvent.bind(this);
		this.handleCreateEventPressed = this.handleCreateEventPressed.bind(
			this
		);
		this.getEventRoundOne = this.getEventRoundOne.bind(this);
		this.winnerClicked = this.winnerClicked.bind(this);
		this.getRoomDetails();
		this.getTeamsList();
		this.eventInput = React.createRef();
		this.teamA = React.createRef();
		this.teamB = React.createRef();
		this.teamC = React.createRef();
		this.teamD = React.createRef();
		this.getEventRoundOne();
		console.log(this.state);
	}

	getRoomDetails() {
		fetch('/api/get-room' + '?code=' + this.roomCode)
			.then(response => {
				if (!response.ok) {
					this.props.history.push('/');
				}
				return response.json();
			})
			.then(data => {
				this.setState({
					isHost: data.is_host
				});
			});
	}

	getTeamsList() {
		fetch('/api/get-teams' + '?code=' + this.roomCode)
			.then(response => response.json())
			.then(data => {
				for (let team in data) {
					this.state.teamNames.push(data[team].team_name);
				}
			});
	}

	handleCreateEventPressed() {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				room_code: this.roomCode,
				event_name: this.eventInput.current.value,
				team_a: this.teamA.current.value,
				team_b: this.teamB.current.value,
				team_c: this.teamC.current.value,
				team_d: this.teamD.current.value
			})
		};
		fetch('/api/create-event', requestOptions)
			.then(response => response.json())
			.then(() => window.location.reload());
	}

	async getEventRoundOne() {
		await fetch('/api/get-round-one' + '?room_code=' + this.roomCode)
			.then(response => response.json())
			.then(data => {
				for (let event in data) {
					this.state.events.push(data[event]);
				}
			});
	}

	winnerClicked() {
		for (let e in this.state.events) {
			if (this.state.events[e].event_name === this.state.eventToSubmit) {
				const requestOptions = {
					method: 'PATCH',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						event_name: this.state.eventToSubmit,
						winner_ab: this.state.events[e].winner_ab,
						winner_cd: this.state.events[e].winner_cd
					})
				};
				fetch('/api/update-event', requestOptions)
					.then(response => response.json())
					.then(data => console.log(data));
			}
		}
	}

	renderCreateEvent() {
		return (
			<Col>
				<Card style={{ width: '32rem', height: '32rem' }}>
					<Card.Header>
						<h1 className="text-center">Bracket Settings</h1>
					</Card.Header>
					<Card.Body>
						<Form>
							<Form.Group controlId="addTeam">
								<Form.Label as="h3" className="ms-1">
									Create an Event
								</Form.Label>
								<Form.Control
									type="text"
									placeholder="Event Name"
									ref={this.eventInput}
								/>
								<Form.Label>Team A</Form.Label>
								<Form.Control
									as="select"
									defaultValue="Choose..."
									ref={this.teamA}
								>
									<option>Choose...</option>
									{this.state.teamNames.map(team => (
										<option>{team}</option>
									))}
								</Form.Control>
								<Form.Label>Team B</Form.Label>
								<Form.Control
									as="select"
									defaultValue="Choose..."
									ref={this.teamB}
								>
									<option>Choose...</option>
									{this.state.teamNames.map(team => (
										<option>{team}</option>
									))}
								</Form.Control>
								<Form.Label>Team C</Form.Label>
								<Form.Control
									as="select"
									defaultValue="Choose..."
									ref={this.teamC}
								>
									<option>Choose...</option>
									{this.state.teamNames.map(team => (
										<option>{team}</option>
									))}
								</Form.Control>
								<Form.Label>Team D</Form.Label>
								<Form.Control
									as="select"
									defaultValue="Choose..."
									ref={this.teamD}
								>
									<option>Choose...</option>
									{this.state.teamNames.map(team => (
										<option>{team}</option>
									))}
								</Form.Control>
								<Button
									as="input"
									type="button"
									variant="primary"
									className="my-3"
									value="Create"
									onClick={this.handleCreateEventPressed}
								/>
							</Form.Group>
						</Form>
					</Card.Body>
				</Card>
			</Col>
		);
	}

	render() {
		return (
			<Container>
				<Row>
					{this.state.events.map(event => {
						return (
							<Col>
								<Card
									style={{ width: '24rem', height: '24rem' }}
								>
									<Card.Header>
										<h1 className="text-center">
											{event.event_name}
										</h1>
									</Card.Header>
									<Card.Body>
										<Card.Text
											style={{ display: 'inline' }}
										>
											<h3>Round 1:</h3>
											<ul>
												{this.state.isHost ? (
													[
														<li
															style={{
																display: 'flex'
															}}
														>
															<Button
																as="input"
																type="button"
																value={
																	event.team_a
																}
																onClick={() => {
																	for (let e in this
																		.state
																		.events) {
																		if (
																			(this.state.events[
																				e
																			].event_name =
																				event.event_name)
																		) {
																			this.state.events[
																				e
																			].winner_ab =
																				event.team_a;
																		}
																	}
																	this.setState(
																		{
																			eventToSubmit:
																				event.event_name
																		},
																		() => {
																			this.winnerClicked();
																		}
																	);
																}}
															/>
															<h5>vs.</h5>
															<Button
																as="input"
																type="button"
																value={
																	event.team_b
																}
																onClick={() => {
																	for (let e in this
																		.state
																		.events) {
																		if (
																			(this.state.events[
																				e
																			].event_name =
																				event.event_name)
																		) {
																			this.state.events[
																				e
																			].winner_ab =
																				event.team_b;
																		}
																	}
																	this.setState(
																		{
																			eventToSubmit:
																				event.event_name
																		},
																		() => {
																			this.winnerClicked();
																		}
																	);
																}}
															/>
															<Button
																as="input"
																type="button"
																variant="danger"
																value="Table A"
																disabled={
																	this.state
																		.isTableAOpen
																}
															/>
															<Button
																as="input"
																type="button"
																variant="danger"
																value="Table B"
																disabled={
																	this.state
																		.isTableBOpen
																}
															/>
														</li>,
														<li
															style={{
																display: 'flex'
															}}
														>
															<Button
																as="input"
																type="button"
																value={
																	event.team_c
																}
																onClick={() => {
																	for (let e in this
																		.state
																		.events) {
																		if (
																			(this.state.events[
																				e
																			].event_name =
																				event.event_name)
																		) {
																			this.state.events[
																				e
																			].winner_cd =
																				event.team_c;
																		}
																	}
																	this.setState(
																		{
																			eventToSubmit:
																				event.event_name
																		},
																		() => {
																			this.winnerClicked();
																		}
																	);
																}}
															/>
															<h5>vs.</h5>
															<Button
																as="input"
																type="button"
																value={
																	event.team_d
																}
																onClick={() => {
																	for (let e in this
																		.state
																		.events) {
																		if (
																			(this.state.events[
																				e
																			].event_name =
																				event.event_name)
																		) {
																			this.state.events[
																				e
																			].winner_cd =
																				event.team_d;
																		}
																	}
																	this.setState(
																		{
																			eventToSubmit:
																				event.event_name
																		},
																		() => {
																			this.winnerClicked();
																		}
																	);
																}}
															/>
															<Button
																as="input"
																type="button"
																variant="danger"
																value="Table A"
																disabled={
																	this.state
																		.isTableAOpen
																}
															/>
															<Button
																as="input"
																type="button"
																variant="danger"
																value="Table B"
																disabled={
																	this.state
																		.isTableBOpen
																}
															/>
														</li>
													]
												) : (
													<BracketGuestView
														{...this.props}
														event={{ event }}
													/>
												)}
											</ul>
										</Card.Text>
									</Card.Body>
								</Card>
							</Col>
						);
					})}
					<Col>
						{this.state.isHost ? this.renderCreateEvent() : null}
					</Col>
				</Row>
			</Container>
		);
	}
}
