import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

// Styles
import useStyles from './Scream.styles';

function Scream(scream) {
	dayjs.extend(relativeTime);

	const classes = useStyles();
	const {
		body,
		createdAt,
		userImage,
		userHandle,
		likeCount,
		commentCount
	} = scream.scream;
	console.log(scream);
	return (
		<Grid container alignItems='stretch' item sm={4}>
			<Card className={classes.card}>
				<Avatar src={userImage} className={classes.avatar} />
				<CardContent>
					<Typography
						variant='h5'
						color='secondary'
						component={Link}
						to={`/users/${userHandle}`}
					>
						{' '}
						{userHandle}{' '}
					</Typography>
					<Typography variant='body2' color='textSecondary'>
						{dayjs(createdAt).fromNow()}
					</Typography>
					<Typography variant='body1'>{body}</Typography>
				</CardContent>
			</Card>
		</Grid>
	);
}

Scream.propTypes = {
	scream: PropTypes.shape({
		body: PropTypes.string,
		screamId: PropTypes.string,
		likeCount: PropTypes.number,
		commentCount: PropTypes.number,
		createdAt: PropTypes.string,
		userHandle: PropTypes.string,
		userImage: PropTypes.string
	}).isRequired
};

export default Scream;
