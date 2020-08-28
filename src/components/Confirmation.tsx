import * as React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useNavigate } from "@reach/router";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import firebase from "../firebaseConfig";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		submitButton: {
			width: "200px",
		},
		infoText: {
			margin: "auto",
			textAlign: "left",
		},
		textInput: {
			width: "100%",
			margin: "8px 8px 20px 1px",
		},
	})
);
export interface ConfirmationProps {
	output: any;
	number: string;
}

const Confirmation: React.SFC<ConfirmationProps> = ({
	output,
	number,
}: ConfirmationProps) => {
	const classes = useStyles();
	const navigate = useNavigate();
	const [verificationCode, setVerificationCode] = React.useState("");
	const [error, setError] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState("");

	const setCode = (event: any) => {
		setVerificationCode(event.target.value);
	};

	const handleVerifyCode = () => {
		// Request for OTP verification
		if (verificationCode.length === 6) {
			// Unique code generated for verification
			output
				.confirm(verificationCode)
				.then((user: any) => {
					navigate("/user-details", { state: { phoneNumber: number } });
				})
				.catch((error: any) => {
					setError(true);
					setErrorMessage(error.message);
					console.log(error.message);
				});
		} else {
			setError(true);
			setErrorMessage("Please enter a 6 digit OTP code.");
		}
	};

	const resendOTP = () => {
		var appVerifier = new firebase.auth.RecaptchaVerifier(
			"recaptcha-container",
			{
				size: "invisible",
				callback: function (response: any) {
					resendOTP();
				},
			}
		);
		firebase
			.auth()
			.signInWithPhoneNumber(number, appVerifier)
			.then((confirmationResult: any) => {
				output = confirmationResult;
				handleVerifyCode();
			})
			.catch((error) => {
				//alert(error.message);
				console.log(error.message);
			});
	};

	return (
		<div style={{ margin: "auto" }}>
			<Typography variant="body2" gutterBottom className={classes.infoText}>
				We have sent the security code to {number}.
				<br />
				Enter it below to verify your phone number.
			</Typography>
			<TextField
				placeholder="Enter the verification code..."
				value={verificationCode}
				onChange={setCode}
				label="Verification Code"
				inputProps={{ maxLength: 6 }}
				className={classes.textInput}
				id="verification-code"
				error={error ? true : false} //this will show error message only when there is error
				helperText={errorMessage}
			/>
			<div id="recaptcha-container"></div>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					<Button
						onClick={handleVerifyCode}
						variant="contained"
						color="primary"
						className={classes.submitButton}
					>
						Submit Value
					</Button>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Button
						variant="contained"
						className={classes.submitButton}
						onClick={resendOTP}
					>
						Resend Code
					</Button>
				</Grid>
			</Grid>
		</div>
	);
};

export default Confirmation;
