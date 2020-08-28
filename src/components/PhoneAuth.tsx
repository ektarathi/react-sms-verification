import * as React from "react";
import firebase from "../firebaseConfig.js";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ConfirmationView from "./Confirmation";
import Phone from "../assets/images/phone.png";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		mobileImage: {
			width: "70%",
			height: "100%",
		},
		form: {
			textAlign: "left",
			margin: "auto",
			width: "65%",
			"& > *": {
				margin: theme.spacing(1),
				width: "50ch",
			},
		},
		button: {
			width: "200px",
		},
	})
);

export interface PhoneAuthProps {
	path: string;
}

const PhoneAuth: React.SFC<PhoneAuthProps> = () => {
	const classes = useStyles();
	const [phone, setPhone] = React.useState("");
	const [confirmResult, setConfirmResult] = React.useState(false);
	const [output, setOutput] = React.useState(null as any);
	const [error, setError] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState("");

	const validatePhoneNumber = () => {
		var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{9})$/;
		return regexp.test(phone);
	};

	const handleChange = (event: any) => {
		setPhone(event.target.value);
	};

	const handleClick = () => {
		handleSendCode();
	};

	const handleSendCode = () => {
		// Request to send OTP
		var appVerifier = new firebase.auth.RecaptchaVerifier(
			"recaptcha-container",
			{
				size: "invisible",
				callback: function (response: any) {
					handleSendCode();
				},
			}
		);

		if (validatePhoneNumber()) {
			firebase
				.auth()
				.signInWithPhoneNumber(phone, appVerifier)
				.then((confirmationResult: any) => {
					setOutput(confirmationResult);
					setConfirmResult(true);
				})
				.catch((error) => {
					//alert(error.message);
					console.log(error.message);
				});
		} else {
			setError(true);
			setErrorMessage("Invalid Phone Number");
		}
	};

	return (
		<div className={classes.root}>
			<Grid
				container
				spacing={3}
				alignItems="center"
				justify="center"
				style={{ minHeight: "100vh" }}
			>
				<Grid item xs={12} sm={6}>
					<form className={classes.form}>
						<Typography variant="h4" component="h4">
							Verify your number
						</Typography>
						{confirmResult ? (
							<ConfirmationView output={output} number={phone} />
						) : (
							<React.Fragment>
								<Typography variant="body2" gutterBottom>
									Enter your mobile number and we'll contact you to verify it's
									really yours.
								</Typography>
								<TextField
									placeholder="Phone Number with country code"
									value={phone}
									onChange={handleChange}
									label="Phone Number"
									error={error ? true : false} //this will show error message only when there is error
                                    helperText={errorMessage}
                                    id="phone-number"
								/>
								<div id="recaptcha-container"></div>
								<Button
									variant="contained"
									color="primary"
									onClick={handleClick}
									className={classes.button}
								>
									Verify
								</Button>
							</React.Fragment>
						)}
					</form>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Avatar alt="Phone" src={Phone} className={classes.mobileImage} />
				</Grid>
			</Grid>
		</div>
	);
};

export default PhoneAuth;
