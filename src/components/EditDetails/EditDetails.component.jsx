import React from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { editUserDetails } from '../../redux/actions/user.actions';

// MUI Components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class EditDetails extends React.Component {
	state = {
		bio: '',
		website: '',
		location: '',
		open: false
	};

	componentDidMount() {
		const { credentials } = this.props;
		this.mapUserDetailsToState(credentials);
	}

	mapUserDetailsToState = credentials => {
		this.setState({
			bio: credentials.bio ? credentials.bio : '',
			website: credentials.website ? credentials.website : '',
			location: credentials.location ? credentials.location : ''
		});
	};

	handleClickOpen = () => {
		this.setState({ open: true });
		this.mapUserDetailsToState(this.props.credentials);
	};

	handleClose = () => {
		this.setState({ open: false });
		this.mapUserDetailsToState(this.props.credentials);
	};

	handleChange = event => {
		const { value, name } = event.target;

		this.setState({ ...this.state, [name]: value });
	};

	handleSubmit = () => {
		const { editUserDetails } = this.props;
		const userDetails = {
			bio: this.state.bio,
			website: this.state.website,
			location: this.state.location
		};

		editUserDetails(userDetails);
		this.handleClose();
	};

	render() {
		return (
			<div>
				<Button
					variant='outlined'
					color='secondary'
					onClick={this.handleClickOpen}
				>
					Edit your details
				</Button>
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					aria-labelledby='form-dialog-title'
				>
					<DialogTitle id='form-dialog-title'>
						Edit your details
					</DialogTitle>
					<DialogContent>
						<form>
							<TextField
								name='bio'
								type='text'
								label='Bio'
								multiline
								rows='5'
								placeholder='A short bio about yourself'
								value={this.state.bio}
								onChange={this.handleChange}
								margin='dense'
								color='secondary'
								fullWidth
							/>
							<TextField
								name='website'
								type='text'
								label='Website'
								placeholder='Your personal/proffesional website'
								value={this.state.website}
								onChange={this.handleChange}
								margin='dense'
								color='secondary'
								fullWidth
							/>
							<TextField
								name='location'
								type='text'
								label='Location'
								placeholder='Where you live'
								value={this.state.location}
								onChange={this.handleChange}
								margin='dense'
								color='secondary'
								fullWidth
							/>
						</form>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color='secondary'>
							Cancel
						</Button>
						<Button
							onClick={this.handleSubmit}
							variant='contained'
							color='secondary'
						>
							Edit
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

EditDetails.propTypes = {
	credentials: PropTypes.object.isRequired,
	editUserDetails: PropTypes.func.isRequired
};

const mapActionsToProps = {
	editUserDetails
};

const mapStateToProps = state => ({
	credentials: state.user.credentials
});

export default connect(mapStateToProps, mapActionsToProps)(EditDetails);
