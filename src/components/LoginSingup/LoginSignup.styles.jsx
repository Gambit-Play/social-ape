// Styles
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
	warningText: {
		color: 'red',
		marginTop: theme.spacing(5)
	},
	formContainer: {
		marginTop: theme.spacing(3)
	},
	textField: {
		marginBottom: theme.spacing(3)
	},
	button: {
		marginTop: theme.spacing(3)
	},
	buttonGoogle: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(3)
	},
	loader: {
		marginTop: theme.spacing(5),
		height: 20
	},
	signupLink: {
		marginTop: theme.spacing(3)
	}
}));

export default useStyles;
