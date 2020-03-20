// Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
	card: {
		display: 'flex',
		width: '100%'
	},
	avatar: {
		width: theme.spacing(7),
		height: theme.spacing(7),
		marginTop: theme.spacing(2),
		marginLeft: theme.spacing(2)
	}
}));

export default useStyles;
