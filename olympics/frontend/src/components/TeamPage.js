import React, { Component } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

export default class TeamPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isHost: false
		};
		this.roomCode = this.props.match.params.roomCode;
		this.renderTeamSettings = this.renderTeamSettings.bind(this);
		this.getRoomDetails();
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
								/>
								<Button
									variant="primary"
									className="my-3"
									type="submit"
								>
									Add
								</Button>
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
						</Card>
					</Col>
					{this.state.isHost ? this.renderTeamSettings() : null}
				</Row>
			</Container>
		);
	}
}
