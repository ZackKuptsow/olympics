import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

export default class TeamCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isHost: false
		};
	}

	render() {
		return (
			<Card
				className="text-center p-5"
				style={{ width: '18rem', height: '18rem' }}
			>
				<Card.Title>Teams</Card.Title>
			</Card>
		);
	}
}
