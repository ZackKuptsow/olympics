import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';

export default class CreateRoomForm extends Component {
	defaultVotes = 2;

	constructor(props) {
		super(props);
		this.state = {
			playerCanPause: true,
			votesToSkip: this.defaultVotes,
			control1Checked: true,
			control2Checked: false
		};
		this.handleVotesChange = this.handleVotesChange.bind(this);
		this.handlePlayerCanPauseChange = this.handlePlayerCanPauseChange.bind(
			this
		);
		this.handleNextButtonPressed = this.handleNextButtonPressed.bind(this);
		this.toggleRadio = this.toggleRadio.bind(this);
	}

	handleVotesChange(e) {
		this.setState({
			votesToSkip: e.target.value
		});
	}

	handlePlayerCanPauseChange(e) {
		this.setState({
			playerCanPause: e.target.value === 'true' ? true : false
		});
	}

	toggleRadio() {
		this.setState({
			control1Checked: !this.control1Checked,
			control2Checked: !this.control2Checked
		});
	}

	handleNextButtonPressed() {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				votes_to_skip: this.state.votesToSkip,
				player_can_pause: this.state.playerCanPause
			})
		};
		fetch('/api/create-room', requestOptions)
			.then(response => response.json())
			// .then(data => console.log(this.props))
			.then(data => this.props.history.push('/room/' + data.code));
	}

	render() {
		return (
			<form className="text-start">
				<label
					for="playerControlOptions"
					className="h4 text-muted  control-label input-group pb-0 mb-0"
				>
					Player Control of Spotify
				</label>
				<div
					className="btn-group"
					onChange={this.handlePlayerCanPauseChange}
					required
				>
					<input
						type="radio"
						className="form-check-input"
						name="playerControlOptions"
						id="control1"
						value="true"
						checked={this.state.control1Checked}
						onChange={this.toggleRadio}
					/>
					<label htmlFor="control1" className="form-check-label">
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
					<label htmlFor="control2" className="form-check-label">
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
				<p className="h4 text-muted pb-0 mb-0">Votes to Skip a Song</p>
				<input
					required
					type="number"
					id="VotesToSkip"
					className="form-control"
					defaultValue={this.defaultVotes}
					min="1"
					onChange={this.handleVotesChange}
				/>
				<Link to="/">
					<Button
						as="input"
						type="button"
						variant="danger"
						className="float-start my-3"
						value="Back"
					/>
				</Link>
				<Button
					as="input"
					type="button"
					varaint="secondary"
					className="float-end my-3"
					value="Next"
					onClick={this.handleNextButtonPressed}
				/>
			</form>
		);
	}
}
