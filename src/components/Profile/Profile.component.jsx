import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// Redux
import { connect } from 'react-redux';
import { uploadImage } from '../../redux/actions/user.actions';

// Components
import Loader from '../Loader/Loader.component';
import EditDetails from '../EditDetails/EditDetails.component';

// MUI Components
import MuiLink from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

// Mui Icons
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

// Styles
import useStyles from './Profile.styles';

const Profile = props => {
	const classes = useStyles();
	const { loading, authenticated } = props.user;
	const {
		handle,
		createdAt,
		imageUrl,
		bio,
		website,
		location
	} = props.user.credentials;

	const handleImageChange = event => {
		const image = event.target.files[0];
		const formData = new FormData();

		formData.append('image', image, image.name);
		props.uploadImage(formData);
	};

	const ProfileMarkup = (loading, authenticated) => {
		if (!loading) {
			if (authenticated) {
				return (
					<Paper>
						<div>
							<div>
								<img
									src={imageUrl}
									alt=''
									className={classes.image}
								/>
								<input
									accept='image/*'
									type='file'
									id='icon-button-file'
									className={classes.uploadImage}
									onChange={handleImageChange}
								/>
								<label htmlFor='icon-button-file'>
									<Tooltip
										title='Edit your picture'
										placement='top'
									>
										<IconButton
											color='primary'
											aria-label='upload picture'
											component='span'
										>
											<PhotoCamera />
										</IconButton>
									</Tooltip>
								</label>
							</div>
							<div>
								<MuiLink
									component={Link}
									to={`/user/${handle}`}
									color='secondary'
									variant='h5'
								>
									@{handle}
								</MuiLink>
								{bio && (
									<Typography variant='body2'>
										{bio}
									</Typography>
								)}
								{location && (
									<React.Fragment>
										<LocationOnIcon color='secondary' />
										<span>{location}</span>
									</React.Fragment>
								)}
								{website && (
									<React.Fragment>
										<LinkIcon color='secondary' />
										<a
											href={website}
											target='_blank'
											rel='noopener noreferrer'
										>
											{website}
										</a>
									</React.Fragment>
								)}
								<CalendarTodayIcon color='secondary' />
								<span>
									{`Joined: ${dayjs(createdAt).format(
										'MMM YYYY'
									)}`}
								</span>
								<EditDetails />
							</div>
						</div>
					</Paper>
				);
			} else {
				return (
					<Paper>
						<Typography variant='body2' align='center'></Typography>
						<div></div>
					</Paper>
				);
			}
		} else {
			return <Loader normal />;
		}
	};

	return ProfileMarkup(loading, authenticated);
};

Profile.propTypes = {
	user: PropTypes.object.isRequired,
	uploadImage: PropTypes.func.isRequired
};

const mapActionsToProps = {
	uploadImage
};

const mapStateToProps = state => ({
	user: state.user
});

export default connect(mapStateToProps, mapActionsToProps)(Profile);
