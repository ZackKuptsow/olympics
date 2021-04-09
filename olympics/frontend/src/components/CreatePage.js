import React, { Component } from 'react';
import { Button, Card, Container, Row, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CreateRoomForm from './CreateRoomForm';

export default class CreatePage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Container>
				<Row>
					<Col xs={12}>
						<Card
							className="text-center py-3 px-5"
							style={{ width: '32rem' }}
						>
							<Card.Img
								variant="top"
								src="../../static/images/olympics.png"
							/>
							<Card.Body>
								<Card.Title className="display-3 mt-5">
									Create Room
								</Card.Title>
								<Card.Subtitle className="display-6 text-muted mb-5">
									Step 1
								</Card.Subtitle>
								<CreateRoomForm {...this.props} />
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		);
	}
}
