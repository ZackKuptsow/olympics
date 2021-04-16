import React, { Component } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

export default class TeamPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isHost: false,
			teamNames: [],
			teamsAdded: false
		};
		this.roomCode = this.props.match.params.roomCode;
		this.renderTeamSettings = this.renderTeamSettings.bind(this);
		this.handleAddTeamPressed = this.handleAddTeamPressed.bind(this);
		this.getTeamsList = this.getTeamsList.bind(this);
		this.getRoomDetails();
		this.getTeamsList();
		this.teamNameInput = React.createRef();
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

	handleAddTeamPressed() {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				room_code: this.roomCode,
				team_name: this.teamNameInput.current.value
			})
		};
		fetch('/api/create-team', requestOptions)
			.then(response => response.json())
			.then(() => window.location.reload());
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

	renderTeamSettings() {
		return (
			<Col>
				<Card style={{ width: '32rem', height: '32rem' }}>
					<Card.Header>
						<h1 className="text-center">Team Settings</h1>
					</Card.Header>
					<Card.Body>
						<Form>
							<Form.Group controlId="addTeam">
								<Form.Label as="h3" className="ms-1">
									Add a Team
								</Form.Label>
								<Form.Control
									type="text"
									placeholder="Team Name"
									ref={this.teamNameInput}
								/>
								<Button
									as="input"
									type="button"
									variant="primary"
									className="my-3"
									value="Add"
									onClick={this.handleAddTeamPressed}
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
					<Col>
						<Card style={{ width: '32rem', height: '32rem' }}>
							<Card.Header>
								<h1 className="text-center">Teams</h1>
							</Card.Header>
							<Card.Body>
								<Card.Text>
									<ul>
										{this.state.teamNames.map(team => (
											<li>{team}</li>
										))}
									</ul>
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					{this.state.isHost ? this.renderTeamSettings() : null}
				</Row>
			</Container>
		);
	}
}
