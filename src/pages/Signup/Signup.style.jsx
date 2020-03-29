// Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
	form: {
		textAlign: 'center'
	},
	image: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3)
	},
	snackbar: {
		marginTop: theme.spacing(5)
	},
	pageTitle: {}
}));

export default useStyles;
