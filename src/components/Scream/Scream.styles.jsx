// Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
	card: {
		display: 'flex',
		width: '100%',
		minHeight: 200
	},
	avatar: {
		width: theme.spacing(5),
		height: theme.spacing(5),
		marginTop: theme.spacing(2),
		marginLeft: theme.spacing(2)
	}
}));

export default useStyles;
