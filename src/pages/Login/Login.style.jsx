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
	formContainer: {
		marginTop: theme.spacing(3)
	},
	textField: {
		marginBottom: theme.spacing(3)
	},
	button: {
		marginTop: theme.spacing(3),
		backgroundColor: 'red'
	},
	snackbar: {
		marginTop: theme.spacing(5)
	},
	loader: {
		marginTop: theme.spacing(5),
		height: 20
	},
	signupLink: {
		marginTop: theme.spacing(3)
	},
	pageTitle: {}
}));

export default useStyles;
